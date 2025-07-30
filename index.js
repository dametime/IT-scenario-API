//Require all the packages
const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//Initialization of Pre-defined Datasets
const challenges = [
  "Scalability issues during peak load",
  "Data inconsistency across microservices",
  "Legacy system integration difficulties",
  "Security vulnerabilities detected in codebase",
  "Slow CI/CD pipeline performance"
];

const incidents = [
  "Production outage due to database deadlock",
  "Service latency spike in the EU region",
  "Unexpected server crashes during deployment",
  "User authentication failures after a patch update",
  "Memory leak causing gradual server slowdown"
];

const troubleshootingSteps = [
  "Analyze system logs and metrics to identify anomalies",
  "Roll back to the previous stable version",
  "Conduct a security audit and apply patches",
  "Implement load balancing and horizontal scaling",
  "Refactor resource-intensive functions for optimization"
];

//Randomization Function Definition
const getRandomItem = (list) => list[Math.floor(Math.random() * list.length)];

//Backend Validation To make sure the data type is a string , it's not empty and contains at least two characters
const scenarioValidationRules = [
  body('technology')
    .exists().withMessage('Technology is required')
    .isString().withMessage('Technology must be a string')
    .isLength({ min: 2 }).withMessage('Technology must be at least 2 characters long'),

  body('role')
    .exists().withMessage('Role is required')
    .isString().withMessage('Role must be a string')
    .isLength({ min: 2 }).withMessage('Role must be at least 2 characters long'),

  body('environment')
    .exists().withMessage('Environment is required')
    .isString().withMessage('Environment must be a string')
    .isLength({ min: 2 }).withMessage('Environment must be at least 2 characters long')
];

app.post('/generate-scenario', scenarioValidationRules, (req, res) => {
  const errors = validationResult(req);
  //Listens for error 
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { technology, role, environment } = req.body;

  const scenario = {
    technology,
    role,
    environment,
    scenario_details: {
      challenge: getRandomItem(challenges),
      incident: getRandomItem(incidents),
      troubleshooting_step: getRandomItem(troubleshootingSteps)
    }
  };
// In the absence of errors, returns the random scenario in a json format.
  res.json(scenario);
});

module.exports = app;

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`);
  });
}