import { Router, IRouter } from 'express';

import { user } from '../../controller/user/createUserController';

export default new (class Route {
    public router: IRouter;
    constructor() {
        this.router = Router();
        this.main();
    }

    main() {
        this.router.post('/user', user.store);
    }
})();
