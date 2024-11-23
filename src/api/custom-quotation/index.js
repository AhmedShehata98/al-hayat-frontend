import { ApiService } from "..";

class CustomQuotation extends ApiService {
  async getAllCustomQuotation({
    token,
    search,
    sortOrder,
    status,
    sortDirection,
    page,
    limit,
    searchByID,
  }) {
    try {
      let params = {
        pageIndex: page,
        pageSize: limit,
      };
      if (search) {
        params.SearchString = search;
      }
      if (sortOrder) {
        params.SortOrder = sortOrder;
      }
      if (sortDirection) {
        params.SortDirection = sortDirection;
      }
      if (status) {
        params.Status = status;
      }
      if (searchByID) {
        params.SearchByID = searchByID;
      }
      //
      const res = await this.axios({
        method: "GET",
        url: `${this.endpoints.customQuotation.index}`,
        params,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      return error.response?.data?.message || "An error occurred";
    }
  }

  async getCustomQuotationById({ token, id }) {
    try {
      const res = await this.axios({
        method: "GET",
        url: `${this.endpoints.customQuotation.index}/${id}`,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      return error.response?.data?.message || "An error occurred";
    }
  }

  async rejectCustomQuotation({ token, data }) {
    try {
      const res = await this.axios({
        method: "PUT",
        url: `${this.endpoints.customQuotation.reject}`,
        data,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      return error.response?.data?.message || "An error occurred";
    }
  }
}

export const customQuotationService = new CustomQuotation();
