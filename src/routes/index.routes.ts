import { Router, IRouter } from "express";

export default new (class Route {
    public router: IRouter;
    constructor() {
        this.router = Router();
        this.main();
    }

    main() {
        this.router.post("/", (req, res) => {
            res.json("Hello World");
        });
    }
})();
