import { Notification } from "../entidades/notification";
import { InMemoryNotificationsRepository } from "@test/repositories/in.memory.notifications.repository";
import { NotificationNotFound } from "./errors/notification.not.found";
import { makeNotification } from "@test/factories/notification.factories";
import { UnreadNotification } from "./unread.notifications";

const notifications: Notification[] = [];

const notificationsRepository = {
    async create(notification: Notification) {
        notifications.push(notification);
    },
}

describe('Unread Notification', () => {
    it('should be able to unread a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        const notification = makeNotification({
            readAt: new Date(),
        });

        await notificationsRepository.create(notification);


        await unreadNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].readAt).toBeNull();
    });

    it('should not be able to read a non-existing notification', () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        expect(() => {
            return unreadNotification.execute({
                notificationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFound);
    })
})