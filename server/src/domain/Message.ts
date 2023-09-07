export class Message { 
    readonly text: string;
    public sentDate: Date;
    readonly id?: string;

    constructor(
        text: string,
        id?: string
    ) {
        this.text = text;
        this.sentDate = new Date();
        this.id = id;
    }
}