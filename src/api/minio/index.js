import { ApiService } from "..";

class MinioService extends ApiService {
  async getAllCarouselImages({ token }) {
    try {
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.minio.getCarouselImages,
        headers: {
          Authorization: token,
        },
      });

      console.log(res);

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async uploadCarouselImage({ image, token }) {
    // let axiosInt = {
    //   method: "POST",
    //   url: this.endpoints.minio.uploadCarouselImages,
    //   data: image,
    // };

    try {
      const res = await this.axios({
        method: "POST",
        url: this.endpoints.minio.uploadCarouselImages,
        data: image,
        headers: {
          Authorization: token,
        },
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteCarouselImage({ imageName, token }) {
    try {
      const res = await this.axios({
        method: "DELETE",
        url: this.endpoints.minio.deleteCarouselImage,
        params: {
          objectName: imageName,
        },
        headers: {
          Authorization: token,
        },
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export const minioService = new MinioService();
