import { BaseApplication } from '../../core/base-application';

export class VehicleApplication extends BaseApplication {
    constructor() { 
        super('vehicles')
    }
    
    get() {
        return super.get();
    }

    
    getById(id) {
        return super.getById(id);
    }

    create(Vehicles) {
        return super.create(Vehicles);
    }

    update(idVehicles, Vehicles) {
        return super.update(idVehicles, Vehicles);
    }

    delete(idVehicles) {
        return super.delete(idVehicles);
    }

}