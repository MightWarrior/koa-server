let chai = require('chai');
let chaiHttp = require('chai-http');

let Server = require('../core/Server');
let app = require('../core/App');
const config = require('../config');

chai.should();

chai.use(chaiHttp);

describe('Application', () => {
  let api;

  before(async () => {
    await app.init();
    let server = new Server(app);
    api = await server.start(config.appPort);
  });

  after(() => {
    api.close();
  });

  describe('/GET ideas', () => {
    it('it should GET ideas response', done => {
      chai
        .request(api)
        .get('/ideas')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.instanceof(Object);
          done();
        });
    });
  });

  describe('/POST ideas', () => {
    it('it should post an idea correctly', done => {
      chai
        .request(api)
        .post('/ideas')
        .send({
          id: 500,
          title: 'title',
          description: 'descriptiondescriptiondescription',
          user_id: 1
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.instanceOf(Object);
          res.body.should.have.property('title');
          res.body.title.should.be.equal('title');
          done();
        });
    });
  });

  describe('/DELETE ideas', function() {
    it('should respond 200', function(done) {
      chai
        .request(api)
        .del('/ideas/500')
        .end((end, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe();
});
