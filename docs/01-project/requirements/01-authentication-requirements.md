# Overview

# Project: Full Stack Auth System

## 1. Overview

A production-grade authentication service built as the foundation of a portfolio
web application. It demonstrates full-stack engineering practices — API design,
security, testing, and cloud deployment — to an engineering hiring audience.

---

## 2. Problem Statement

Junior-to-mid engineers often ship auth systems with common vulnerabilities
(plain-text passwords, no token rotation, no rate limiting). This project
demonstrates an auth implementation that addresses each of those failure modes
at production quality.

---

## 3. Goals

| Goal                      | Success Metric                                        |
| ------------------------- | ----------------------------------------------------- |
| Secure authentication API | Passes OWASP Top 10 checklist for auth                |
| Demonstrable code quality | ≥ 80% test coverage, ESLint clean                     |
| Cloud-deployed            | Live endpoint accessible via AWS API Gateway          |
| Recruiter-ready           | README with architecture diagram + Postman collection |

---

## 4. Scope

**In scope**

- User registration and login (email + password)
- JWT issuance and refresh token rotation
- Role-Based Access Control (RBAC) with at least two roles: `user`, `admin`
- Rate limiting on auth endpoints
- Password hashing with bcrypt
- Input validation and structured error responses
- Unit + integration tests (Jest)
- AWS deployment (Lambda + API Gateway or EC2)

**Out of scope**

- OAuth / social login (Google, GitHub) — deferred to Level 3
- Multi-factor authentication — future enhancement
- Frontend UI — separate deliverable
- Billing or subscription management

---

## 5. Stakeholders

| Role             | Name                         | Responsibility                         |
| ---------------- | ---------------------------- | -------------------------------------- |
| Engineer (owner) | Kevin T                      | Design, build, deploy, maintain        |
| Audience         | Recruiters / hiring managers | Evaluate code quality and architecture |

---

## 6. Tech Stack

| Layer     | Technology                                | Rationale                                                         |
| --------- | ----------------------------------------- | ----------------------------------------------------------------- |
| Runtime   | Node.js + TypeScript                      | Type safety, wide industry adoption                               |
| Framework | Express                                   | Lightweight, familiar, well-documented                            |
| Database  | PostgreSQL (primary) / DynamoDB (stretch) | Relational fits auth model; DynamoDB shows cloud-native awareness |
| Auth      | JWT (access) + Refresh Token rotation     | Industry-standard stateless auth pattern                          |
| Hashing   | bcrypt                                    | Well-vetted, configurable cost factor                             |
| Testing   | Jest                                      | Matches existing project setup                                    |
| Cloud     | AWS (Lambda + API Gateway or EC2)         | Portfolio differentiator                                          |
| CI/CD     | GitHub Actions                            | Automatic test + deploy on push                                   |

---

## 7. Non-Functional Requirements

- **Security:** Passwords never stored in plain text. Tokens must be short-lived
  (access: 15 min, refresh: 7 days). Refresh tokens invalidated on rotation.
- **Performance:** Auth endpoints respond in < 300ms at p95 under normal load.
- **Reliability:** Service returns structured JSON errors — never crashes with
  unhandled exceptions.
- **Observability:** Request logs include correlation IDs for traceability.
- **Maintainability:** Code passes ESLint with zero warnings before merge.

---

## 8. Constraints & Assumptions

- Free-tier AWS resources only — no cost budget.
- No existing users or legacy data to migrate.
- Email uniqueness enforced at the database level (unique constraint).
- Refresh token storage uses the database, not Redis (no extra infra cost).

---

## 9. Risks

| Risk                               | Likelihood | Impact | Mitigation                                                            |
| ---------------------------------- | ---------- | ------ | --------------------------------------------------------------------- |
| Token leakage via insecure storage | Medium     | High   | Document expected client storage strategy (httpOnly cookie) in README |
| DynamoDB cost overrun              | Low        | Low    | Default to PostgreSQL; add DynamoDB as optional stretch               |
| Timeline slip                      | Medium     | Medium | MVP = registration + login + JWT; RBAC + rate limiting are additive   |

---

## 10. Related Documents

- [Authentication Requirements](requirements/01-authentication-requirements.md)
- [Database Design](../02-design/database/index.md)
- [API Design — Authentication](../02-design/apis/authentication/)
