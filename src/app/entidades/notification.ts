import {Content} from './content';
import {Replace} from 'src/helpers/Replace';
import { randomUUID } from 'node:crypto';

export interface NotificationProps {
    recipientId: string;
    content: Content;
    category: string;
    createdAt: Date;
    cancelledAt?: Date | null;
    readAt?: Date | null;
}

export class Notification {
    private _id: string;
    private props: NotificationProps;

    constructor(props: Replace<NotificationProps, { createdAt?: Date }>, id?: string) {
        this._id = id ?? randomUUID(),
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
        };
    }

    public get id() {
        return this._id
    }

    public set recipientId(recipientId: string) {
        this.props.recipientId = recipientId;
    }

    public get recipientId(): string {
        return this.props.recipientId;
    }

    public set content(content: Content) {
        this.props.content = content;
    }

    public get content(): Content {
        return this.props.content;
    }

    public set category(category: string) {
        this.props.category = category;
    }

    public get category(): string {
        return this.props.category;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }

    public cancel() {
       this.props.cancelledAt = new Date(); 
    }

    public get cancelledAt(): Date | null | undefined {
        return this.props.cancelledAt;
    }

    public read() {
        this.props.readAt = new Date();
    }

    public unread() {
        this.props.readAt = null;
    }

    public get readAt(): Date | null | undefined {
        return this.props.readAt;
    }
}