import {DbController} from "../dbController";
import {Hasher} from "../../helpers/hasher";
import type {IUser} from "../../interfaces/user.interface";
import {ObjectId} from "mongodb";

export class UserStore extends DbController {
    constructor() {
        super();
    }

    public async getUser(username: IUser) {
        return await this.query(() => {
            return this.collection!.findOne({username});
        }, 'users');
    }

    public async getUsers() {
        return await this.query(() => {
            return this.collection!.find({});
        }, 'users');
    }

    public async createUser(user: IUser) {
        return await this.query(() => {
            return this.collection!.insertOne({user});
        }, 'users');
    }

    public async updateUser(user: IUser) {
        return await this.query(() => {
            return this.collection!.updateOne({ "_id": new ObjectId(user._id) }, { $set: user });
        }, 'users');
    }

    public async deleteUser(userId: string) {
        return await this.query(() => {
            return this.collection!.deleteOne({userId});
        });
    }

    public async getUserByToken(token: string) {
        return await this.query(() => {
            return this.collection!.findOne({ token: { value: token }});
        });
    }
}