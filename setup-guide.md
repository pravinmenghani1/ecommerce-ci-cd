# Setting Up a Real CI/CD Pipeline with AWS Services

This guide provides step-by-step instructions for setting up a CI/CD pipeline using GitHub and AWS services, similar to the one demonstrated in the visualization.

## Prerequisites

1. An AWS account with appropriate permissions
2. A GitHub account and repository with your application code
3. Basic understanding of AWS services and CI/CD concepts
4. AWS CLI installed and configured on your local machine

## Step 1: Set Up IAM Roles and Permissions

First, create the necessary IAM roles for your CI/CD pipeline:

1. Sign in to the AWS Management Console and navigate to IAM
2. Create a service role for CodeBuild:
   ```bash
   aws iam create-role --role-name CodeBuildServiceRole --assume-role-policy-document file://codebuild-trust-policy.json
   aws iam attach-role-policy --role-name CodeBuildServiceRole --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
   aws iam attach-role-policy --role-name CodeBuildServiceRole --policy-arn arn:aws:iam::aws:policy/AmazonECR-FullAccess
   ```

3. Create a service role for CodeDeploy:
   ```bash
   aws iam create-role --role-name CodeDeployServiceRole --assume-role-policy-document file://codedeploy-trust-policy.json
   aws iam attach-role-policy --role-name CodeDeployServiceRole --policy-arn arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole
   ```

4. Create a service role for CodePipeline:
   ```bash
   aws iam create-role --role-name CodePipelineServiceRole --assume-role-policy-document file://codepipeline-trust-policy.json
   aws iam attach-role-policy --role-name CodePipelineServiceRole --policy-arn arn:aws:iam::aws:policy/AWSCodeStarFullAccess
   ```

## Step 2: Set Up EC2 Instances and Auto Scaling Group

1. Create a launch template for your EC2 instances:
   ```bash
   aws ec2 create-launch-template \
     --launch-template-name MyAppLaunchTemplate \
     --version-description "Initial version" \
     --launch-template-data '{"ImageId":"ami-0c55b159cbfafe1f0","InstanceType":"t2.micro","SecurityGroupIds":["sg-12345678"],"UserData":"IyEvYmluL2Jhc2gKZWNobyAiSW5zdGFsbGluZyBDb2RlRGVwbG95IEFnZW50Li4uIgphcHQtZ2V0IHVwZGF0ZQphcHQtZ2V0IC15IGluc3RhbGwgcnVieQphcHQtZ2V0IC15IGluc3RhbGwgd2dldApjZCAvaG9tZS91YnVudHUKd2dldCBodHRwczovL2F3cy1jb2RlZGVwbG95LXVzLWVhc3QtMS5zMy5hbWF6b25hd3MuY29tL2xhdGVzdC9pbnN0YWxsCmNobW9kICt4IC4vaW5zdGFsbAouL2luc3RhbGwgYXV0bwo="}'
   ```

2. Create an Auto Scaling Group:
   ```bash
   aws autoscaling create-auto-scaling-group \
     --auto-scaling-group-name MyAppASG \
     --launch-template "LaunchTemplateName=MyAppLaunchTemplate,Version=1" \
     --min-size 2 \
     --max-size 5 \
     --desired-capacity 2 \
     --vpc-zone-identifier "subnet-12345678,subnet-87654321" \
     --tags "Key=Name,Value=MyAppInstance,PropagateAtLaunch=true"
   ```

## Step 3: Set Up Application Load Balancer

1. Create a target group:
   ```bash
   aws elbv2 create-target-group \
     --name MyAppTargetGroup \
     --protocol HTTP \
     --port 80 \
     --vpc-id vpc-12345678 \
     --health-check-protocol HTTP \
     --health-check-path / \
     --target-type instance
   ```

2. Create an Application Load Balancer:
   ```bash
   aws elbv2 create-load-balancer \
     --name MyAppALB \
     --subnets subnet-12345678 subnet-87654321 \
     --security-groups sg-12345678
   ```

3. Create a listener:
   ```bash
   aws elbv2 create-listener \
     --load-balancer-arn arn:aws:elasticloadbalancing:region:account-id:loadbalancer/app/MyAppALB/1234567890123456 \
     --protocol HTTP \
     --port 80 \
     --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:region:account-id:targetgroup/MyAppTargetGroup/1234567890123456
   ```

## Step 4: Set Up CodeBuild

1. Create a buildspec.yml file in your GitHub repository:
   ```yaml
   version: 0.2

   phases:
     install:
       runtime-versions:
         nodejs: 14
     pre_build:
       commands:
         - echo Installing dependencies...
         - npm install
     build:
       commands:
         - echo Running tests...
         - npm test
         - echo Building...
         - npm run build
     post_build:
       commands:
         - echo Build completed on `date`
   
   artifacts:
     files:
       - appspec.yml
       - scripts/**/*
       - build/**/*
     discard-paths: no
   ```

2. Create a CodeBuild project:
   ```bash
   aws codebuild create-project \
     --name MyAppBuild \
     --source "type=GITHUB,location=https://github.com/username/repo.git" \
     --artifacts "type=S3,location=my-artifact-bucket,name=MyAppBuild.zip" \
     --environment "type=LINUX_CONTAINER,image=aws/codebuild/amazonlinux2-x86_64-standard:3.0,computeType=BUILD_GENERAL1_SMALL" \
     --service-role arn:aws:iam::account-id:role/CodeBuildServiceRole
   ```

