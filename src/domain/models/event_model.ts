import { Event } from "../entities/event"

export class EventModel {
  static toJson(event: Event): Record<string, any> {
    return { ...event };
  }
}