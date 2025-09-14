document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const themeText = document.getElementById('theme-text');
    // Hamburger menu button (create if not present)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');    
    const form=document.getElementById('contact-form');
    // Hamburger menu toggle logic
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Theme persistence with localStorage
    function updateTheme(isDarkMode) {
        body.classList.toggle('dark-mode', isDarkMode);
        body.classList.toggle('light-mode', !isDarkMode);
        if (themeText) {
            themeText.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
        }
        localStorage.setItem('hcw-theme', isDarkMode ? 'dark' : 'light');
    }

    // Set initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('hcw-theme');
    let isDark = false;
    if (savedTheme === 'dark') {
        isDark = true;
    } else if (savedTheme === 'light') {
        isDark = false;
    } else {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        isDark = prefersDarkScheme.matches;
    }
    updateTheme(isDark);

    // Theme toggle button logic
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isCurrentlyDark = body.classList.contains('dark-mode');
            updateTheme(!isCurrentlyDark);
        });
    }

    // Form submission handling
    if(form){
        form.addEventListener('submit',function(event){
            event.preventDefault();
            // Check if the form is valid
            if (form.checkValidity()) {
                // If valid, show success message and reset
                alert('Form submitted successfully!');
                form.reset();
            }
        });
    }
});