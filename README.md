# Project: Personal Portfolio Website

## Description

This project is a responsive and interactive personal portfolio website. It
includes features like a contact form with email integration using EmailJS, a
modal window for additional user interaction, smooth scrolling between sections,
and an optimized user interface.

## Features

- **Responsive Design:** Fully responsive and mobile-friendly layout.
- **Contact Form:** Integrated with EmailJS for sending emails directly from the
  website.
- **Interactive Modals:** Modal windows for user feedback and navigation.
- **Smooth Scrolling:** Enables smooth navigation between sections.

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **EmailJS** for email integration
- **Vite** for fast development and build tools

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-folder>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Open the application in your browser after starting the development server.
- Use the contact form to send messages (requires valid EmailJS credentials).

## Configuration

- Create a `.env.local` file in the root directory with the following variables:
  ```env
  VITE_EMAILJS_SERVICE_ID=<your-service-id>
  VITE_EMAILJS_TEMPLATE_ID=<your-template-id>
  VITE_EMAILJS_PUBLIC_KEY=<your-public-key>
  ```
