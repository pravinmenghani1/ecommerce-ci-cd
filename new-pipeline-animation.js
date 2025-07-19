/**
 * AWS CI/CD Pipeline Visualization
 * Interactive animation based on the new pipeline architecture diagram
 */

document.addEventListener('DOMContentLoaded', function() {
    // Define pipeline steps
    const steps = [
        {
            id: 1,
            name: "Source Stage - CodeCommit",
            description: "Code is stored in AWS CodeCommit repository.",
            position: { top: 35, left: 15 },
            details: `
                <h3>1. Source Stage - CodeCommit</h3>
                <p>The CI/CD pipeline begins with source code stored in AWS CodeCommit, a fully-managed source control service that hosts secure Git-based repositories.</p>
                <p><strong>Key Functions:</strong></p>
                <ul>
                    <li>Secure source code storage</li>
                    <li>Version control with Git</li>
                    <li>Integration with AWS services</li>
                    <li>Triggers pipeline execution on code changes</li>
                    <li>Maintains history of code changes</li>
                </ul>
            `
        },
        {
            id: 2,
            name: "Source Stage - S3",
            description: "Deployment artifacts are stored in Amazon S3.",
            position: { top: 65, left: 15 },
            details: `
                <h3>2. Source Stage - Amazon S3</h3>
                <p>Amazon S3 (Simple Storage Service) stores the deployment artifacts that will be used throughout the pipeline process.</p>
                <p><strong>Key Functions:</strong></p>
                <ul>
                    <li>Stores deployment packages and artifacts</li>
                    <li>Provides durable and scalable storage</li>
                    <li>Integrates with CodePipeline for artifact management</li>
                    <li>Enables version control of deployment artifacts</li>
                    <li>Secures artifacts with access controls</li>
                </ul>
            `
        },
        {
            id: 3,
            name: "Deploy Stage - Beta",
            description: "AWS CodeDeploy deploys the application to EC2 instances in the beta environment.",
            position: { top: 50, left: 50 },
            details: `
                <h3>3. Deploy Stage - Beta</h3>
                <p>AWS CodeDeploy automates the deployment of applications to a fleet of EC2 instances in the beta environment for testing.</p>
                <p><strong>Key Functions:</strong></p>
                <ul>
                    <li>Automates application deployments to EC2 instances</li>
                    <li>Maintains consistent deployments across the beta fleet</li>
                    <li>Provides deployment health monitoring</li>
                    <li>Enables rollback capabilities if issues are detected</li>
                    <li>Allows for testing in a production-like environment</li>
                </ul>
            `
        },
        {
            id: 4,
            name: "Beta EC2 Fleet",
            description: "The application runs on EC2 instances in the beta environment.",
            position: { top: 50, left: 65 },
            details: `
                <h3>4. Beta EC2 Fleet</h3>
                <p>The beta environment consists of Amazon EC2 instances that host the application for testing before production deployment.</p>
                <p><strong>Key Functions:</strong></p>
                <ul>
                    <li>Hosts the application in a testing environment</li>
                    <li>Allows for validation of application functionality</li>
                    <li>Enables performance testing</li>
                    <li>Provides a staging area before production deployment</li>
                    <li>Helps identify potential issues before they reach production</li>
                </ul>
            `
        },
        {
            id: 5,
            name: "Deploy Stage - Production",
            description: "After successful testing, AWS CodeDeploy deploys to production EC2 instances.",
            position: { top: 50, left: 85 },
            details: `
                <h3>5. Deploy Stage - Production</h3>
                <p>After successful testing in the beta environment, AWS CodeDeploy deploys the application to the production EC2 fleet.</p>
                <p><strong>Key Functions:</strong></p>
                <ul>
                    <li>Automates production deployments</li>
                    <li>Ensures consistent deployment across all production instances</li>
                    <li>Monitors deployment health in production</li>
                    <li>Provides rollback capabilities if issues are detected</li>
                    <li>Maintains application availability during deployment</li>
                </ul>
            `
        }
    ];
    
    // Path coordinates for animation dots
    const paths = [
        // Path 1: CodeCommit to CodePipeline
        [
            { x: 15, y: 35 },
            { x: 30, y: 35 }
        ],
        // Path 2: S3 to CodePipeline
        [
            { x: 15, y: 65 },
            { x: 30, y: 65 }
        ],
        // Path 3: CodePipeline to Beta Deploy
        [
            { x: 30, y: 50 },
            { x: 50, y: 50 }
        ],
        // Path 4: Beta Deploy to Beta EC2 Fleet
        [
            { x: 50, y: 50 },
            { x: 65, y: 50 }
        ],
        // Path 5: Beta EC2 Fleet to Production Deploy
        [
            { x: 65, y: 50 },
            { x: 85, y: 50 }
        ]
    ];
    
    // Get DOM elements
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pipelineImage = document.getElementById('pipelineImage');
    const detailsPanel = document.getElementById('stepDetails');
    
    let currentStep = 0;
    let autoAdvance = false;
    let animationInProgress = false;
    
    // Initialize step indicators and details
    function initializeSteps() {
        // Create step indicators
        steps.forEach(step => {
            const stepIndicator = document.getElementById(`step${step.id}`);
            if (!stepIndicator) {
                console.error(`Step indicator for step ${step.id} not found`);
                return;
            }
            
            // Position the indicator
            stepIndicator.style.top = `${step.position.top}%`;
            stepIndicator.style.left = `${step.position.left}%`;
            
            // Add click event
            stepIndicator.addEventListener('click', function() {
                showStepDetails(step.id);
            });
        });
        
        // Create step details
        steps.forEach(step => {
            const detailsDiv = document.getElementById(`step${step.id}-details`);
            if (detailsDiv) {
                detailsDiv.innerHTML = step.details;
            }
        });
    }
    
    function resetPipeline() {
        currentStep = 0;
        autoAdvance = false;
        animationInProgress = false;
        
        // Reset all step indicators
        steps.forEach(step => {
            const stepEl = document.getElementById(`step${step.id}`);
            if (stepEl) {
                stepEl.classList.remove('active');
                stepEl.style.opacity = '0';
                stepEl.style.backgroundColor = '#FF9900'; // Reset color
            }
        });
        
        // Remove any animation elements
        document.querySelectorAll('.animation-dot, .code-artifact, .server-pulse').forEach(el => {
            el.remove();
        });
        
        // Reset to show step 1 details
        showStepDetails(1);
    }
    
    function showStepDetails(stepId) {
        // Hide all details
        document.querySelectorAll('.step-details').forEach(detail => {
            detail.classList.remove('active');
        });
        
        // Show details for specified step
        const detailsEl = document.getElementById(`step${stepId}-details`);
        if (detailsEl) {
            detailsEl.classList.add('active');
        }
    }
    
    function startPipeline() {
        if (animationInProgress) return;
        
        resetPipeline();
        autoAdvance = true;
        animationInProgress = true;
        
        // Start with step 1
        advanceToStep(1);
    }
    
    function nextStep() {
        if (currentStep < steps.length) {
            autoAdvance = false;
            advanceToStep(currentStep + 1);
        } else {
            // If we're at the end, reset
            resetPipeline();
        }
    }
    
    function advanceToStep(stepIndex) {
        if (stepIndex > steps.length) {
            animationInProgress = false;
            return;
        }
        
        currentStep = stepIndex;
        
        // Update step indicators
        steps.forEach((step, i) => {
            const stepEl = document.getElementById(`step${step.id}`);
            if (!stepEl) return;
            
            if (i < stepIndex - 1) {
                // Completed steps
                stepEl.classList.remove('active');
                stepEl.style.opacity = '1';
                stepEl.style.backgroundColor = '#1E8E3E'; // Success color
            } else if (i === stepIndex - 1) {
                // Current step
                stepEl.classList.add('active');
                stepEl.style.opacity = '1';
                stepEl.style.backgroundColor = '#FF9900'; // In progress color
                
                // Show details for current step
                showStepDetails(step.id);
                
                // Animate dot along path for this step
                if (stepIndex <= paths.length) {
                    animateDotAlongPath(stepIndex - 1);
                }
                
                // Add special animations based on step
                if (stepIndex === 3) {
                    // Beta deployment animation
                    setTimeout(() => {
                        animateServerDeployment(65, 50);
                    }, 1500);
                } else if (stepIndex === 5) {
                    // Production deployment animation
                    setTimeout(() => {
                        animateServerDeployment(95, 50);
                    }, 1500);
                }
            } else {
                // Future steps
                stepEl.classList.remove('active');
                stepEl.style.opacity = '0';
            }
        });
        
        // Auto advance to next step after delay if auto-advance is enabled
        if (autoAdvance) {
            setTimeout(() => {
                if (currentStep < steps.length) {
                    advanceToStep(currentStep + 1);
                } else {
                    animationInProgress = false;
                }
            }, 3000);
        }
    }
    
    function animateDotAlongPath(pathIndex) {
        if (pathIndex >= paths.length) return;
        
        const path = paths[pathIndex];
        const pipelineContainer = document.querySelector('.pipeline-image-wrapper');
        const imageRect = pipelineImage.getBoundingClientRect();
        
        // Create artifact instead of dot for certain paths
        const useArtifact = pathIndex === 0 || pathIndex === 1;
        
        // Create element
        const element = document.createElement('div');
        element.className = useArtifact ? 'code-artifact' : 'animation-dot';
        pipelineContainer.appendChild(element);
        
        // Calculate start position
        const startX = (path[0].x / 100) * imageRect.width;
        const startY = (path[0].y / 100) * imageRect.height;
        
        // Set starting position
        element.style.left = startX + 'px';
        element.style.top = startY + 'px';
        element.style.opacity = '1';
        
        // Calculate end position
        const endX = (path[1].x / 100) * imageRect.width;
        const endY = (path[1].y / 100) * imageRect.height;
        
        // Animate to end position
        setTimeout(() => {
            element.style.transition = 'all 1.5s ease';
            element.style.left = endX + 'px';
            element.style.top = endY + 'px';
            
            // Remove element after animation
            setTimeout(() => {
                element.remove();
            }, 1500);
        }, 100);
    }
    
    function animateServerDeployment(x, y) {
        const pipelineContainer = document.querySelector('.pipeline-image-wrapper');
        const imageRect = pipelineImage.getBoundingClientRect();
        
        // Calculate position
        const posX = (x / 100) * imageRect.width;
        const posY = (y / 100) * imageRect.height;
        
        // Create server pulse animation
        const pulse = document.createElement('div');
        pulse.className = 'server-pulse';
        pulse.style.left = (posX - 20) + 'px';
        pulse.style.top = (posY - 20) + 'px';
        pipelineContainer.appendChild(pulse);
        
        // Remove after animation completes
        setTimeout(() => {
            pulse.remove();
        }, 2000);
    }
    
    // Event listeners
    startBtn.addEventListener('click', startPipeline);
    resetBtn.addEventListener('click', resetPipeline);
    nextBtn.addEventListener('click', nextStep);
    
    // Initialize
    initializeSteps();
    
    // Initially hide all step indicators
    steps.forEach(step => {
        const stepEl = document.getElementById(`step${step.id}`);
        if (stepEl) {
            stepEl.style.opacity = '0';
        }
    });
    
    // Show step 1 details initially
    showStepDetails(1);
    
    // Add window resize handler to reposition indicators
    window.addEventListener('resize', function() {
        // Reposition indicators after a short delay to ensure image has resized
        setTimeout(() => {
            steps.forEach(step => {
                const stepEl = document.getElementById(`step${step.id}`);
                if (stepEl) {
                    stepEl.style.top = `${step.position.top}%`;
                    stepEl.style.left = `${step.position.left}%`;
                }
            });
        }, 200);
    });
});
