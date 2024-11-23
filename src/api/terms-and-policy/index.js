import { ApiService } from "..";

class TermsAndConditions extends ApiService {
  async termsAndPolicy({ token }) {
    try {
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.termsAndConditions.index,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  }
  async addTermsAndPolicy({ token, data }) {
    try {
      const res = await this.axios({
        method: "POST",
        url: this.endpoints.termsAndConditions.index,
        data,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  }
  async updateTermsAndPolicy({ token, data }) {
    try {
      const res = await this.axios({
        method: "PUT",
        url: this.endpoints.termsAndConditions.index,
        data,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  }
}

export const termsAndConditionsService = new TermsAndConditions();
