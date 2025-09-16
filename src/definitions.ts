export type SubscriptionRequest = {
  appToken: string;
  identifier: string;
  requestGeolocation?: boolean;
  customField?: Record<string, any>;
  email?: string;
  phoneNumber?: string;
}

export type EventRequest = {
  appToken: string;
  eventName: string;
  eventValues?: Record<string, any>;
  conversionEvent?: boolean;
  conversionValue?: number;
  conversionNotId?: string;
}
