// Chat Application Logic
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Groq Service
    const groqService = new GroqService();

    // DOM Elements
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const typingIndicator = document.getElementById('typing-indicator');
    const predictionsPanel = document.getElementById('predictions-panel');
    const predictionsList = document.getElementById('predictions-list');
    const emergencyBanner = document.getElementById('emergency-banner');
    const apiKeyInput = document.getElementById('api-key-input');
    const saveApiKeyBtn = document.getElementById('save-api-key');
    const apiKeyStatus = document.getElementById('api-key-status');
    const healthTipDisplay = document.getElementById('health-tip-display');

    // Initialize Health Tips
    if (typeof HealthTipsComponent !== 'undefined' && healthTipDisplay) {
        new HealthTipsComponent('health-tip-display', {
            interval: 10000,
            autoRotate: true
        });
    }

    // Check for existing API key
    checkApiKeyStatus();

    // API Key Management
    saveApiKeyBtn.addEventListener('click', () => {
        const apiKey = apiKeyInput.value.trim();
        if (apiKey) {
            groqService.setApiKey(apiKey);
            apiKeyStatus.textContent = '✅ API key saved successfully!';
            apiKeyStatus.style.color = '#10B981';
            apiKeyInput.value = '';
            setTimeout(() => {
                apiKeyStatus.textContent = '';
            }, 3000);
        } else {
            apiKeyStatus.textContent = '❌ Please enter a valid API key';
            apiKeyStatus.style.color = '#EF4444';
        }
    });

    function checkApiKeyStatus() {
        if (groqService.apiKey) {
            apiKeyStatus.textContent = '✅ API key configured';
            apiKeyStatus.style.color = '#10B981';
        } else {
            apiKeyStatus.textContent = '⚠️ Please enter your API key';
            apiKeyStatus.style.color = '#F59E0B';
        }
    }

    // Send Message Function
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        if (!groqService.apiKey) {
            alert('Please enter your Groq API key in the sidebar first!');
            return;
        }

        // Add user message to chat
        addMessage(message, 'user');
        chatInput.value = '';

        // Show typing indicator
        typingIndicator.style.display = 'flex';

        try {
            // Send to Groq AI
            const response = await groqService.sendMessage(message);

            // Hide typing indicator
            typingIndicator.style.display = 'none';

            // Add assistant message
            addMessage(response.message, 'assistant');

            // Display predictions if available
            if (response.predictions && response.predictions.length > 0) {
                displayPredictions(response.predictions);
            } else {
                predictionsPanel.style.display = 'none';
            }

            // Show emergency banner if needed
            if (response.emergency) {
                emergencyBanner.style.display = 'block';
                setTimeout(() => {
                    emergencyBanner.style.display = 'none';
                }, 10000);
            }

        } catch (error) {
            typingIndicator.style.display = 'none';
            addMessage(`Error: ${error.message}. Please check your API key and try again.`, 'assistant');
            console.error('Chat error:', error);
        }
    }

    // Add Message to Chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${text}</p>`;

        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Display Illness Predictions
    function displayPredictions(predictions) {
        predictionsList.innerHTML = '';
        predictionsPanel.style.display = 'block';

        predictions.forEach(pred => {
            const predItem = document.createElement('div');
            predItem.className = 'prediction-item';

            const confidencePercent = Math.round(pred.confidence * 100);

            predItem.innerHTML = `
                <div class="prediction-header">
                    <span class="prediction-name">${pred.condition}</span>
                    <span class="confidence-badge">${confidencePercent}% confidence</span>
                </div>
                <p class="prediction-reasoning">${pred.reasoning}</p>
                <div class="prediction-recommendations">
                    <strong>Recommendations:</strong>
                    <ul>
                        ${pred.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            `;

            predictionsList.appendChild(predItem);
        });
    }

    // Event Listeners
    sendButton.addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Suggested Questions
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            chatInput.value = question;
            sendMessage();
        });
    });
});
