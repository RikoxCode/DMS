import { Response } from 'express';

export class Guard {

    constructor(req: any, res: any, next: any) {
        this.canActivate(res, req, next)
    }

    /*
     * Optional method to get the authentication token.
     * Can be overridden by subclasses if needed.
     */
    protected getBearer(authenticationToken: string): string{
        if(!this.hasBearer(authenticationToken)){
            return '';
        }

        const regex = /^[A-Za-z0-9-_.]+\.[A-Za-z0-9-_.]+\.[A-Za-z0-9-_.+/=]*$/;
        const parts = authenticationToken.split(' ');

        if (parts.length === 2 || parts[0] === 'Bearer') {
            return parts[1];
        }

        return '';
    }

    /*
     *  Optional method to check if the authentication token is in Bearer format.
     *  Can be overridden by subclasses if needed.
     */
    protected hasBearer(authenticationToken: string): boolean {
        const regex = /^[A-Za-z0-9-_.]+\.[A-Za-z0-9-_.]+\.[A-Za-z0-9-_.+/=]*$/;
        const parts = authenticationToken.split(' ');

        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return false;
        }

        return regex.test(parts[1]);
    }

    /*
     *  Optional method to check if the token is valid (e.g., not expired).
     *  Can be overridden by subclasses if needed.
     */
    protected isTokenValid(authenticationToken: string): boolean {
        return this.hasBearer('Bearer ' + authenticationToken);
    }

    /*
     *  Optional method to check if the user has the required permissions.
     *  Can be overridden by subclasses if needed.
     */
    protected hasPermission(userRoles: string[], requiredRoles: string[]): boolean {
        return requiredRoles.some(role => userRoles.includes(role));
    }

    /*
     *  Optional method to handle unauthorized access by sending a 401 response.
     *  Can be overridden by subclasses if needed.
     */
    protected handleUnauthorized(): void {
        throw new Error('Unauthorized');
    }

    /*
     *  Abstract method to protect access to a resource.
     *  Must be implemented by subclasses.
     */
    public async canActivate(res: Response, req: any, next: any): Promise<void>{
        return;
    };
}
