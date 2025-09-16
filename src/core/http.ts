export class HttpClient {
  private baseUrl = "https://api.inngage.com.br";

  async post(endpoint: string, body: Record<string, any>): Promise<void> {
    const url = `${this.baseUrl}${endpoint}`;

    console.log("📡 Enviando POST para:", url);
    console.log("📦 Payload:", JSON.stringify(body, null, 2));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("❌ Erro na requisição:", response.status, response.statusText);
      console.error("🧾 Corpo do erro:", responseText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    console.log("✅ Resposta recebida com sucesso:");
    console.log("🧾 Corpo da resposta:", responseText);
  }
}