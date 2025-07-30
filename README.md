# IT Scenario API

A simple REST API that generates random IT scenarios based on user input. The API is built with Express.js and follows Test Driven Development (TDD) using Jest.

## Features
- Accepts user inputs: `technology`, `role`, `environment`
- Returns a random scenario containing:
  - Challenge
  - Incident
  - Troubleshooting Step
- Backend validations using `express-validator`
- Test coverage with Jest and Supertest


## Prerequisites
- Node.js >= 14.x
- npm

## Setup Instructions

1. **Clone or Extract Project**
   ```bash
   unzip it-scenario-api-boilerplate.zip
   cd it-scenario-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the API Server**
   ```bash
   npm start
   ```
   The API will be accessible at: `http://localhost:3000`

4. **Run Tests**
   ```bash
   npm test
   ```

## API Endpoint

### POST `/generate-scenario`

#### Request Body
```json
{
  "technology": "Cloud Computing",
  "role": "System Administrator",
  "environment": "Cloud"
}
```

#### Success Response
```json
{
  "technology": "Cloud Computing",
  "role": "System Administrator",
  "environment": "Cloud",
  "scenario_details": {
    "challenge": "Scalability issues during peak load",
    "incident": "Unexpected server crashes during deployment",
    "troubleshooting_step": "Analyze system logs and metrics to identify anomalies"
  }
}
```

#### Validation Error Response
```json
{
  "errors": [
    {
      "msg": "Technology must be at least 2 characters long",
      "param": "technology",
      "location": "body"
    }
  ]
}
```


## Project Structure
```
it-scenario-api/
├── __tests__/
│   └── api.test.js
├── index.js
├── package.json
└── README.md
```

## License
MIT