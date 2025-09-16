import { Geolocation } from "@capacitor/geolocation";

export class GeolocationService {
  async getCurrentPosition(): Promise<{ lat: string; long: string } | null> {
    try {
      const position = await Geolocation.getCurrentPosition();
      return {
        lat: String(position.coords.latitude),
        long: String(position.coords.longitude),
      };
    } catch (error) {
      console.warn("⚠️ Erro ao obter localização:", error);
      return null;
    }
  }
}