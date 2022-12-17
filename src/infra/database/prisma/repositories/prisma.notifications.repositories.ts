import { Injectable } from "@nestjs/common";
import { Notification } from "@app/entidades/notification";
import { NotificationsRepository } from "@app/repositories/notification.repository";
import { PrismaNotificationMappper } from "../mappers/prisma.notification.mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(private prisma: PrismaService) {}
    
    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = await this.prisma.notification.findMany({
            where: {
                recipientId,
            },
        });

        return notifications.map(PrismaNotificationMappper.toDomain);
    }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.prisma.notification.findUnique({
            where: {
                id: notificationId,
            },
        });

        if (!notification) {
            return null
        };

        return PrismaNotificationMappper.toDomain(notification);
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.prisma.notification.count({
            where: {
                recipientId,
            },
        });

        return count;
    }

    async create(notification: Notification): Promise<void> {

        const raw = PrismaNotificationMappper.toPrisma(notification);

        await this.prisma.notification.create({
            data: raw,
        })
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMappper.toPrisma(notification);

        await this.prisma.notification.update({
            where: {
                id: raw.id,
            },
            data: raw,
        })
    }
}