## Step 5: Set Up CodeDeploy

1. Create an appspec.yml file in your GitHub repository:
   ```yaml
   version: 0.0
   os: linux
   files:
     - source: /build
       destination: /var/www/html
   hooks:
     BeforeInstall:
       - location: scripts/before_install.sh
         timeout: 300
         runas: root
     AfterInstall:
       - location: scripts/after_install.sh
         timeout: 300
         runas: root
     ApplicationStart:
       - location: scripts/start_application.sh
         timeout: 300
         runas: root
   ```

2. Create a CodeDeploy application:
   ```bash
   aws deploy create-application --application-name MyApp
   ```

3. Create a deployment group:
   ```bash
   aws deploy create-deployment-group \
     --application-name MyApp \
     --deployment-group-name MyAppDeploymentGroup \
     --deployment-config-name CodeDeployDefault.OneAtATime \
     --auto-scaling-groups MyAppASG \
     --service-role-arn arn:aws:iam::account-id:role/CodeDeployServiceRole
   ```

## Step 6: Set Up CodePipeline

1. Create an S3 bucket for artifacts:
   ```bash
   aws s3 mb s3://my-artifact-bucket
   ```

2. Create a CodePipeline:
   ```bash
   aws codepipeline create-pipeline \
     --pipeline-name MyAppPipeline \
     --role-arn arn:aws:iam::account-id:role/CodePipelineServiceRole \
     --artifact-store "type=S3,location=my-artifact-bucket" \
     --stages '[
       {
         "name": "Source",
         "actions": [
           {
             "name": "Source",
             "actionTypeId": {
               "category": "Source",
               "owner": "AWS",
               "provider": "CodeStarSourceConnection",
               "version": "1"
             },
             "configuration": {
               "ConnectionArn": "arn:aws:codestar-connections:region:account-id:connection/12345678-abcd-1234-efgh-123456789012",
               "FullRepositoryId": "username/repo",
               "BranchName": "main"
             },
             "outputArtifacts": [
               {
                 "name": "SourceCode"
               }
             ]
           }
         ]
       },
       {
         "name": "Build",
         "actions": [
           {
             "name": "BuildAction",
             "actionTypeId": {
               "category": "Build",
               "owner": "AWS",
               "provider": "CodeBuild",
               "version": "1"
             },
             "configuration": {
               "ProjectName": "MyAppBuild"
             },
             "inputArtifacts": [
               {
                 "name": "SourceCode"
               }
             ],
             "outputArtifacts": [
               {
                 "name": "BuildOutput"
               }
             ]
           }
         ]
       },
       {
         "name": "Deploy",
         "actions": [
           {
             "name": "DeployAction",
             "actionTypeId": {
               "category": "Deploy",
               "owner": "AWS",
               "provider": "CodeDeploy",
               "version": "1"
             },
             "configuration": {
               "ApplicationName": "MyApp",
               "DeploymentGroupName": "MyAppDeploymentGroup"
             },
             "inputArtifacts": [
               {
                 "name": "BuildOutput"
               }
             ]
           }
         ]
       }
     ]'
   ```

## Step 7: Connect GitHub to AWS CodePipeline

1. In the AWS Management Console, navigate to Developer Tools > Settings > Connections
2. Click "Create connection"
3. Select "GitHub" as the provider
4. Follow the prompts to connect your GitHub account
5. Update your CodePipeline to use this connection

## Step 8: Test Your Pipeline

1. Make a change to your GitHub repository and commit it
2. The pipeline should automatically trigger
3. Monitor the progress in the AWS CodePipeline console
4. Verify that your application is deployed to the EC2 instances

## Monitoring and Troubleshooting

1. Set up CloudWatch alarms for your pipeline:
   ```bash
   aws cloudwatch put-metric-alarm \
     --alarm-name MyAppPipelineFailure \
     --alarm-description "Alarm when pipeline execution fails" \
     --metric-name ExecutionsFailed \
     --namespace AWS/CodePipeline \
     --statistic Sum \
     --period 300 \
     --threshold 1 \
     --comparison-operator GreaterThanOrEqualToThreshold \
     --dimensions Name=PipelineName,Value=MyAppPipeline \
     --evaluation-periods 1 \
     --alarm-actions arn:aws:sns:region:account-id:MyNotificationTopic
   ```

2. Set up SNS notifications:
   ```bash
   aws sns create-topic --name MyNotificationTopic
   aws sns subscribe \
     --topic-arn arn:aws:sns:region:account-id:MyNotificationTopic \
     --protocol email \
     --notification-endpoint your-email@example.com
   ```

## Best Practices

1. **Infrastructure as Code**: Use AWS CloudFormation or Terraform to define your infrastructure
2. **Secrets Management**: Use AWS Secrets Manager for storing sensitive information
3. **Testing**: Include comprehensive tests in your build process
4. **Blue/Green Deployments**: Consider using blue/green deployment strategies for zero-downtime updates
5. **Rollback Strategy**: Implement automatic rollbacks for failed deployments
6. **Security**: Follow the principle of least privilege for IAM roles
7. **Monitoring**: Set up comprehensive monitoring and alerting

## Conclusion

You now have a fully functional CI/CD pipeline that automatically builds, tests, and deploys your application whenever changes are pushed to your GitHub repository. This pipeline provides a reliable and consistent way to deliver new features and updates to your users.

For more advanced configurations, consider exploring AWS CodeStar, AWS CDK, or integrating additional services like AWS Lambda for serverless deployments.
