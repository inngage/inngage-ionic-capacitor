// services/subscription_service.ts
import { Notification } from "../domain/entities/notification";
import { NotificationModel } from "../domain/models/notification_model";
import { HttpClient } from "../core/http";

export class NotificationService {
  constructor(private http: HttpClient) { }

  async notification(notification: Notification): Promise<void> {
    const data = NotificationModel.toJson(notification);
    const body = { notificationRequest: data };
    await this.http.post("/v1/notification/", body);
  }
}