import { ApiService } from "..";

class AboutUs extends ApiService {
  async getAllAboutUs({ token }) {
    try {
      const res = await this.privateAxios({
        method: "GET",
        url: this.endpoints.aboutUs.index,
        headers: {
          Authorization: token,
        },
      });

      return res.data;
    } catch (error) {
      return error;
    }
  }

  async addAboutUs({ token, data }) {
    try {
      const res = await this.privateAxios({
        method: "POST",
        url: this.endpoints.aboutUs.index,
        data,
        headers: { Authorization: token },
      });

      return res.data;
    } catch (error) {
      return error;
    }
  }
}

export const aboutUsService = new AboutUs();
