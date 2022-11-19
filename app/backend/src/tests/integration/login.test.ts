import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Model } from 'sequelize';

import User from '../../database/models/User';

import { app } from '../../app';

import LoginValidations from '../../useCases/UserUseCases/login/LoginValidations';

import { compare } from 'bcryptjs';

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
