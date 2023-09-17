export interface IUser {
    id: string;
    email: string;
    name: string;
    password: string;
    messages: IMessage[];
}

export interface IMessage {
    _id?: string;
    text: string;
    sentDate: Date;
    userName: string;
}

export interface IUserMongoDB {
    _id: string;
    email: string;
    name: string;
    password: string;
    messages: IMessage[];
};


export interface IRoomMongoDB {
    _id?: string;
    name: string;
    userCreatorId: string;
    users: IUserMongoDB[];
}