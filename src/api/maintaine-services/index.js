import { ApiService } from "..";
import { responseAdaptor } from "../../utils/adaptors/response-adaptor";

class MaintenanceService extends ApiService {
  async getAllMaintenanceRequests({
    token,
    limit = 10,
    page = 1,
    search,
    filter,
    VisitDate = new Date().toLocaleDateString(),
  }) {
    try {
      let params = {
        PageSize: limit,
        PageIndex: page,
      };

      if (search) {
        params.CustomerRequestNumber = search;
      }
      if (filter) {
        params.Status = filter !== "all" ? filter : null;
      }
      if (VisitDate) {
        params.VisitDate = VisitDate;
      }

      const res = await this.axios({
        method: "GET",
        url: this.endpoints.maintenance.index,
        params,
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

  async updateMaintenanceService({ token, serviceId, newServiceData }) {
    try {
      const res = await this.axios({
        method: "PUT",
        url: `${this.endpoints.maintenance.services.index}/${serviceId}`,
        data: newServiceData,
        params: { id: serviceId },
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

  async changeMaintenanceStatus({ token, maintenanceId, status }) {
    try {
      const res = await this.axios({
        method: "PATCH",
        url: `${this.endpoints.maintenance.status.index}`.replace(
          "{id}",
          maintenanceId
        ),
        data: { status },
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
