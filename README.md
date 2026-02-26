# 🚀 AI-Driven Code Reviewer

An intelligent AI-powered platform that automatically analyzes student code and provides professional review, optimization suggestions, and quality score.

---

# 🌐 Live Deployment

🔗 Live Demo:

[https://code-mind-reviewer--rahulsecret2004.replit.app/](https://code-mind-reviewer--rahulsecret2004.replit.app)

---

# 🎥 Project Demo Video

Click below to watch full demo:

https://github.com/SIBANSHAMISHRA/11_Development-of-AI-Driven-Code-Reviewer/blob/main/demo.mp4

---

# 📌 Project Overview

Manual code review is:

• Slow  
• Inconsistent  
• Not scalable  

This project solves this using:

• Artificial Intelligence  
• AST Analysis  
• Automated Review Engine  

---

# 🧠 Key Features

✔ AI Code Review using GPT  
✔ Bug Detection  
✔ Optimization Suggestions  
✔ Security Analysis  
✔ Complexity Analysis  
✔ Quality Score Generation  
✔ Review History Storage  

---

# 🧱 System Architecture

Flow:

User Code Input  
↓  
React Frontend  
↓  
FastAPI Backend  
↓  
AST Parser  
↓  
OpenAI GPT API  
↓  
Review Generator  
↓  
Database Storage  
↓  
Results Display  

---

# 🛠 Tech Stack

Frontend:

• React  
• TypeScript  
• TailwindCSS  

Backend:

• FastAPI  
• Python  

Database:

• PostgreSQL (NeonDB)

AI:

• OpenAI GPT-4 API  

Deployment:

• Replit  

Version Control:

• GitHub  

---

# 🤖 AI Integration

Uses:

OpenAI GPT API for:

• Code Review  
• Optimization  
• Suggestions  

AST Parser for:

• Structure Analysis  
• Complexity  

---

# 📊 Features Demonstrated

User can:

✔ Write code  
✔ Click Review  
✔ Get AI Feedback  
✔ View optimization  
✔ View score  

---

# 📂 Project Structure
AI-Driven-Code-Reviewer/
│
├── frontend/                     # React Frontend
│   │
│   ├── src/
│   │   ├── app/
│   │   │   └── App.tsx          # Main UI Layout
│   │   │
│   │   ├── components/
│   │   │   ├── CodeEditor.tsx
│   │   │   ├── AIAnalysisPanel.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   ├── ComplexityMeter.tsx
│   │   │   ├── TerminalPanel.tsx
│   │   │   └── FileExplorer.tsx
│   │   │
│   │   ├── main.tsx
│   │   └── styles/
│   │
│   ├── package.json
│   └── vite.config.ts
│
│
├── backend/                      # FastAPI Backend
│   │
│   ├── app/
│   │   │
│   │   ├── main.py              # FastAPI entry point
│   │   │
│   │   ├── config.py           # Environment configuration
│   │   │
│   │   ├── database.py         # Database connection
│   │   │
│   │   ├── models.py           # Database models
│   │   │
│   │   ├── schemas.py          # API schemas
│   │   │
│   │   ├── auth.py             # Authentication logic
│   │   │
│   │   ├── routes/
│   │   │   ├── review.py
│   │   │   ├── auth_routes.py
│   │   │   ├── github.py
│   │   │   ├── files.py
│   │   │   ├── history.py
│   │   │   └── terminal.py
│   │   │
│   │   ├── engines/
│   │   │   ├── ai/
│   │   │   │   ├── openai_reviewer.py
│   │   │   │   ├── ai_provider.py
│   │   │   │   ├── optimization.py
│   │   │   │   └── detection.py
│   │   │   │
│   │   │   ├── ast/
│   │   │   │   └── analyzer.py
│   │   │   │
│   │   │   └── security/
│   │   │       └── vulnerability_scanner.py
│   │   │
│   │   └── services/
│   │       ├── scoring_service.py
│   │       └── github_service.py
│   │
│   └── requirements.txt
│
│
├── demo.mp4                     # Project demo video
│
├── presentation.pdf            # Project presentation
│
├── README.md                   # Project documentation
│
└── .env                        # Environment variables
