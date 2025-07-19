# E-Commerce Application with AWS CI/CD Pipeline Demo

This demo showcases the final outcome of our e-commerce application with a complete CI/CD pipeline using AWS services.

## Demo Contents

### Application Demo
- `public/index.html` - Visual representation of the final e-commerce application
- `src/styles.css` - CSS styles for the demo application

### Pipeline Architecture
- `images/pipeline-diagram.txt` - Diagram showing the CI/CD pipeline architecture
- `images/deployment-process.txt` - Diagram explaining the deployment process
- `images/pipeline-console.txt` - Representation of the AWS CodePipeline console

### Presentation Materials
- `presentation.md` - Slides for introducing the project
- `demo-script.md` - Script for presenting the demo
- `student-handout.md` - Handout for students with key concepts and resources

## Application Demo

The `public/index.html` file demonstrates how the final e-commerce application will look. It includes:

- Responsive navigation header
- Hero section with call-to-action
- Product grid with featured products
- Features section highlighting store benefits
- Footer with contact information and newsletter signup

## CI/CD Pipeline Architecture

Our CI/CD pipeline automates the deployment of the e-commerce application using:

1. **GitHub** - Source code repository
2. **AWS CodePipeline** - Orchestrates the CI/CD workflow
3. **AWS CodeBuild** - Builds the Docker image and runs tests
4. **Amazon ECR** - Stores the Docker container images
5. **AWS CodeDeploy** - Deploys the application to ECS using blue/green deployment
6. **Amazon ECS** - Runs the containerized application
7. **Application Load Balancer** - Routes traffic to the application

## Key Features of the Pipeline

- **Automated Builds**: Every code push triggers an automated build
- **Containerization**: Application is packaged as a Docker container
- **Blue/Green Deployment**: Zero-downtime deployments with easy rollback
- **Scalability**: ECS automatically scales based on demand
- **Infrastructure as Code**: All AWS resources defined in CloudFormation templates

## How to Use This Demo

### For Instructors
1. Use `demo-script.md` to guide your presentation
2. Open `public/index.html` in a web browser to show the application UI
3. Use the diagrams in the `images` folder to explain the architecture
4. Distribute `student-handout.md` to students for reference

### For Students
1. Review the application UI in `public/index.html`
2. Study the pipeline architecture in the `images` folder
3. Read through the `student-handout.md` for key concepts
4. Follow along with the instructor as they build the complete solution

## Next Steps

After reviewing this demo, we'll build the complete solution step by step:

1. Set up the application code structure
2. Create the Dockerfile for containerization
3. Set up the AWS infrastructure using CloudFormation
4. Configure the CI/CD pipeline
5. Deploy the application to ECS

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (React in the full implementation)
- **Containerization**: Docker
- **CI/CD**: AWS CodePipeline, CodeBuild, CodeDeploy
- **Compute**: Amazon ECS with Fargate
- **Storage**: Amazon ECR, S3
- **Networking**: Application Load Balancer, VPC

## Benefits for Students

Learning this CI/CD pipeline will provide students with:

- Experience with industry-standard DevOps practices
- Understanding of containerization and microservices
- Knowledge of automated testing and deployment
- Skills in AWS cloud services
- Ability to implement modern web applications with automated delivery
