# HCW Website

## Overview

This repository contains the source code for the HCW (Healthcare Website) project. It is a multi-page, responsive static website designed to provide reliable healthcare information and promote a compassionate, informed community. The design features a consistent, modern aesthetic with a clean layout, a professional color palette, and a user-selectable dark mode.

## Key Features

- **Multi-page Structure**: The website is composed of several key pages, including:
  - `index.html`: The homepage, providing a welcoming introduction and core mission.
  - `about.html`: Details the mission, vision, and team behind the project.
  - `goals.html`: Outlines the specific objectives of the organization.
  - `targets.html`: Identifies the key audiences the website aims to serve.
  - `Contacts.html`: A contact page with a submission form to get in touch.

- **Dynamic Features (JavaScript)**:
  - **Light/Dark Mode Toggle**: Users can switch between a light and dark theme. The preference is saved in `localStorage` for a consistent experience across sessions.
  - **Responsive Mobile Menu**: An animated hamburger menu provides seamless navigation on mobile devices.
  - **Form Validation**: The contact form includes client-side validation to ensure all fields are completed before submission.

- **Consistent & Modern Design**:
  - All pages share a cohesive design language, defined in a central `Global.css` file with page-specific overrides.
  - Each page features a unique hero section with a background image and an overlay, creating a professional look while ensuring text readability.

- **Responsive & Accessible**:
  - The layout is fully responsive, providing a seamless user experience on both desktop and mobile devices.
  - The site uses semantic HTML and ARIA attributes to improve accessibility.

## Technologies Used

- **HTML5**: For the fundamental structure and content of the web pages.
- **CSS3**: For all styling, including layout, typography, animations, and the responsive design.
- **JavaScript (ES6)**: For interactive features like the theme toggle and mobile menu.

## Project Structure

```
/HCW/
├── assets/
│   ├── index.html
│   ├── about.html
│   ├── goals.html
│   ├── targets.html
│   ├── Contacts.html
│   ├── Global.css
│   ├── index.css
│   ├── about.css
│   ├── goals.css
│   ├── targets.css
│   ├── contacts.css
│   └── script.js
├── images/
│   ├── ... (all image files)
└── README.md
```

## How to Run the Project

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd HCW/assets
    ```
3.  **Open in Browser**: Open any of the `.html` files (e.g., `index.html`) in your web browser to view the website.

---
**Author**: Danson Githuka

**Always working towards improving tech skills**
