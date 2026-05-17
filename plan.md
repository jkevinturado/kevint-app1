# Portfolio Project Build Plan

## Background:

Basically, just to build visible portfolio, to showcase the skills as Senior Software Engineer. To be shown in GitHub and deploy in AWS and GitHub page for Frontend. A production grade web application that starts with simple authentication system and will be scale into bigger project.

- **Goal:** Build a strong GitHub portfolio to impress and attract bigger tech companies

- **Timeline:** 6 weeks before September 2026

## 📋 Build Order Overview

| Week | Project                            | Level           | Status         |
| ---- | ---------------------------------- | --------------- | -------------- |
| 1–2  | Full Stack Auth System             | 🟢 Beginner     | ⬜ Not started |
| 2–3  | Serverless REST API + CI/CD        | 🟡 Intermediate | ⬜ Not started |
| 3–4  | Agentic AI Tool                    | 🔴 Impressive   | ⬜ Not started |
| 4–6  | Full Stack App with AI Integration | 🏆 Centrepiece  | ⬜ Not started |

---

## 🟢 Level 1 — Full Stack Auth System

_Week 1–2_

### Tech Stack

- **Backend:** Node.js + TypeScript + Express
- **Frontend:** React
- **Database:** PostgreSQL or DynamoDB
- **Cloud:** AWS (Lambda + API Gateway or EC2)
- **Auth:** JWT + refresh token rotation

### Features to Build

- [ ] User registration and login
- [ ] JWT authentication + refresh token rotation
- [ ] Role-based access control (RBAC)
- [ ] Rate limiting — prevent brute force attacks
- [ ] Password hashing with bcrypt
- [ ] Input validation and error handling
- [ ] Unit tests with Jest
- [ ] Deploy on AWS
- [ ] Clean README with architecture diagram

---

## 🟡 Level 2 — Serverless REST API + CI/CD

_Week 2–3_

### Project Ideas — Pick One

- Task Manager API
- URL Shortener
- Note Taking App
- Bookmark Saver

### Tech Stack

- **Backend:** Node.js + TypeScript + Express
- **Cloud:** AWS Lambda + API Gateway + DynamoDB
- **Testing:** Jest unit tests + integration tests
- **CI/CD:** GitHub Actions pipeline
- **IaC:** Terraform
- **Docs:** Swagger API documentation

### Features to Build

- [ ] Full CRUD operations
- [ ] AWS Lambda functions
- [ ] API Gateway setup
- [ ] DynamoDB integration
- [ ] Jest unit tests
- [ ] Jest integration tests
- [ ] GitHub Actions CI/CD pipeline — test and deploy on push
- [ ] Terraform infrastructure setup
- [ ] Swagger API documentation
- [ ] Clean README with setup instructions

---

## 🔴 Level 3 — Agentic AI Tool

_Week 3–4_

#### Option A — AI Code Reviewer CLI

A command line tool that reviews code quality using Claude AI.

**How it works:**

1. Developer runs the CLI on a file or git diff
2. Tool sends code to Claude AI with a structured prompt
3. Claude analyses for KISS, DRY, security issues, and best practices
4. Returns a structured review report with line-level feedback

**Tech Stack:** Node.js + TypeScript + Claude AI API + Commander.js (CLI framework)

#### Option B — AI Log Analyser

A tool that analyses log files and generates bug reports using Claude AI.

**How it works:**

1. Tool reads a log file or accepts log input
2. Sends logs to Claude AI for analysis
3. Claude identifies root cause and suggests remediation steps
4. Returns a structured bug report with implementation plan

**Tech Stack:** Node.js + TypeScript + Claude AI API

### Features to Build

- [ ] Core AI integration with Claude API
- [ ] Structured prompt engineering
- [ ] Structured output — clean, readable report format
- [ ] Error handling for API failures
- [ ] CLI interface (for Option A)
- [ ] Unit tests
- [ ] Clear README explaining the tool and how to use it
- [ ] Example inputs and outputs in the README

---

## 🏆 Level 4 — Full Stack App with AI Integration

_Week 4–6_

### Project Ideas — Pick One

- AI-powered Document Annotator _(relevant to Kami)_
- AI-powered Recruitment Tool _(relevant to Halter — candidate tracker with AI screening)_
- AI-powered Developer Dashboard _(tracks your LeetCode, GitHub, and learning progress)_

### Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Node.js + TypeScript + Express
- **Database:** PostgreSQL or DynamoDB
- **Cloud:** AWS Serverless (Lambda, API Gateway, S3, CloudFront)
- **Auth:** JWT system from Level 1
- **AI:** Claude AI integration
- **Testing:** Jest + Playwright E2E tests
- **CI/CD:** GitHub Actions
- **IaC:** Terraform
- **Deploy:** Live URL via AWS CloudFront

### Features to Build

- [ ] Full frontend with React
- [ ] Backend REST API
- [ ] Database integration
- [ ] Authentication from Level 1
- [ ] At least one meaningful AI feature
- [ ] Unit tests — Jest
- [ ] E2E tests — Playwright
- [ ] CI/CD pipeline
- [ ] Terraform infrastructure
- [ ] Live deployed URL
- [ ] Professional README with architecture diagram
- [ ] Demo video or screenshots in README

---

## 🌐 Portfolio Website

_Build alongside Level 3–4_

A simple one-page site to use as your **Portfolio URL** for job applications.

### Deploy Options — Free

- **GitHub Pages** — github.io (free, easy)
- **Vercel** — vercel.com (free, fast)
- **Netlify** — netlify.com (free, simple)

### What to Include

- [ ] Your name and title — Senior Software Engineer
- [ ] Short bio — 2–3 sentences
- [ ] Tech stack icons
- [ ] Project cards with GitHub links and live demo links
- [ ] LinkedIn link
- [ ] Contact email
- [ ] Clean, professional design

---

## 📌 GitHub Profile README

_Set up in Week 1_

Your GitHub profile README is the first thing recruiters see. Set it up immediately.

### What to Include

- [ ] Name and title
- [ ] Short bio
- [ ] Tech stack badges
- [ ] Links to pinned projects
- [ ] LinkedIn link
- [ ] GitHub activity graph
- [ ] Currently learning section

### Pin These Repos on Your Profile

1. Full Stack Auth System
2. Serverless REST API
3. Agentic AI Tool
4. Full Stack App with AI

---
