// Groq AI Service for Healthcare Chatbot with Illness Prediction
class GroqService {
    constructor() {
        this.apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
        this.apiKey = this.loadApiKey();
        this.model = 'llama-3.1-70b-versatile';
        this.conversationHistory = [];
        this.systemPrompt = this.getSystemPrompt();
    }

    loadApiKey() {
        // Try to load from localStorage first (for testing)
        const stored = localStorage.getItem('groq_api_key');
        if (stored) return stored;

        // In production, load from environment variable
        // This would be set during build time or via a backend proxy
        return process.env.GROQ_API_KEY || '';
    }

    setApiKey(key) {
        this.apiKey = key;
        localStorage.setItem('groq_api_key', key);
    }

    getSystemPrompt() {
        return `You are an advanced healthcare information assistant with illness prediction capabilities. You analyze symptoms and provide potential health conditions with confidence levels, but you are NOT a replacement for professional medical advice.

Key guidelines:
- Analyze symptoms and predict possible illnesses with confidence scores (0.0-1.0)
- Provide accurate, evidence-based health information
- Be empathetic and supportive
- Always recommend consulting healthcare professionals for diagnosis and treatment
- Identify potential emergency situations and urge immediate medical attention
- Use clear, accessible language
- Ask clarifying questions to improve prediction accuracy
- Respect privacy and confidentiality

Response Format for Illness Prediction:
{
  "message": "Your conversational response to the user",
  "predictions": [
    {
      "condition": "Condition name",
      "confidence": 0.75,
      "reasoning": "Why this condition is likely based on symptoms",
      "recommendations": ["Action 1", "Action 2", "Action 3"]
    }
  ],
  "emergency": false,
  "healthTip": "A relevant health tip related to the conversation"
}

Emergency Detection:
If a user describes symptoms that could indicate a medical emergency (chest pain, difficulty breathing, severe bleeding, sudden severe headache, loss of consciousness, etc.), set emergency to true and immediately advise them to call emergency services (911, 999, or local emergency number).`;
    }

    async sendMessage(userMessage) {
        if (!this.apiKey) {
            throw new Error('API key not set. Please configure your Groq API key.');
        }

        // Add user message to history
        this.conversationHistory.push({
            role: 'user',
            content: userMessage
        });

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        { role: 'system', content: this.systemPrompt },
                        ...this.conversationHistory
                    ],
                    temperature: 0.7,
                    max_tokens: 1024,
                    top_p: 0.9
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'API request failed');
            }

            const data = await response.json();
            const assistantMessage = data.choices[0].message.content;

            // Add assistant response to history
            this.conversationHistory.push({
                role: 'assistant',
                content: assistantMessage
            });

            // Try to parse JSON response for structured data
            let parsedResponse;
            try {
                parsedResponse = JSON.parse(assistantMessage);
            } catch (e) {
                // If not JSON, treat as plain text
                parsedResponse = {
                    message: assistantMessage,
                    predictions: [],
                    emergency: false,
                    healthTip: null
                };
            }

            return parsedResponse;

        } catch (error) {
            console.error('Groq API Error:', error);
            throw error;
        }
    }

    clearHistory() {
        this.conversationHistory = [];
    }

    getHistory() {
        return this.conversationHistory;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GroqService;
}
