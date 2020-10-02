import assert from 'assert';
import app from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Teste - Veículos', () => {
    var server;
    var testId;

    beforeEach(function () {
        server = chai.request(app);
    });

    describe('GET /vehicles', () => {
        it('Resposta deve vir com sucesso para requisição GET /vehicles', (done) => {
            server
                .get('/api/vehicles')
                .end((err, res) => {
                    assert.deepStrictEqual(res.statusCode, 200);
                    done();
                });
        });
    });

    describe('POST /vehicles', () => {
        it('Resposta deve vir com sucesso para requisição POST /vehicles e deve ter conteúdo', (done) => {
            server
                .post('/api/vehicles')
                .set('content-type', 'application/json')
                .send({
                    "placa": "ABC1D23",
                    "chassi": "125542215H",
                    "renavam": 51510215451,
                    "modelo": "Compass",
                    "marca": "Jeep",
                    "ano": 2020
                })
                .end((err, res) => {
                    testId = res.body.data[res.body.data.length - 1].id;
                    assert.deepStrictEqual(res.body.code, 201);
                    done();
                });
        });
    });

    describe('GET /vehicles/id', () => {
        it('Resposta deve vir com sucesso para requisição GET /vehicles/id e deve ter conteúdo', (done) => {
            server
                .get('/api/vehicles/' + testId)
                .end((err, res) => {
                    assert(res.body.data.id);
                    assert.deepStrictEqual(res.statusCode, 200);
                    done();
                });
        });
    });

    describe('PUT /vehicles', () => {
        it('Resposta deve vir com sucesso para requisição PUT /vehicles e deve ter conteúdo', (done) => {
            server
                .put('/api/vehicles/' + testId)
                .set('content-type', 'application/json')
                .send({
                    "id": testId,
                    "placa": "ABC1D34",
                    "chassi": "1A2BC34DE",
                    "renavam": 51510215451,
                    "modelo": "Compass",
                    "marca": "Jeep",
                    "ano": 2020
                })
                .end((err, res) => {
                    assert(res.body.data);
                    assert.deepStrictEqual(res.body.code, 200);
                    done();
                });
        });
    });

    describe('DELETE /vehicles/id', () => {
        it('Resposta deve vir com sucesso para requisição DELETE /vehicles/id', (done) => {
            server
                .delete('/api/vehicles/' + testId)
                .end((err, res) => {
                    assert.deepStrictEqual(res.body.code, 200);
                    done();
                });
        });
    });

    describe('GET /not/exists', () => {
        it('Resposta deve vir com erro para requisição GET /not/exists e deve ter mensagem "route_not_found"', (done) => {
            server
                .get('/not/exists')
                .end((err, res) => {
                    assert.deepStrictEqual(res.body.code, 404);
                    assert.deepStrictEqual(res.body.message, 'route_not_found');
                    done();
                });
        });
    });
});