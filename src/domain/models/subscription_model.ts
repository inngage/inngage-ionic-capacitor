import { Subscription } from "../entities/subscription"

export class SubscriptionModel {
  static toJson(subscription: Subscription): Record<string, any> {
    return {
      ...subscription,
      app_installed_in: subscription.app_installed_in?.toISOString(),
      app_updated_in: subscription.app_updated_in?.toISOString(),
    };
  }
}