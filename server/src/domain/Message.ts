export class Message { 
    readonly text: string;
    readonly id?: string;

    constructor(
        text: string,
        id?: string
    ) {
        this.text = text;
        this.id = id;
    }
}