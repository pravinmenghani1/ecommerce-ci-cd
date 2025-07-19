# AWS CI/CD Pipeline Interactive Visualization

This project provides an interactive and animated visualization of a complete CI/CD pipeline using GitHub and AWS services including CodeBuild, CodeDeploy, CodePipeline, EC2, Auto Scaling Groups, and Application Load Balancer.

## Overview

This visualization demonstrates the flow of code from a developer's commit to deployment on production servers, showing how each AWS service contributes to the automated pipeline.

## Features

- **Interactive Animation**: Click "Start Pipeline" to see the entire CI/CD process in action
- **Detailed Explanations**: Click on each service to see detailed information about its role
- **Visual Indicators**: Color-coded stages show the status of each step in the pipeline
- **Animated Traffic Flow**: Visualizes how code flows through the pipeline stages

## How to Use

1. Open `pipeline-visualization.html` in a modern web browser
2. Click the "Start Pipeline" button to begin the animation
3. Click on any numbered indicator to view detailed information about that stage
4. Use the "Next Step" button to manually advance through the pipeline
5. Use the "Reset" button to restart the animation

## Visualization Options

This project includes two different visualizations:

1. **Architecture-Based Visualization** (`pipeline-visualization.html`):
   - Based on the detailed architecture diagram
   - Shows the complete secure CI/CD pipeline with security scanning
   - Includes SAST, DAST, and multiple environments

2. **Simple Visualization** (`index-compact.html`):
   - A simplified version of the pipeline
   - Easier to understand for beginners
   - Focuses on the core CI/CD concepts

## AWS Services Explained

The visualization covers these key AWS services:

- **GitHub/CodeCommit**: Source code repository that triggers the pipeline
- **AWS CodeBuild**: Compiles code, runs tests, and creates deployment artifacts
- **AWS CodePipeline**: Orchestrates the entire CI/CD workflow
- **AWS CodeDeploy**: Automates application deployment to EC2 instances
- **Elastic Beanstalk**: Manages application environments
- **Security Tools**: SAST and DAST for comprehensive security testing
- **CloudWatch**: Monitors the application and infrastructure
- **CloudTrail**: Logs API activity for audit purposes
- **AWS Config**: Tracks resource configurations for compliance

## Educational Purpose

This visualization is designed for beginners to understand:

- How CI/CD pipelines automate software delivery
- The role of each AWS service in the deployment process
- How these services work together to create a seamless workflow
- Best practices for automated application deployment
- Security considerations in the CI/CD process

## Customization

You can customize this visualization by:

- Modifying the HTML/CSS to match your specific architecture
- Adding additional AWS services relevant to your pipeline
- Changing the timing of animations to focus on specific aspects
- Adding more detailed explanations for your team's specific needs

## Requirements

- Modern web browser with JavaScript enabled
- No server-side components or internet connection required after initial download

## Next Steps

Consider enhancing this visualization with:

1. Adding CloudWatch monitoring visualization
2. Including IAM role explanations
3. Demonstrating rollback scenarios
4. Showing blue/green deployment strategies
