import { Notification } from "../entidades/notification";
import { InMemoryNotificationsRepository } from "@test/repositories/in.memory.notifications.repository";
import { CancelNotification } from "./cancel.notification";
import { Content } from "../entidades/content";
import { NotificationNotFound } from "./errors/notification.not.found";
import { makeNotification } from "@test/factories/notification.factories";

const notifications: Notification[] = [];

const notificationsRepository = {
    async create(notification: Notification) {
        notifications.push(notification);
    },
}

describe('Cancel Notification', () => {
    it('should be able to cancel a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        const notification = makeNotification();

        await notificationsRepository.create(notification);


        await cancelNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].cancelledAt).toEqual(expect.any(Date));
    });

    it('should not be able to cancel a non-existing notification', () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFound);
    })
})