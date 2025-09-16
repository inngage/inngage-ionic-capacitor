import { EventRequest } from "../definitions";
import { EventService } from "../services/event_services";
import { PushNotificationService } from "../services/push_notification_service";

export class EventUseCase {
  constructor(
    private eventService: EventService,
  ) { }

  async execute(input: EventRequest): Promise<void> {
    const fcmToken = await new PushNotificationService().getFCMToken();
    const payload = {
      app_token: input.appToken,
      registration: fcmToken,
      event_name: input.eventName,
      event_values: input.eventValues,
      conversion_event: input.conversionEvent,
      conversion_value: input.conversionValue,
      conversion_notid: input.conversionNotId
    };

    await this.eventService.sendEvent(payload);
  }
}