import { ApiService } from "../index";
class ProductsServices extends ApiService {
  async getAllProducts({
    token,
    search,
    sortDir,
    sortBy,
    page = 1,
    limit = 10,
  }) {
    try {
      let params = {
        pageIndex: page,
        pageSize: limit,
      };
      let axiosInt = {
        method: "GET",
        url: this.endpoints.products.read,
        params,
      };

      if (search) {
        params.SearchString = search;
      }
      if (sortDir) {
        params.SortDirection = sortDir;
      }
      if (sortBy) {
        params.SortOrder = sortBy;
      }
      if (token) {
        axiosInt.headers = { Authorization: token };
      }

      const res = await this.privateAxios(axiosInt);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getProductById({ productId, token }) {
    try {
      const res = await this.privateAxios({
        method: "GET",
        url: `${this.endpoints.products.readById}/${productId}`,
        headers: { Authorization: token },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async createProduct({ product, token }) {
    try {
      const res = await this.privateAxios.post(
        this.endpoints.products.create,
        product,
        { headers: { Authorization: token } }
      );

      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async updateProduct({ newProduct, token }) {
    try {
      const res = await this.privateAxios.patch(
        `${this.endpoints.products.update}`,
        newProduct,
        { headers: { Authorization: token } }
      );

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct({ productId, token }) {
    try {
      const res = await this.privateAxios({
        method: "DELETE",
        url: `${this.endpoints.products.delete}${productId}`,
        headers: { Authorization: token },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export const productsService = new ProductsServices();
