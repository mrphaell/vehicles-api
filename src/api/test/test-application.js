import { BaseApplication } from '../../core/base-application';

export class TestApplication extends BaseApplication {
    constructor() { 
        super('tests')
    }
    
    get() {
        return super.get();
    }

    
    getById(id) {
        return super.getById(id);
    }

    create(Tests) {
        return super.create(Tests);
    }

    update(idTests, Tests) {
        return super.update(idTests, Tests);
    }

    delete(idTests) {
        return super.delete(idTests);
    }

}