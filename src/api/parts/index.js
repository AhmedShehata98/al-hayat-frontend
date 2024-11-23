import { ApiService } from "..";
class PartsService extends ApiService {
  async getMatchPartsWithCar({ partNo, manufacturer, year, carName }, token) {
    try {
      const response = await this.axios({
        method: "GET",
        url: this.endpoints.parts.matchWithCar,
        params: { articleNumber: partNo, manufacturer, year, carName },
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const partsService = new PartsService();
