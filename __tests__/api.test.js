const request = require('supertest');
const app = require('../index');

describe('POST /generate-scenario', () => {

  test('should return a scenario with valid inputs', async () => {
    const response = await request(app)
      .post('/generate-scenario')
      .send({
        technology: 'Docker',
        role: 'System Administrator',
        environment: 'Production'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('technology', 'Docker');
    expect(response.body).toHaveProperty('role', 'System Administrator');
    expect(response.body).toHaveProperty('environment', 'Production');
    expect(response.body).toHaveProperty('scenario_details');
    expect(response.body.scenario_details).toHaveProperty('challenge');
    expect(response.body.scenario_details).toHaveProperty('incident');
    expect(response.body.scenario_details).toHaveProperty('troubleshooting_step');
  });

  test('should return validation errors for invalid input types', async () => {
    const response = await request(app)
      .post('/generate-scenario')
      .send({
        technology: '',
        role: 'A',
        environment: 123
      });

    expect(response.statusCode).toBe(422);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.length).toBeGreaterThan(0);
  });

});