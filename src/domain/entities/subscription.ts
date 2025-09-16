export interface Subscription {
  app_token: string;
  identifier: string;
  registration: string;
  platform: string;
  sdk: string;
  device_model: string;
  device_manufacturer: string;
  os_locale: string;
  os_language: string;
  os_version: string;
  app_version: string;
  app_installed_in: Date;
  app_updated_in: Date;
  uuid: string;
  attribution_id?: string;
  custom_field?: Record<string, any>;
  phone_number?: string;
  email?: string;
  lat?: string;
  long?: string;
  idfa?: string;
  advertiser_id?: string;
}