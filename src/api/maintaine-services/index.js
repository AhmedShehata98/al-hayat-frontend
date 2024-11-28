import { ApiService } from "..";
import { responseAdaptor } from "../../utils/adaptors/response-adaptor";

class MaintenanceService extends ApiService {
  async getAllMaintenanceRequests({ token }) {
    try {
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.maintenance.index,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw responseAdaptor(error);
    }
  }

  async getMaintenanceRequestDetails({ token, id }) {
    try {
      const res = await this.axios({
        method: "GET",
        url: `${this.endpoints.maintenance.index}/${id}`,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw responseAdaptor(error);
    }
  }

  async addMaintenanceService({ token, serviceData }) {
    try {
      const res = await this.axios({
        method: "POST",
        url: this.endpoints.maintenance.services.index,
        data: serviceData,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw responseAdaptor(error);
    }
  }

  async getAllMaintenanceServices({ token, limit, page }) {
    try {
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.maintenance.services.index,
        params: { limit, page },
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw responseAdaptor(error);
    }
  }

  async deleteMaintenanceService({ token, id }) {
    try {
      const res = await this.axios({
        method: "DELETE",
        url: `${this.endpoints.maintenance.services.index}/${id}`,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw responseAdaptor(error);
    }
  }

  async getWorkingHours({ token }) {
    try {
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.maintenance.workingHours.index,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw responseAdaptor(error);
    }
  }

  async updateWorkingHours({ token, workingHours }) {
    try {
      const res = await this.axios({
        method: "PUT",
        url: this.endpoints.maintenance.workingHours.index,
        data: workingHours,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw responseAdaptor(error);
    }
  }
}
export const maintenanceService = new MaintenanceService();
