/**
 * AWS CI/CD Pipeline Visualization
 * Interactive animation based on the pipeline architecture diagram
 */

document.addEventListener('DOMContentLoaded', function() {
    // Define pipeline steps
    const steps = [
        {
            id: 1,
            name: "Developer Code Commit",
            description: "The CI/CD pipeline begins with developers pushing code to a Git repository.",
            position: { top: 28, left: 14 },
            details: `
                <h3>1. Developer Code Commit</h3>
                <p>The CI/CD pipeline begins with developers pushing code to a Git repository. This serves as the source control system where all code changes are tracked and managed.</p>
                <p><strong>Key Functions:</strong></p>
                <ul>
                    <li>Source code management</li>
                    <li>Version control</li>
                    <li>Collaboration between developers</li>
                    <li>Pull requests and code reviews</li>
                    <li>Triggers the CI/CD pipeline on code changes</li>
                </ul>
            `
        },
        {
            id: 2,
            name: "Static Code Analysis",
            description: "Code is analyzed for quality and security issues without execution.",
            position: { top: 51, left: 31 },
            details: `
                <h3>2. Static Code Analysis</h3>
                <p>Static Code Analysis (SCA) tools like DependencyCheck, PHPStan, and SonarQube analyze the code without executing it to identify potential issues.</p>
                <p><strong>Key Functions:</strong></p>
                <ul>
                    <li>Identifies security vulnerabilities in dependencies</li>
                    <li>Detects code quality issues</li>
                    <li>Enforces coding standards</li>
                    <li>Identifies potential bugs before runtime</li>
                    <li>Provides feedback to developers early in the process</li>
                </ul>
            `
        },
        {
            id: 3,
            name: "Build & Test",
            description: "AWS CodeBuild compiles the code and runs tests, including SAST.",
            position: { top: 37, left: 42 },
            details: `
                <h3>3. Build and Test (SAST)</h3>
                <p>AWS CodeBuild compiles the source code, runs tests, and performs Static Application Security Testing (SAST).</p>
                <p><strong>Key Functions:</strong></p>
                <ul>
                    <li>Compiles and builds the application</li>
                    <li>Runs unit tests</li>
                    <li>Performs static security analysis</li>
                    <li>Creates deployment artifacts</li>
                    <li>Generates build reports</li>
                </ul>
            `
        },
        {
            id: 4,
            name: "Deploy to Staging",
            description: "Application is deployed to a staging environment for testing.",
            position: { top: 15, left: 79 },
            details: `
                <h3>4. Deploy to Staging</h3>
                <p>After successful build and tests, the application is deployed to the staging environment using AWS CodeDeploy.</p>
                <p><strong>Key Functions:</strong></p>
                <ul>
                    <li>Deploys application to Elastic Beanstalk staging environment</li>
                    <li>Ensures the application works in a production-like environment</li>
                    <li>Allows for testing before production deployment</li>
                    <li>Validates configuration settings</li>
                </ul>
            `
        },
        {
            id: 5,
            name: "Dynamic Security Testing",
            description: "Security tools test the running application for vulnerabilities.",
            position: { top: 37, left: 82 },
            details: `
                <h3>5. Dynamic Application Security Testing</h3>
                <p>DAST tools like OWASP ZAP analyze the running application to find security vulnerabilities that might not be apparent in the source code.</p>
                <p><strong>Key Functions:</strong></p>
                <ul>
                    <li>Tests the running application for security vulnerabilities</li>
                    <li>Simulates attacks to identify weaknesses</li>
                    <li>Validates security controls</li>
                    <li>Provides real-world security assessment</li>
                </ul>
            `
        },
        {
            id: 6,
            name: "Deploy to Production",
            description: "After approval, the application is deployed to production.",
            position: { top: 28, left: 97 },
            details: `
                <h3>6. Deploy to Production</h3>
                <p>After approval, the application is deployed to the production environment using AWS CodeDeploy.</p>
                <p><strong>Key Functions:</strong></p>
                <ul>
                    <li>Deploys application to Elastic Beanstalk production environment</li>
                    <li>Ensures zero or minimal downtime</li>
                    <li>Monitors deployment health</li>
                    <li>Enables rollback if issues are detected</li>
                </ul>
            `
        }
    ];
    
    // Path coordinates for animation dots
    const paths = [
        // Path 1: Git to CodeCommit
        [
            { x: 14, y: 28 },
            { x: 31, y: 28 }
        ],
        // Path 2: CodeCommit to SCA
        [
            { x: 31, y: 28 },
            { x: 31, y: 51 }
        ],
        // Path 3: CodeCommit to CodeBuild
        [
            { x: 31, y: 28 },
            { x: 42, y: 37 }
        ],
        // Path 4: CodeBuild to Staging
        [
            { x: 42, y: 37 },
            { x: 79, y: 15 }
        ],
        // Path 5: Staging to DAST
        [
            { x: 79, y: 15 },
            { x: 82, y: 37 }
        ],
        // Path 6: DAST to Production
        [
            { x: 82, y: 37 },
            { x: 97, y: 28 }
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
        
        // Remove any animation dots
        document.querySelectorAll('.animation-dot').forEach(dot => {
            dot.remove();
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
        
        // Create dot
        const dot = document.createElement('div');
        dot.className = 'animation-dot';
        pipelineContainer.appendChild(dot);
        
        // Calculate start position
        const startX = (path[0].x / 100) * imageRect.width;
        const startY = (path[0].y / 100) * imageRect.height;
        
        // Set starting position
        dot.style.left = startX + 'px';
        dot.style.top = startY + 'px';
        dot.style.opacity = '1';
        
        // Calculate end position
        const endX = (path[1].x / 100) * imageRect.width;
        const endY = (path[1].y / 100) * imageRect.height;
        
        // Animate to end position
        setTimeout(() => {
            dot.style.transition = 'all 1.5s ease';
            dot.style.left = endX + 'px';
            dot.style.top = endY + 'px';
            
            // Remove dot after animation
            setTimeout(() => {
                dot.remove();
            }, 1500);
        }, 100);
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
