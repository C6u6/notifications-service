import { Notification as RawNotification } from '@prisma/client';
import { Notification } from "@app/entidades/notification";
import { Content } from '@app/entidades/content';

export class PrismaNotificationMappper {
    static toPrisma(notification: Notification) {
        return {
            id: notification.id,
            category: notification.category,
            content: notification.content.value,
            recipientId: notification.recipientId,
            readAt: notification.readAt,
            createdAt: notification.createdAt,
        };
    };

    static toDomain(raw: RawNotification): Notification {
        return new Notification({
            category: 'social',
            content: new Content(raw.content),
            recipientId: raw.recipientId,
            readAt: raw.readAt,
            cancelledAt: raw.cancelledAt,
            createdAt: raw.createdAt,
        },
        raw.id,
        );
    };
}