import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import teamsMock from './mocks/teamsMock';
import finishedMatchesMock from './mocks/finishedMatchesMock';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NjY4OTkzOTd9.jVv79LMK4qWB_XvhLcwLC3VbIsKikFXvT5KNokYnwEs'

describe('GET /leaderboards', () => {
  describe('Resolves status 200', () => {
    beforeEach(() => {
      sinon
        .stub(Team, "findAll")
        .resolves(teamsMock as Team[]);
  
        // sinon
        //   .stub(Match, "findAll")
        //   .resolves(finishedMatchesMock as Match[]);
    });
  
    afterEach(() => sinon.restore());

    it('Tests resolves complete leaderboard', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/leaderboard')
        .set('authorization', token);
  
      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body.length).to.be.eq(16)
    });
  
    it('Tests resolves home teams leaderboard', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
      .set('authorization', token);
  
      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body.length).to.be.eq(16)
    });
  
    it('Tests resolves away teams leaderboard', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/leaderboard/away')
      .set('authorization', token);
  
      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body.length).to.be.eq(16)
    });
  });
})