# Stage 0 Task - API Integration & Data Processing

## Overview
This project is a backend API built with Node.js and Express.js for the Stage 0 assessment.

It exposes a single GET endpoint that:
- accepts a `name` query parameter
- calls the Genderize API
- processes the raw response
- returns a structured JSON result

## Features
- Validates the `name` query parameter
- Fetches gender prediction data from Genderize API
- Extracts `gender`, `probability`, and `count`
- Renames `count` to `sample_size`
- Computes `is_confident`
- Generates a dynamic `processed_at` timestamp in UTC ISO 8601 format
- Handles edge cases and error responses
- Enables CORS for external access

## Stack
- Node.js
- Express.js
- CORS

## Installation
The repository here: https://github.com/lordrock/hngstack

## Install dependencies:
npm install

## For development:
npm run dev

## For normal start:
npm start

## Server runs on:
http://localhost:3000

## API Endpoint: Classify Name
GET /api/classify?name={name}
## Example Request
GET /api/classify?name=john
## Success Response
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-10T05:00:00.000Z"
  }
}
## Error Responses: 400 Bad Request
{
  "status": "error",
  "message": "Missing or empty name parameter"
}
## 422 Unprocessable Entity
{
  "status": "error",
  "message": "name must be a string"
}
## No Prediction Available
{
  "status": "error",
  "message": "No prediction available for the provided name"
}
## 502 Upstream Error
{
  "status": "error",
  "message": "Failed to fetch prediction from upstream service"
}
## Deployment: Base URL:
https://hngstack-rock.up.railway.app

## Notes
CORS is enabled with Access-Control-Allow-Origin: *
processed_at is generated dynamically on every request
is_confident is true only when:
probability >= 0.7
sample_size >= 100

## Author
My Name is Oyewumi LordRock, I'm here to give little tips on how this project works.

This project was developed as part of a backend assessment focused on API integration, data processing, and structured response handling. It reflects my growing experience in building reliable and scalable backend services using Node.js and Express.js.

Through this project, I demonstrated my ability to design and implement a functional API that interacts with external services, validates user input, processes data based on defined rules, and returns well structured JSON responses. Special attention was given to error handling, edge case management, and ensuring that the API meets performance and formatting requirements.

Beyond just completing the task, this project represents my commitment to writing clean, maintainable, and professional code. I focused on clarity, proper structure, and adherence to best practices so that the project can be easily understood and extended in the future.

I am continuously improving my backend development skills, with a strong interest in building real world applications involving APIs, financial systems, and scalable web services.
