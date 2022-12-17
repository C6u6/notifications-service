import { Notification } from "src/app/entidades/notification"

export class NotificationViewModel {
    static toHTTP(notification: Notification) {
        return {
            id: notification.id,
            category: notification.category,
            content: notification.content.value,
            recipientId: notification.recipientId,
        };
    }
}