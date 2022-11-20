import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Model } from 'sequelize';

import { app } from '../app';

import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

const teamMock = { id:5, teamName: 'Cruzeiro' };

const teamsMock = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
];

describe('GET /teams', () => {
  describe('Returns all teams correctly', () => {
    beforeEach(() => sinon.stub(Model, 'findAll').resolves(teamsMock as Team[]));
    afterEach(() => sinon.restore());
    
    it('Resolves status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/teams')

      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(teamsMock);
    });
  });
});

describe('GET /teams/:id', () => {
  describe('Returns a specific team correctly', () => {
    beforeEach(() => sinon.stub(Model, 'findOne').resolves(teamMock as Team));
    afterEach(() => sinon.restore());

    it('Resolves status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/teams/5')

      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(teamMock);
    });
  });
  describe('Tests bad request', () => {
    beforeEach(() => sinon.stub(Model, 'findOne').resolves(null));
    afterEach(() => sinon.restore());

    it('Resolves status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/teams/5')

      expect(httpResponse.status).to.equal(400);
    });
  });
});
