import {Guard} from "./guard";
import {Response} from "express";
import {UserStore} from "../store/auth/userStore";
import {IUser} from "../interfaces/user.interface";

export class AdminGuard extends Guard{

    override constructor(req: any, res: any, next: any) {
        super(req, res, next);
        this.canActivate(req, res, next)
    }


    /*
     *  Override the canActivate method to provide specific access control logic.
     *  @param {Response} res - The response object used to send a response back to the client.
     *  @param {string} authenticationToken - The token used for authentication.
     *  @param {string} bearerToken - The Bearer token itself extracted from the authorization header.
     *  @param {string[]} userRoles - The roles assigned to the user.
     *  @param {string[]} requiredRoles - The roles required to access the resource.
     *  @returns {boolean} - Returns true if the user is authorized, otherwise sends a 403 Forbidden response.
     */
    public override async canActivate(res: Response, req: any, next: any): Promise<void> {
        try {
            const userStore: UserStore = new UserStore();

            if(!this.hasBearer(req.headers.authorization)){
                this.handleUnauthorized();
            }

            const token = this.getBearer(req.headers.authorization);

            if(!this.isTokenValid(token)){
                this.handleUnauthorized();
            }

            const user:IUser = await userStore.getUserByToken(token);

            if(user.token.expiration < new Date()){
                throw new Error('Session expired!');
            }

            if(!this.hasPermission(user.role, ['admin'])){
                this.handleUnauthorized()
            }

            next();

        }catch (e: any){
            res.status(403).send({
               message: e.message
            });
        }
    }
}