// Health Tips and Quotes Database
const healthTips = [
    {
        quote: "An apple a day keeps the doctor away",
        category: "Nutrition",
        icon: "🍎"
    },
    {
        quote: "Drink at least 8 glasses of water daily to stay hydrated",
        category: "Hydration",
        icon: "💧"
    },
    {
        quote: "Get 7-9 hours of quality sleep each night for optimal health",
        category: "Sleep",
        icon: "😴"
    },
    {
        quote: "Exercise for at least 30 minutes a day to keep your heart healthy",
        category: "Exercise",
        icon: "🏃"
    },
    {
        quote: "Wash your hands frequently to prevent the spread of germs",
        category: "Hygiene",
        icon: "🧼"
    },
    {
        quote: "Take breaks from screens every 20 minutes to protect your eyes",
        category: "Eye Health",
        icon: "👁️"
    },
    {
        quote: "Practice deep breathing to reduce stress and anxiety",
        category: "Mental Health",
        icon: "🧘"
    },
    {
        quote: "Eat a rainbow of fruits and vegetables for diverse nutrients",
        category: "Nutrition",
        icon: "🥗"
    },
    {
        quote: "Maintain good posture to prevent back and neck pain",
        category: "Posture",
        icon: "🪑"
    },
    {
        quote: "Limit processed foods and choose whole grains instead",
        category: "Nutrition",
        icon: "🌾"
    },
    {
        quote: "Stay socially connected for better mental health",
        category: "Mental Health",
        icon: "👥"
    },
    {
        quote: "Protect your skin with sunscreen when outdoors",
        category: "Skin Care",
        icon: "☀️"
    },
    {
        quote: "Reduce sugar intake to maintain healthy blood sugar levels",
        category: "Nutrition",
        icon: "🍬"
    },
    {
        quote: "Practice gratitude daily to improve overall well-being",
        category: "Mental Health",
        icon: "🙏"
    },
    {
        quote: "Stretch regularly to improve flexibility and prevent injuries",
        category: "Exercise",
        icon: "🤸"
    },
    {
        quote: "Limit caffeine intake, especially in the afternoon",
        category: "Sleep",
        icon: "☕"
    },
    {
        quote: "Schedule regular health check-ups and screenings",
        category: "Prevention",
        icon: "🏥"
    },
    {
        quote: "Practice mindfulness to reduce stress and improve focus",
        category: "Mental Health",
        icon: "🧠"
    },
    {
        quote: "Eat omega-3 rich foods for brain and heart health",
        category: "Nutrition",
        icon: "🐟"
    },
    {
        quote: "Maintain a healthy weight through balanced diet and exercise",
        category: "General Health",
        icon: "⚖️"
    },
    {
        quote: "Avoid smoking and limit alcohol consumption",
        category: "Prevention",
        icon: "🚭"
    },
    {
        quote: "Keep your living space clean to reduce allergens",
        category: "Environment",
        icon: "🏠"
    },
    {
        quote: "Take vitamin D supplements if you don't get enough sunlight",
        category: "Nutrition",
        icon: "💊"
    },
    {
        quote: "Practice good dental hygiene - brush and floss daily",
        category: "Dental Health",
        icon: "🦷"
    },
    {
        quote: "Manage stress through hobbies and relaxation techniques",
        category: "Mental Health",
        icon: "🎨"
    },
    {
        quote: "Stay active throughout the day - avoid prolonged sitting",
        category: "Exercise",
        icon: "🚶"
    },
    {
        quote: "Eat probiotic-rich foods for gut health",
        category: "Nutrition",
        icon: "🥛"
    },
    {
        quote: "Create a bedtime routine for better sleep quality",
        category: "Sleep",
        icon: "🌙"
    },
    {
        quote: "Stay up to date with vaccinations",
        category: "Prevention",
        icon: "💉"
    },
    {
        quote: "Limit screen time before bed for better sleep",
        category: "Sleep",
        icon: "📱"
    }
];

// Health Tips Component Class
class HealthTipsComponent {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.tips = healthTips;
        this.currentIndex = 0;
        this.interval = options.interval || 8000; // 8 seconds default
        this.autoRotate = options.autoRotate !== false;
        this.timer = null;

        if (this.container) {
            this.init();
        }
    }

    init() {
        this.render();
        if (this.autoRotate) {
            this.startRotation();
        }
    }

    render() {
        const tip = this.tips[this.currentIndex];

        this.container.innerHTML = `
            <div class="health-tip-card">
                <div class="tip-icon">${tip.icon}</div>
                <div class="tip-content">
                    <p class="tip-quote">"${tip.quote}"</p>
                    <span class="tip-category">${tip.category}</span>
                </div>
            </div>
        `;

        // Add fade-in animation
        const card = this.container.querySelector('.health-tip-card');
        card.style.animation = 'fadeInScale 0.6s ease-out';
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.tips.length;
        this.render();
    }

    previous() {
        this.currentIndex = (this.currentIndex - 1 + this.tips.length) % this.tips.length;
        this.render();
    }

    random() {
        const newIndex = Math.floor(Math.random() * this.tips.length);
        this.currentIndex = newIndex;
        this.render();
    }

    startRotation() {
        this.timer = setInterval(() => {
            this.next();
        }, this.interval);
    }

    stopRotation() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    destroy() {
        this.stopRotation();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { healthTips, HealthTipsComponent };
}
