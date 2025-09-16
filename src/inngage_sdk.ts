import { ensureMobileOnly } from './platforms';
import { EventRequest, SubscriptionRequest } from './definitions';
import { DeviceInfoService } from './services/device_info_service';
import { GeolocationService } from './services/geolocation_service';
import { HttpClient } from './core/http';
import { SubscriptionService } from './services/subscription_service';
import { EventService } from './services/event_services';
import { NotificationService } from './services/notification_service';
import { SubscribeUseCase } from './usecases/subscription_usecase';
import { EventUseCase } from './usecases/event_usecase';
import { PushNotificationService, PushHandlers } from './services/push_notification_service';

type NotificationEntity = { id: string;[k: string]: any };

export class InngageSDK {
  private subscribeUseCase: SubscribeUseCase;
  private eventUseCase: EventUseCase;
  private pushSvc: PushNotificationService;
  private notificationSvc: NotificationService;

  private appToken?: string;

  constructor() {
    ensureMobileOnly();

    const http = new HttpClient();
    const subscriptionService = new SubscriptionService(http);
    const eventService = new EventService(http);
    this.notificationSvc = new NotificationService(http);
    this.pushSvc = new PushNotificationService();

    const deviceInfo = new DeviceInfoService();
    const geo = new GeolocationService();

    this.subscribeUseCase = new SubscribeUseCase(subscriptionService, deviceInfo, geo);
    this.eventUseCase = new EventUseCase(eventService);
  }

  async registerSubscription(data: SubscriptionRequest): Promise<void> {
    if (!data.appToken || !data.identifier) {
      throw new Error('InngageSDK: appToken e identifier são obrigatórios.');
    }
    this.appToken = data.appToken;
    await this.subscribeUseCase.execute(data);
  }

  async sendEvent(data: EventRequest): Promise<void> {
    await this.eventUseCase.execute(data);
  }

  async initPushHandlers(
    handlers: PushHandlers = {},
    opts: { appToken?: string } = {}): Promise<void> {
    await this.pushSvc.initHandlers({
      onReceive: handlers.onReceive,
      onClick: async ({ from, action }) => {
        try {
          const data = action.notification?.data || {};
          const notId: string | undefined =
            data.notId ?? data.notid ?? data.notification_id ?? data.notificationId ?? data.id;

          const tokenToUse = opts.appToken ?? this.appToken;
          if (!tokenToUse) {
            console.warn('⚠️ Sem appToken disponível para enviar status de clique');
          }

          if (notId && tokenToUse) {
            const notif: NotificationEntity = { app_token: tokenToUse, id: notId };
            await this.notificationSvc.notification(notif as any);
          } else {
            console.warn('🔎 Clique sem notId no payload:', data);
          }
        } catch (e) {
          console.warn('⚠️ Falha ao enviar status de clique:', e);
        }
        handlers.onClick?.({ from, action });
      },
    });
  }
}