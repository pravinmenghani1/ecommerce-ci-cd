/**
 * AWS CI/CD Pipeline Visualization
 * Interactive animation of a complete CI/CD pipeline using GitHub and AWS services
 */

document.addEventListener('DOMContentLoaded', function() {
    // Define pipeline stages
    const stages = ['github', 'codebuild', 'codepipeline', 'codedeploy', 'ec2', 'alb', 'users'];
    
    // Get DOM elements
    const progressLine = document.getElementById('progressLine');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const codeCommit = document.querySelector('.code-commit');
    const server = document.getElementById('server1');
    const serverLight = server.querySelector('.server-light');
    
    // Pipeline state
    let currentStage = -1;
    let animationInProgress = false;
    
    // Add click event listeners to each stage
    stages.forEach(stage => {
        document.getElementById(stage).addEventListener('click', function() {
            // Hide all details
            document.querySelectorAll('.service-details').forEach(detail => {
                detail.classList.remove('active');
            });
            
            // Show details for clicked stage
            document.getElementById(`${stage}-details`).classList.add('active');
        });
    });
    
    /**
     * Reset the pipeline to its initial state
     */
    function resetPipeline() {
        currentStage = -1;
        animationInProgress = false;
        progressLine.style.width = '0';
        codeCommit.style.opacity = '0';
        codeCommit.style.left = '10%';
        serverLight.classList.remove('on');
        
        // Reset all stages
        stages.forEach(stage => {
            document.getElementById(stage).classList.remove('active', 'completed', 'failed');
        });
        
        // Remove any traffic dots
        document.querySelectorAll('.traffic').forEach(dot => {
            dot.remove();
        });
        
        // Reset to show GitHub details
        document.querySelectorAll('.service-details').forEach(detail => {
            detail.classList.remove('active');
        });
        document.getElementById('github-details').classList.add('active');
    }
    
    /**
     * Start the pipeline animation sequence
     */
    function startPipeline() {
        if (animationInProgress) return;
        
        resetPipeline();
        animationInProgress = true;
        
        // Developer commits code animation
        setTimeout(() => {
            codeCommit.style.opacity = '1';
            
            setTimeout(() => {
                codeCommit.style.left = '20%';
                
                setTimeout(() => {
                    advancePipeline();
                }, 1000);
            }, 1000);
        }, 500);
    }
    
    /**
     * Advance to the next stage in the pipeline
     */
    function advancePipeline() {
        currentStage++;
        
        if (currentStage >= stages.length) {
            animationInProgress = false;
            return;
        }
        
        // Calculate progress width based on current stage
        const progress = ((currentStage + 1) / stages.length) * 100;
        progressLine.style.width = `${progress}%`;
        
        // Update stage status
        for (let i = 0; i < stages.length; i++) {
            const stageEl = document.getElementById(stages[i]);
            
            if (i < currentStage) {
                stageEl.classList.remove('active');
                stageEl.classList.add('completed');
            } else if (i === currentStage) {
                stageEl.classList.add('active');
                stageEl.classList.remove('completed');
                
                // Show details for current stage
                document.querySelectorAll('.service-details').forEach(detail => {
                    detail.classList.remove('active');
                });
                document.getElementById(`${stages[currentStage]}-details`).classList.add('active');
            }
        }
        
        // Special animations for specific stages
        if (stages[currentStage] === 'ec2') {
            setTimeout(() => {
                serverLight.classList.add('on');
            }, 1000);
        }
        
        if (stages[currentStage] === 'alb') {
            createTraffic();
        }
        
        // Move to next stage after delay
        setTimeout(() => {
            advancePipeline();
        }, 3000);
    }
    
    /**
     * Create animated traffic dots from ALB to server
     */
    function createTraffic() {
        const pipelineContainer = document.querySelector('.pipeline-container');
        const albStage = document.getElementById('alb');
        const server = document.getElementById('server1');
        
        // Create multiple traffic dots with staggered timing
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const dot = document.createElement('div');
                dot.className = 'traffic';
                pipelineContainer.appendChild(dot);
                
                // Get positions
                const albRect = albStage.getBoundingClientRect();
                const serverRect = server.getBoundingClientRect();
                const containerRect = pipelineContainer.getBoundingClientRect();
                
                // Set starting position (relative to container)
                dot.style.left = (albRect.left - containerRect.left + albRect.width/2) + 'px';
                dot.style.top = (albRect.top - containerRect.top + albRect.height/2) + 'px';
                dot.style.opacity = '1';
                
                // Animate to server
                setTimeout(() => {
                    dot.style.transition = 'all 1s ease';
                    dot.style.left = (serverRect.left - containerRect.left + serverRect.width/2) + 'px';
                    dot.style.top = (serverRect.top - containerRect.top + serverRect.height/2) + 'px';
                    
                    // Remove dot after animation
                    setTimeout(() => {
                        dot.remove();
                    }, 1000);
                }, 100);
            }, i * 500);
        }
    }
    
    /**
     * Create animated traffic dots from users to ALB
     */
    function createUserTraffic() {
        const pipelineContainer = document.querySelector('.pipeline-container');
        const usersStage = document.getElementById('users');
        const albStage = document.getElementById('alb');
        
        // Create multiple traffic dots with staggered timing
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const dot = document.createElement('div');
                dot.className = 'traffic';
                pipelineContainer.appendChild(dot);
                
                // Get positions
                const usersRect = usersStage.getBoundingClientRect();
                const albRect = albStage.getBoundingClientRect();
                const containerRect = pipelineContainer.getBoundingClientRect();
                
                // Set starting position (relative to container)
                dot.style.left = (usersRect.left - containerRect.left + usersRect.width/2) + 'px';
                dot.style.top = (usersRect.top - containerRect.top + usersRect.height/2) + 'px';
                dot.style.opacity = '1';
                
                // Animate to ALB
                setTimeout(() => {
                    dot.style.transition = 'all 1s ease';
                    dot.style.left = (albRect.left - containerRect.left + albRect.width/2) + 'px';
                    dot.style.top = (albRect.top - containerRect.top + albRect.height/2) + 'px';
                    
                    // Remove dot after animation
                    setTimeout(() => {
                        dot.remove();
                    }, 1000);
                }, 100);
            }, i * 800);
        }
    }
    
    // Add event listeners to buttons
    startBtn.addEventListener('click', startPipeline);
    resetBtn.addEventListener('click', resetPipeline);
    
    // Initialize with GitHub details showing
    document.getElementById('github-details').classList.add('active');
    
    // Optional: Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Start pipeline with 'S' key
        if (event.key === 's' || event.key === 'S') {
            startPipeline();
        }
        
        // Reset pipeline with 'R' key
        if (event.key === 'r' || event.key === 'R') {
            resetPipeline();
        }
    });
    
    // Create periodic user traffic after initial load
    setTimeout(() => {
        setInterval(() => {
            if (currentStage === stages.length - 1) {
                createUserTraffic();
            }
        }, 5000);
    }, 2000);
});
