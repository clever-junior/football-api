import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
import { Server } from 'http';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests server', () => {
  beforeEach(() => sinon.stub(app, 'listen').resolves(Server));

  it('Is working', async () => {
    const httpResponse = await chai
        .request(app)
        .get('/');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal({ ok: true });
  });
});