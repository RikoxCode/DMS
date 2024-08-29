const config = require('../../../dms.config.json');
import {Hasher} from "../helpers/hasher";
import {UserStore} from "../store/auth/userStore";
import {JsonValidator} from "../helpers/jsonValidator";
import {IUser} from "../interfaces/user.interface";

export class AuthController {
    constructor() {}

    public async login(req: any, res: any) {
        let errors: string[] = [];
        const user: any = req.body;

        if(!JsonValidator.hasProperty(user, 'username')) {
            res.status(403).send({
                message: 'Username is required'
            })
            return;
        } else if(!JsonValidator.hasProperty(user, 'password')) {
            res.status(403).send({
                message: 'Password is required'
            });
        }

        const userStore = new UserStore();
        const userFromDb = await userStore.getUser(user.username);

        if(!userFromDb) {
            errors.push('Invalid username');
        }

        if(!Hasher.compare(user.password, userFromDb.hashedPassword)){
            errors.push('Invalid password');
        }

        if (errors.length === 0) {
            userFromDb.token = await this.generateToken(userFromDb);
            res.status(200).send({
                message: 'Login successful',
                userFromDb
            });
        } else {
            res.status(401).send({
                message: 'Login failed',
                error: errors[0],
                errors
            });
        }
    }

    public async register(req: any, res: any) {
        const errors: string[] = await this.validateUser(req.body);

        const user = req.body;
        const userStore = new UserStore();

        if (errors.length === 0) {
            user.role = ['user', 'guest'];
            user.password = Hasher.hash(user.password);
            user.token = await this.generateToken(user);
            const result = await userStore.createUser(user);
            user._id = result.insertedId;
            res.status(200).send({
                message: 'User created',
                user: user
            });
        } else {
            res.status(500).send({
                message: 'User creation failed',
                error: errors[0],
                errors
            });
        }
    }

    public async logout(req: any, res: any) {
        this.checkToken(req.headers.authorization.split(' ')[1], res);

        const userStore = new UserStore();
        const user = await userStore.getUserByToken(req.headers.authorization.split(' ')[1]);
        user.token = {
            value: '',
            expires: 0
        }

        await userStore.updateUser(user);

        res.status(200).send({
            message: 'Logout successful'
        });
    }

    public async getUser(req: any, res: any) {
        this.checkToken(req.headers.authorization.split(' ')[1], res);

        const userStore = new UserStore();
        const user = await userStore.getUserByToken(req.headers.authorization.split(' ')[1]);
        res.status(200).send(user);
    }

    public async grantUser(req: any, res: any) {
        this.checkAdminAuthorization(req.headers.authorization.split(' ')[1], res);

        let errors: string[] = [];
        const user = req.body;

        const userStore = new UserStore();
        const userFromDb = await userStore.getUser(user.username);

        if(errors.length === 0) {
            userFromDb.role = user.role;
            const result = await userStore.updateUser(userFromDb);
            res.status(200).send({
                message: 'User role updated',
                user: result
            });
        } else {
            res.status(500).send({
                message: 'User role update failed',
                error: errors[0],
                errors
            });
        }
    }

    private async validateUser(user: any) {
        let errors: string[] = [];

        if(!user.username) {
            errors.push('Username is required');
        }else if(parseInt(user.username) || parseFloat(user.username)){
            errors.push('Username cannot be a number');
        }

        if(!user.name){
            errors.push('Name is required');
        }else if(parseInt(user.name) || parseFloat(user.name)){
            errors.push('Name cannot be a number');
        }

        if(!user.password) {
            errors.push('Password is required');
        } else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(user.password)) {
            errors.push('Password must include at least one uppercase letter, one lowercase letter, one number and one special character');
        }

        if(!user.email) {
            errors.push('Email is required');
        }else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(user.email)){
            errors.push('Email have to be a valid email address');
        }

        return errors;
    }

    private async generateToken(user: IUser) {
        const expireDate = config.backendConfig.authConfig.expiresIn;
        let expiresIn = 864;
        let charArr = expireDate.split('');

        const lastChar = charArr.pop();  // Entfernt das letzte Zeichen und speichert es
        const numericPart = parseInt(charArr.join(''));  // Fügt die restlichen Zeichen zusammen und konvertiert sie zu einer Zahl

        if(lastChar === 'd') {
            expiresIn = numericPart * 86400;
        } else if(lastChar === 'h') {
            expiresIn = numericPart * 3600;
        } else if(lastChar === 'm') {
            expiresIn = numericPart * 60;
        } else if(lastChar === 's') {
            expiresIn = numericPart;
        }

        return {
            value: Hasher.hash(user.username + Date.now() + Math.random() + user.email),
            expires: Date.now() + expiresIn
        }
    }

    private async convertBearerToken(bearerToken: string) {
        const token: string = bearerToken.split(' ')[1];

        if(!token) {
            return '';
        }

        return token;
    }

    private async checkToken(token: string, res: any) {
        console.log(token);
        token = await this.convertBearerToken(token);

        const userStore = new UserStore();
        const user = await userStore.getUserByToken(token);

        console.log(user);

        if(!user){
            res.status(401).send({
                message: 'Unauthorized'
            });

            return null;
        }

        if(user.token.value !== token && user.token.expires < Date.now()){
            res.status(401).send({
                message: 'Unauthorized'
            });

            return null;
        }

        return user;
    }

    private async checkAdminAuthorization(token: string, res: any) {
        const user: IUser = await this.checkToken(token, res);

        if( user && !user.role.includes('admin') ){
            res.status(401).send({
                message: 'Unauthorized'
            });
        }
    }
}