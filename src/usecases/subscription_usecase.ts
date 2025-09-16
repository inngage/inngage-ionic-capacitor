// application/usecases/SubscribeUseCase.ts
import { SubscriptionService } from "../services/subscription_service";
import { DeviceInfoService } from "../services/device_info_service";
import { GeolocationService } from "../services/geolocation_service";

import { SubscriptionRequest } from "../definitions"

export class SubscribeUseCase {
  constructor(
    private subscriptionService: SubscriptionService,
    private deviceInfoService: DeviceInfoService,
    private geolocationService: GeolocationService
  ) { }

  async execute(input: SubscriptionRequest): Promise<void> {
    const deviceData = await this.deviceInfoService.getDeviceInfo();
    const geo = input.requestGeolocation
      ? await this.geolocationService.getCurrentPosition()
      : null;

    const payload = {
      ...deviceData,
      app_token: input.appToken,
      identifier: input.identifier,
      custom_field: input.customField || {},
      email: input.email,
      phone_number: input.phoneNumber,
      lat: geo?.lat,
      long: geo?.long,
    };

    await this.subscriptionService.subscription(payload);
  }
}