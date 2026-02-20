# QSO Logger Backend

Backend API for a ham radio QSO logging application.  
Built with Express and TypeScript, using MongoDB for persistence.

This project is used for:
- Development Environments compulsory assignment (workflow, tooling, CI/CD)
- A foundation to extend later for the final exam project

---

## 🎯 Purpose

The application allows radio amateurs to log QSOs (radio contacts) and later visualize and verify them.  
The current implementation is intentionally minimal, but the architecture is designed to scale.

---

## 🧩 Core Concepts

A QSO (contact) consists of:
- Callsign (own + contacted station)
- Grid locator (Maidenhead locator)
- Country (derived from callsign prefix)
- Band (ex: 20m, 40m)
- Frequency (optional precision)
- Mode (SSB, CW, FT8, etc.)
- Date and time (UTC)
- Confirmation status (matched with other station)

---

## 🛠 Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT authentication
- Joi validation
- Swagger for API documentation
- Nodemon + ts-node for development

---