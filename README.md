# 🚀 NaviGo - Your Integrated Legal Solution ⚖️

[![Final Project Pemrograman Web Lanjut - [Law in Glory / Navigo]](https://i.ytimg.com/vi/Xup02FQcCCw/maxresdefault.jpg)](http://www.youtube.com/watch?v=Xup02FQcCCw8)

Welcome to **NaviGo**! A modern, fast, and efficient legal tech platform designed to empower your legal needs. Whether you're generating legal documents, analyzing MOUs, seeking legal advice from an AI, or finding a certified lawyer, NaviGo has you got you covered. Built with a powerful stack including Next.js and TypeScript, our platform provides a seamless and user-friendly experience.

## ✨ Features

-   📄 **Legal Document Generator**: Easily create custom legal documents tailored to your specific requirements.
-   🔍 **MOU Document Analyzer**: Analyze your Memorandum of Understanding (MOU) documents with precision and clarity.
-   🤖 **AI Law Chatbot**: Get instant, AI-powered answers to your legal questions.
-   👨‍⚖️ **Find a Lawyer**: Connect with certified lawyers who are perfect for your needs.
-   📊 **User Dashboard**: Manage your profile, view activity history, and handle your subscription plan all in one place.
-   🔒 **Secure Authentication**: A secure login and registration system to keep your data safe.

## 🛠️ Tech Stack

-   **Framework**: Next.js
-   **Library**: React
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **HTTP Client**: Axios
-   **Linting**: ESLint

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:

-   Node.js (>= v20)
-   PNPM (>= v9.12.2)
-   Git

### ⚙️ Installation

1.  **Clone the repository**
    ```sh
    git clone <YOUR_REPOSITORY_URL>
    ```

2.  **Navigate to the project directory**
    ```sh
    cd navigo-fe
    ```

3.  **Install dependencies**
    ```sh
    pnpm install
    ```

4.  **Run the development server**
    ```sh
    pnpm dev
    ```

Now, open `http://localhost:3000` in your browser to see the magic happen! ✨

## 📜 Available Scripts

-   `pnpm dev`: Runs the app in development mode with Turbopack.
-   `pnpm build`: Builds the app for production.
-   `pnpm start`: Starts the production server.
-   `pnpm lint`: Lints the code for errors and style issues.

## 📁 Project Structure

The project follows a standard Next.js App Router structure:

```
.
├── .eslintrc.json
├── .gitignore
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── remover.ps1
├── src
│   ├── app
│   │   ├── components
│   │   ├── dashboard
│   │   ├── feature
│   │   ├── law
│   │   ├── login
│   │   ├── navbarpage
│   │   ├── register
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── dashboard
│   │   ├── landing
│   │   └── sidebar
│   ├── context
│   │   └── AuthContext.tsx
│   └── services
│       ├── api_config.ts
│       ├── api_interceptor.ts
│       └── authService.ts
├── tsconfig.json
└── vercel.json
```
