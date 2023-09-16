export class Message {
    readonly text: string;
    public sentDate: Date;
    public userName: string;
    readonly id?: string;

    constructor(
        text: string,
        userName: string,
        id?: string
    ) {
        this.text = text;
        this.sentDate = new Date();
        this.id = id;
        this.userName = userName
    }
}