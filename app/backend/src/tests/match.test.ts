import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Model } from 'sequelize';

import { app } from '../app';

import Match from '../database/models/Match';

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

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2Njg4MzYwNTJ9.g_jfyBmiepfUjuvkW850swBOm5knyN3XnuXnKOWPlUg'

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

type BodyData = {
  homeTeam?: number, // O valor deve ser o id do time
  awayTeam?: 8, // O valor deve ser o id do time
  homeTeamGoals?: 2,
  awayTeamGoals?: 2,
} 

const bodyData: BodyData = {
  homeTeam: 16, // O valor deve ser o id do time
  awayTeam: 8, // O valor deve ser o id do time
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

const responsePostMock = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoal: 2,
  inProgress: true,
};

describe('POST /matches', () => {
  describe('Tests token', async () => {
    describe('Resolves status 401', () => {
      it('When token is not provided', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/matches');

        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.deep.equal({ message: 'Token not found' });
      });
      it('When token is malformed', async () => {
        const token = 'invalid_token';
        const httpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', token);
        
        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.deep.equal({ message: 'Invalid token' });
      });
    });
  });
  describe('Tests not filled fields', () => {
    describe('When "homeTeam" field not filled', () => {
      bodyData.homeTeam = undefined;
      it('Resolves status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', validToken)
          .send({ ...bodyData });

        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
      });
    });
    describe('When "awayTeam" field not filled', () => {
      bodyData.awayTeam = undefined;
      it('Resolves status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', validToken)
          .send({ ...bodyData });

        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
      });
    });
    describe('When "homeTeamGoals" field not filled', () => {
      bodyData.homeTeamGoals = undefined;
      it('Resolves status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', validToken)
          .send({ ...bodyData });

        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
      });
    });
    describe('When "awayTeamGoals" field not filled', () => {
      bodyData.awayTeamGoals = undefined;
      it('Resolves status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', validToken)
          .send({ ...bodyData });

        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
      });
    });
  });
  describe("Home team and Away team are equal", () => {
    it('Resolves status 422', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', validToken)
        .send({
          homeTeam: 1,
          awayTeam: 1,
          homeTeamGoals: 1,
          awayTeamGoals: 2,
        });

      expect(httpResponse.status).to.equal(422);
      expect(httpResponse.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });
  })
  describe("Invalid fields", () => {
    beforeEach(() => sinon.stub(Model, 'findOne').resolves(null));
    afterEach(() => sinon.restore());

    it('Resolves status 404', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', validToken)
        .send({ homeTeam: 112, awayTeam: 213, homeTeamGoals: 2, awayTeamGoals: 2 });

      expect(httpResponse.status).to.equal(404);
      expect(httpResponse.body).to.deep.equal({ message: 'There is no team with such id!' });
    });
  })
});

describe('PATCH /:id/finish', () => {
  describe('Tests finished match', () => {
    beforeEach(() => sinon.stub(Model, 'update'));
    afterEach(() => sinon.restore());

    it('Resolves status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .patch('/matches/1/finish');

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal({ message: 'Finished' });
    })
  });
});
