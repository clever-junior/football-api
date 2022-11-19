import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Model } from 'sequelize';

import { app } from '../../app';

import Match from '../../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

const matchMock =  {
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 1,
  "awayTeam": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
};

const matchesMock = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true
  }
]

const matchesMockInProgressFalse = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": false
  }
]

const matchesMockInProgressTrue = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": true,
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true
  }
]

describe('GET /matches', () => {
  describe('Tests if returns the matches', () => {
    beforeEach(() => sinon.stub(Model, 'findAll').resolves(matchesMock as Match[]));
    afterEach(() => sinon.restore());
    
    it('Resolves status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches');

        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.deep.equal(matchesMock);
    });
  });

  describe('Tests if is possible filter match with query string', () => {
    describe('In progress false', () => {
      beforeEach(() => sinon.stub(Model, 'findAll').resolves(matchesMockInProgressFalse as Match[]));
      afterEach(() => sinon.restore());
    
    it('Resolves status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: false });

        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.deep.equal(matchesMockInProgressFalse);
    });

    it('Resolves status 200, do not have true ', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: false });

        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.not.deep.equal(matchesMock);
    });
    })
    describe('In progress true', () => {
      beforeEach(() => sinon.stub(Model, 'findAll').resolves(matchesMockInProgressTrue as Match[]));
      afterEach(() => sinon.restore());

      it('Resolves status 200', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/matches')
          .query({ inProgress: true });
  
          expect(httpResponse.status).to.equal(200);
          expect(httpResponse.body).to.deep.equal(matchesMockInProgressTrue);
      });

      it('Resolves status 200, do not have false', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/matches')
          .query({ inProgress: true });
  
          expect(httpResponse.status).to.equal(200);
          expect(httpResponse.body).to.not.deep.equal(matchesMock);
      });
    })
  });
});