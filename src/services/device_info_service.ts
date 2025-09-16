// services/DeviceInfoService.ts
import { Device } from "@capacitor/device";
import { App } from "@capacitor/app";
import { v4 as uuidv4 } from "uuid";
import { Subscription } from "../domain/entities/subscription";
import { PushNotificationService } from "./push_notification_service";

export class DeviceInfoService {
  async getDeviceInfo(): Promise<Pick<
    Subscription,
    | "registration"
    | "sdk"
    | "platform"
    | "device_model"
    | "device_manufacturer"
    | "os_version"
    | "os_locale"
    | "os_language"
    | "uuid"
    | "app_version"
    | "app_installed_in"
    | "app_updated_in"
  >> {
    const device = await Device.getInfo();
    const language = navigator.language || "en";
    const appInfo = await App.getInfo();
    const fcmToken = await new PushNotificationService().getFCMToken();

    return {
      registration: fcmToken,
      sdk: "1.0.0",
      platform: device.platform,
      device_model: device.model,
      device_manufacturer: device.manufacturer,
      os_version: device.osVersion,
      os_locale: language,
      os_language: language.split("-")[0],
      uuid: uuidv4(),
      app_version: appInfo.version,
      app_installed_in: new Date(),
      app_updated_in: new Date(),
    };
  }
}