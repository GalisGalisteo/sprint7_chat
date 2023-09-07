export interface IUser {
    id: string;
    email: string;
    name: string;
    password: string;
    messages: IMessage[];
}

export interface IUserMongoDB {
    _id: string;
    email: string;
    name: string;
    password: string;
    messages: IMessage[];
};

export interface IMessage {
    text: string;
    sentDate: Date;
}