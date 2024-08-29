export interface IUser {
    _id: string
    username: string;
    name: string;
    email: string;
    hashedPassword: (password: string) => {};
    role: ["admin", "user", "guest"];
    token: {
        value: string;
        expiration: Date;
    };
}