# E-Commerce CI/CD Pipeline Demo Script

## Introduction (2 minutes)
- Welcome students to the session
- Explain that today we'll be building a complete CI/CD pipeline for a containerized e-commerce application
- Mention that we'll first look at the final outcome before building it step by step

## Demo Application Overview (5 minutes)
- Open `public/index.html` in a browser
- Show the responsive design and product listings
- Highlight the key components of the UI
- Explain that this is a simple representation of what the final application will look like
- Mention that the real application will be built with React and deployed as a Docker container

## CI/CD Pipeline Architecture (10 minutes)
- Show the pipeline diagram from `images/pipeline-diagram.txt`
- Walk through each component of the pipeline:
  1. GitHub repository for source code
  2. AWS CodePipeline for orchestration
  3. AWS CodeBuild for building Docker images
  4. Amazon ECR for storing container images
  5. AWS CodeDeploy for deployment
  6. Amazon ECS for running containers
  7. Application Load Balancer for routing traffic
- Explain the flow of code from commit to production

## Deployment Process (5 minutes)
- Show the deployment process diagram from `images/deployment-process.txt`
- Explain the continuous integration and continuous delivery stages
- Highlight the blue/green deployment strategy
- Discuss the benefits of this approach:
  - Zero downtime deployments
  - Easy rollbacks
  - Testing in production-like environments

## AWS Console View (3 minutes)
- Show the pipeline console view from `images/pipeline-console.txt`
- Explain what each stage does and how to monitor the pipeline
- Point out how to identify successful and failed deployments
- Mention how to view logs and troubleshoot issues

## Benefits and Learning Outcomes (5 minutes)
- Refer to the presentation slides in `presentation.md`
- Discuss the benefits for developers, operations, and business
- Outline what students will learn by building this pipeline
- Emphasize the real-world applicability of these skills

## Q&A and Transition (5 minutes)
- Answer any questions about the final outcome
- Explain that we'll now start building the pipeline from scratch
- Set expectations for the hands-on portion of the session

## Next Steps
- Begin the hands-on portion by setting up the application code
- Follow the steps in the main README to build the complete pipeline
