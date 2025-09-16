// services/subscription_service.ts
import { Subscription } from "../domain/entities/subscription";
import { SubscriptionModel } from "../domain/models/subscription_model";
import { HttpClient } from "../core/http";

export class SubscriptionService {
  constructor(private http: HttpClient) { }

  async subscription(subscription: Subscription): Promise<void> {
    const data = SubscriptionModel.toJson(subscription);

    const body = { registerSubscriberRequest: data };

    await this.http.post("/v1/subscription/", body);
  }
}