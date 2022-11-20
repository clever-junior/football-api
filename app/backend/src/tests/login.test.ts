import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Model } from 'sequelize';

import User from '../database/models/User';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const bodyData = { email: 'any_email@test.com', password: 'any_password' };
const userMock = { email: 'admin@admin.com', password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };

describe('POST /login', () => {
  describe('Tests not filled fields', () => {
    describe('When "email" field not filled', () => {
      it('Resolves status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/login')
          .send({ password: bodyData.password });

        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
      });
    });
    describe('When "password" field not filled', () => {
      it('Resolves status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/login')
          .send({ email: bodyData.email });

        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
      });
    });
  });
  describe('Tests invalid fields', () => {
    describe("Email doesn't exists in database", () => {
      beforeEach(() => sinon.stub(Model, 'findOne').resolves(null));
      afterEach(() => sinon.restore());

      it('Resolves status 401', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/login')
          .send(bodyData);

      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
      });
    });

    describe("Email exists but incorrect password", () => {
      beforeEach(() => sinon.stub(Model, 'findOne').resolves(userMock as User));
      afterEach(() => sinon.restore());

      it('Resolves status 401', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/login')
          .send(bodyData);

        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
      });
    });
  });

  describe('Valid data', () => {
    beforeEach(() => sinon.stub(Model, 'findOne').resolves(userMock as User));
    afterEach(() => sinon.restore());
    
    it('Resolves status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });

      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.have.property('token');
      expect(httpResponse.body.token).to.be.a('string');
    })
  });
});

describe('GET /login/validate', () => {
  describe('Validate token and verify role', () => {
    it('Resolves status 200', async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2Njg4MzYwNTJ9.g_jfyBmiepfUjuvkW850swBOm5knyN3XnuXnKOWPlUg';
      const httpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', token);
      
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.have.key('role');
    })
  })
  describe('Verify invalid token', () => {
    it('Resolves status 401', async () => {
      const token = '';
      const httpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', token);
      
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Invalid token' });
    })
  })
});