# E-Commerce CI/CD Pipeline Workshop Handout

## Workshop Overview

In this workshop, you'll learn how to build a complete CI/CD pipeline for a containerized e-commerce application using AWS services. By the end of this session, you'll understand how to automate the build, test, and deployment process for a modern web application.

## Key Concepts

### Containerization
- **Docker**: Platform for developing, shipping, and running applications in containers
- **Container**: Lightweight, standalone executable package that includes everything needed to run an application
- **Image**: Template for a container that includes the application code, runtime, libraries, and dependencies

### CI/CD
- **Continuous Integration**: Automatically building and testing code changes
- **Continuous Delivery**: Automatically deploying code changes to production-like environments
- **Pipeline**: Series of automated steps that code changes go through from commit to deployment

### AWS Services
- **CodePipeline**: Orchestrates the CI/CD workflow
- **CodeBuild**: Compiles source code, runs tests, and produces artifacts
- **CodeDeploy**: Automates application deployments to various compute services
- **ECR (Elastic Container Registry)**: Stores, manages, and deploys Docker container images
- **ECS (Elastic Container Service)**: Runs and manages Docker containers
- **Fargate**: Serverless compute engine for containers

## Pipeline Architecture

```
GitHub → CodePipeline → CodeBuild → ECR → CodeDeploy → ECS → ALB → Users
```

## Blue/Green Deployment

A deployment strategy that reduces downtime and risk by running two identical production environments:
1. **Blue environment**: The currently running production environment
2. **Green environment**: The new version being deployed
3. Traffic is gradually shifted from Blue to Green
4. If issues occur, traffic can be routed back to Blue

## Workshop Steps

1. Set up the application code structure
2. Create the Dockerfile for containerization
3. Set up the AWS infrastructure using CloudFormation
4. Configure the CI/CD pipeline
5. Deploy the application to ECS

## Resources

- [AWS CodePipeline Documentation](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html)
- [AWS CodeBuild Documentation](https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html)
- [AWS CodeDeploy Documentation](https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html)
- [Amazon ECR Documentation](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html)
- [Amazon ECS Documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)
- [Docker Documentation](https://docs.docker.com/)

## Notes

Use this space to take notes during the workshop:

_______________________________________________________________________________

_______________________________________________________________________________

_______________________________________________________________________________

_______________________________________________________________________________

_______________________________________________________________________________

_______________________________________________________________________________

_______________________________________________________________________________

_______________________________________________________________________________
