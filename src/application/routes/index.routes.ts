import { Router, IRouter } from 'express';

import routeUser from './user/index.routes';

export default new (class Route {
    public router: IRouter;
    constructor() {
        this.router = Router();
        this.main();
    }

    main() {
        this.router.use('/v1', routeUser.router);
    }
})();
