import { Notification, NotificationProps } from "@app/entidades/notification";
import { Content } from "@app/entidades/content";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
    return new Notification({
        category: 'social',
        recipientId: 'recipient-2',
        content: new Content('Nova solicitação de amizade'),
        ...override,
    });
};