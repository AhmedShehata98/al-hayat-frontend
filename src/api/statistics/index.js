import { ApiService } from "..";

class StatisticsService extends ApiService {
  async getTotalOrders() {
    try {
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.statistics.totalOrders,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getTodayProgress() {
    try {
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.statistics.todayProgress,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getTodayCompleted() {
    try {
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.statistics.todayCompleted,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getInProgress() {
    try {
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.statistics.inProgress,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getCompleted() {
    try {
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.statistics.completed,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getTotalIncome() {
    try {
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.statistics.totalIncome,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getTotalHoldIncome() {
    try {
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.statistics.totalHoldIncome,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getTopDrivers({ startDate, endDate, numberOfProductsToReturn }) {
    try {
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.statistics.topDrivers,
        params: {
          startDate,
          endDate,
          numberOfProductsToReturn,
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getTopProducts({ startDate, endDate, numberOfProductsToReturn }) {
    try {
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.statistics.topProducts,
        params: {
          startDate,
          endDate,
          numberOfProductsToReturn,
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export const statisticsService = new StatisticsService();
