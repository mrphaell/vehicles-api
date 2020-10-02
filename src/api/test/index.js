
import { TestApplication } from './test-application';

const _getTestsMiddleWare = async (req, res) => {

    return new TestApplication()
        .get()
        .then((success) => {
            res.api.send(success, res.api.codes.OK)
        })
        .catch((err) => {
            res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR)
        });
}

const _getTestsByIdMiddleWare = async (req, res) => {
    const id = Number(req.params.id)
    return new TestApplication()
        .getById(id)
        .then((success) => {
            if (success)
                res.api.send(success, res.api.codes.OK)
            else
                res.api.send({}, res.api.codes.OK)
        })
        .catch((err) => {
            res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR)
        });
}

const _createTestsMiddleWare = async (req, res) => {
    const body = req.body;

    return new TestApplication()
        .create(body)
        .then((success) => {
            if (success)
                res.api.send(success, res.api.codes.CREATED)
            else
                res.api.send({}, res.api.codes.OK)
        })
        .catch((err) => {
            res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR)
        });
}

const _updateTestsMiddleWare = async (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    return new TestApplication()
        .update(id, body)
        .then((success) => {
            if (success)
                res.api.send(success, res.api.codes.OK)
            else
                res.api.send({}, res.api.codes.OK)
        })
        .catch((err) => {
            res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR)
        });
}

const _deleteTestsMiddleWare = async (req, res) => {
    const id = Number(req.params.id);

    return new TestApplication()
        .delete(id)
        .then((success) => {
            if (success)
                res.api.send(success, res.api.codes.OK)
            else
                res.api.send({}, res.api.codes.OK)
        })
        .catch((err) => {
            res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR)
        });
}

const TestsRoutes = (route) => {

    route.get('/api/tests', _getTestsMiddleWare)

    route.get('/api/tests/:id', _getTestsByIdMiddleWare)

    route.post('/api/tests', _createTestsMiddleWare)

    route.put('/api/tests/:id', _updateTestsMiddleWare)

    route.put('/api/tests', _updateTestsMiddleWare)

    route.delete('/api/tests/:id', _deleteTestsMiddleWare)
}

export default TestsRoutes