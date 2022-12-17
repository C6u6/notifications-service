import { Injectable } from "@nestjs/common";
import { Content } from "../entidades/content";
import { Notification } from "../entidades/notification";
import { NotificationsRepository } from '../repositories/notification.repository';

interface SendNotificationRequest {
    recipientId: string,
    content: string
    category: string,
}

interface SendNotificationResponse {
    notification: Notification;
}

@Injectable()
export class SendNotification {
    constructor(private notificationsRepository: NotificationsRepository) {}

    async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
        const {recipientId, content, category } = request;

        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category,
        });

        await this.notificationsRepository.create(notification)

        return { notification };
    }
}