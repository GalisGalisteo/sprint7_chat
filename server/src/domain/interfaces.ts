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
    _id?: string;
    text: string;
    sentDate: Date;
}

export interface IMessageDB {
    _id: string;
    text: string;
    sentDate: Date;
}

export interface IMessageUser {
    id: string;
    text: string;
    sentDate: Date;
    userName: string;
}