import { ApiService } from "..";
import Cookies from "js-cookie";

class UsersServices extends ApiService {
  async getMe(token) {
    try {
      const cookieToken = Cookies.get("token");
      const res = await this.axios({
        method: "GET",
        url: this.endpoints.users.me.read,
        headers: {
          Authorization: cookieToken || token,
        },
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async updateMe(newData) {
    try {
      const res = await this.privateAxios({
        method: "PATCH",
        url: this.endpoints.users.me.update,
        params: newData,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId, token) {
    try {
      const res = await this.privateAxios.get(
        `${this.endpoints.users.read}/${userId}`,
        { headers: { Authorization: token } }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async addUser(user, token) {
    try {
      const res = await this.axios({
        method: "POST",
        url: this.endpoints.users.create,
        data: user,
        headers: {
          Authorization: token,
        },
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers({ search, sortBy, sortDir, limit, page }, token) {
    try {
      let params = {
        pageIndex: page,
        pageSize: limit,
      };

      if (search) {
        params.SearchString = search;
      }
      if (sortBy) {
        params.sortOrder = sortBy;
      }
      if (sortDir) {
        params.OrderDirection = sortDir;
      }

      const res = await this.privateAxios({
        method: "GET",
        url: this.endpoints.users.read,
        params,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  // TODO: change to get employees list
  async getAllEmployees({ search, sortBy, sortDir, limit, page }, token) {
    try {
      let params = {
        pageIndex: page,
        pageSize: limit,
      };

      if (search) {
        params.SearchString = search;
      }
      if (sortBy) {
        params.sortOrder = sortBy;
      }
      if (sortDir) {
        params.OrderDirection = sortDir;
      }

      const res = await this.privateAxios({
        method: "GET",
        url: this.endpoints.users.employees.read,
        params,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getUsersByRole({ search, orderBy, orderDir, limit, page }, token) {
    let params = {
      pageIndex: page,
      pageSize: limit,
    };

    if (search) {
      params.SearchString = search;
    }
    if (orderBy) {
      params.SortOrder = orderBy;
    }
    if (orderDir) {
      params.SortDirection = orderDir;
    }

    try {
      const res = await this.privateAxios({
        url: this.endpoints.users.roles.read,
        params,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getDriversUsers({ search, orderBy, orderDir, limit, page }, token) {
    let params = {
      pageIndex: page,
      pageSize: limit,
      searchString: "Driver",
    };

    if (orderBy) {
      params.SortOrder = orderBy;
    }
    if (orderDir) {
      params.SortDirection = orderDir;
    }
    try {
      const res = await this.privateAxios({
        url: this.endpoints.users.roles.read,
        params,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, newUserData, token) {
    try {
      const res = await this.privateAxios({
        method: "PATCH",
        url: `${this.endpoints.users.update}/${userId}`,
        data: newUserData,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async updateMe(newUserData, token) {
    try {
      const res = await this.privateAxios({
        method: "PATCH",
        url: this.endpoints.users.me.update,
        params: newUserData,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployee(userId, token) {
    try {
      const res = await this.axios.delete(
        `${this.endpoints.users.employees.delete}/${userId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(userId, token) {
    try {
      const res = await this.privateAxios.delete(
        `${this.endpoints.users.delete}/${userId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export const usersServices = new UsersServices();
