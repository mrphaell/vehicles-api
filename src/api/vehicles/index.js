
import { VehicleApplication } from './vehicle-application';

const _getVehiclesMiddleWare = async (req, res) => {

    return new VehicleApplication()
        .get()
        .then((success) => {
            res.api.send(success, res.api.codes.OK)
        })
        .catch((err) => {
            res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR)
        });
}

const _getVehiclesByIdMiddleWare = async (req, res) => {
    const id = Number(req.params.id)
    return new VehicleApplication()
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

const _createVehiclesMiddleWare = async (req, res) => {
    const body = req.body;

    return new VehicleApplication()
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

const _updateVehiclesMiddleWare = async (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    return new VehicleApplication()
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

const _deleteVehiclesMiddleWare = async (req, res) => {
    const id = Number(req.params.id);

    return new VehicleApplication()
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

const VehiclesRoutes = (route) => {

    route.get('/api/Vehicles', _getVehiclesMiddleWare)

    route.get('/api/Vehicles/:id', _getVehiclesByIdMiddleWare)

    route.post('/api/Vehicles', _createVehiclesMiddleWare)

    route.put('/api/Vehicles/:id', _updateVehiclesMiddleWare)

    route.put('/api/Vehicles', _updateVehiclesMiddleWare)

    route.delete('/api/Vehicles/:id', _deleteVehiclesMiddleWare)
}

export default VehiclesRoutes