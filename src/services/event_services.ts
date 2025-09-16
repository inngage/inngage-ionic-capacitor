// services/subscription_service.ts
import { Event } from "../domain/entities/event";
import { EventModel } from "../domain/models/event_model";
import { HttpClient } from "../core/http";

export class EventService {
  constructor(private http: HttpClient) { }

  async sendEvent(event: Event): Promise<void> {
    const data = EventModel.toJson(event);
    const body = { newEventRequest: data };

    await this.http.post("/v1/events/newEvent/", body);
  }
}