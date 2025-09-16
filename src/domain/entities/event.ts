export interface Event {
  app_token: string;
  registration: string;
  event_name: string;
  event_values?: Record<string, any>;
  conversion_event?: boolean;
  conversion_value?: number;
  conversion_notid?: string;
}