// services/PushNotificationService.ts
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import {
  PushNotifications,
  Token,
  PushNotificationSchema,
  ActionPerformed,
} from '@capacitor/push-notifications';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';
import { LocalNotifications } from '@capacitor/local-notifications';

export type PushHandlers = {
  onReceive?: (n: PushNotificationSchema) => void; // app em foreground
  onClick?: (info: { from: 'background' | 'closed'; action: ActionPerformed }) => void; // clique
};

export class PushNotificationService {
  private async ensurePermission(): Promise<void> {
    const perm = await PushNotifications.checkPermissions();
    if (perm.receive !== 'granted') {
      await PushNotifications.requestPermissions();
    }
  }

  private waitForAPNsToken(timeoutMs = 12000): Promise<string> {
    return new Promise(async (resolve, reject) => {
      let settled = false;
      const finish = (fn: () => void) => {
        if (!settled) {
          settled = true;
          try {
            fn();
          } catch { }
        }
      };

      const timer = setTimeout(() => {
        finish(() => reject(new Error('Timeout esperando APNs token')));
      }, timeoutMs);

      let regHandle: PluginListenerHandle | null = null;
      let errHandle: PluginListenerHandle | null = null;

      const cleanup = () => {
        clearTimeout(timer);
        regHandle?.remove();
        errHandle?.remove();
      };

      const regPromise = PushNotifications.addListener('registration', (t: Token) => {
        finish(() => {
          cleanup();
          resolve(t.value);
        });
      });

      const errPromise = PushNotifications.addListener('registrationError', (err) => {
        finish(() => {
          cleanup();
          reject(err);
        });
      });

      regHandle = await regPromise;
      errHandle = await errPromise;

      try {
        await PushNotifications.register();
      } catch (e) {
        finish(() => {
          cleanup();
          reject(e);
        });
      }
    });
  }

  async getFCMToken(): Promise<string> {
    try {
      await this.ensurePermission();

      // if (Capacitor.getPlatform() === 'ios') {
      //   await this.waitForAPNsToken();
      // } else {
      //   await PushNotifications.register();
      // }

      const { token } = await FirebaseMessaging.getToken();
      return token ?? '';
    } catch (err) {
      console.warn('⚠️ Erro ao obter o FCM Token:', err);
      return '';
    }
  }

  async initHandlers(
    handlers: PushHandlers = {}): Promise<void> {

    if (handlers.onClick) {
      let firstActionDelivered = false;
      await PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
        const from: 'background' | 'closed' = firstActionDelivered ? 'background' : 'closed';
        firstActionDelivered = true;
        handlers.onClick!({ from, action });
      });
    }
  }
}