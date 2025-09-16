import { Capacitor } from '@capacitor/core';

export function ensureMobileOnly() {
  if (Capacitor.getPlatform() === 'web') {
    throw new Error('InngageSDK: não suportado no Web. Execute em iOS/Android.');
  }
}