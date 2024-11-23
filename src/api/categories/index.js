import { ApiService } from "..";

class CategoryService extends ApiService {
  async getAllCategories({ sortOrder, sortDirection, search, page, limit }) {
    try {
      const params = {
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
        params.OrderDirection = sortDirection;
      }

      const res = await this.axios({
        method: "GET",
        url: this.endpoints.category.read,
        params,
      });
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async getCategoryById(categoryId) {
    try {
      const res = await this.privateAxios.get(
        `${this.endpoints.category.read}/${categoryId}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async createCategory(category) {
    try {
      const res = await this.privateAxios({
        method: "POST",
        url: this.endpoints.category.create,
        data: category,
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(categoryId) {
    try {
      const res = await this.privateAxios.delete(
        `${this.endpoints.category.delete}/${categoryId}`
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async updateCategory(categoryId, newCategory) {
    try {
      const res = await this.privateAxios.patch(
        `${this.endpoints.category.update}`,
        newCategory
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export const categoryService = new CategoryService();
