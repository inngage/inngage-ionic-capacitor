import { Notification } from "../entities/notification"

export class NotificationModel {
  static toJson(notification: Notification): Record<string, any> {
    return { ...notification };
  }
}