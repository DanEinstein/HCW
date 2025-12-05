// Configuration for Groq AI
const config = {
    // API Configuration
    GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
    GROQ_API_KEY: '', // Will be loaded from .env

    // Model Configuration
    MODEL: 'llama-3.1-70b-versatile',
    TEMPERATURE: 0.7,
    MAX_TOKENS: 1024,
    TOP_P: 0.9,

    // App Configuration
    APP_NAME: 'HCW Health Assistant',
    MAX_CHAT_HISTORY: 50,

    // Load API key from environment or prompt user
    init() {
        // In a real implementation, you would load this from a .env file
        // For now, we'll check if it's set in localStorage or prompt
        const storedKey = localStorage.getItem('groq_api_key');
        if (storedKey) {
            this.GROQ_API_KEY = storedKey;
        }
        return this;
    },

    setApiKey(key) {
        this.GROQ_API_KEY = key;
        localStorage.setItem('groq_api_key', key);
    },

    hasApiKey() {
        return this.GROQ_API_KEY && this.GROQ_API_KEY.length > 0;
    }
};

// Initialize configuration
config.init();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}
