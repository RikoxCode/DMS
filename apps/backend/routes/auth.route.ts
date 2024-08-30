import {Router} from "express";
import {AuthController} from "../controllers/auth.controller";
import {Logger} from "../helpers/logger";
import {AdminGuard} from "../guards/admin.guard";

const authController: AuthController = new AuthController();
const authRoute: Router = Router();

authRoute.get("/", (req, res) => res.send("Auth route"));
authRoute.post("/login", (req, res) => authController.login(req, res));
authRoute.post("/logout", (req, res) => authController.logout(req, res));
authRoute.post("/register", (req, res) => authController.register(req, res));
authRoute.post("/grant", (req, res) => new AdminGuard(req, res, authController.grantUser(req ,res)));
authRoute.post("/me", (req, res) => authController.getUser(req, res));

export { authRoute };