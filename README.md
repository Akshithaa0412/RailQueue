# RailQueue

### Making high-demand railway booking more transparent, predictable, and user-centric.

[Live Demo](https://dulcet-licorice-ded401.netlify.app/) · [GitHub Repository](https://github.com/Akshithaa0412/RailQueue)

> **Independent hackathon concept prototype. Not affiliated with IRCTC or Indian Railways.**

---

## Overview

RailQueue is an independent UX and technology concept that reimagines the experience around high-demand railway booking.

The problem is not only whether a ticket is available. It is also the uncertainty surrounding the process:

- Where am I in the queue?
- Why did my booking fail?
- Was my payment successful?
- When should I expect my refund?
- What evidence should I keep?
- Who should I contact?
- What happens next?

RailQueue explores a simple principle:

> **When a system is under pressure, transparency should become more important — not less.**

The prototype creates a single experience layer for Tatkal readiness, queue visibility, PNR status, payment-failure evidence, refund tracking, and grievance routing.

All railway, booking, payment, and grievance interactions are simulated using synthetic data.

---

## The Problem

High-demand ticket booking creates a particularly difficult user experience.

A user can move through a sequence like:

```text
Prepare booking
      ↓
Wait for Tatkal window
      ↓
Attempt booking
      ↓
Payment processing
      ↓
Ticket unavailable / booking failure
      ↓
"Did my payment succeed?"
      ↓
"When will I get my money back?"
      ↓
"Who do I contact?"

## Features

- **Tatkal Readiness Assistant** — simulated countdown and transparent queue
- **PNR Status Checker** — deterministic mock PNR results
- **Payment Safety Net** — locally records failed transactions
- **Refund Tracker** — tracks cancellation age and flags overdue cases
- **Grievance Filer** — generates mock complaint IDs and routes issues
- **English / Hindi** — extensible language system

> All features use synthetic data. No real bookings, payments, PNR lookups, or grievances are performed.