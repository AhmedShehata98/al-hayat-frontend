import { order, orders } from "./data";
import { deepCopy } from "../../utils/deep-copy";
import { applyPagination } from "../../utils/apply-pagination";
import { applySort } from "../../utils/apply-sort";
import { ApiService } from "..";

class OrdersService extends ApiService {
  async getAllOrders(
    { search, sortOrder, status, sortDirection, page, limit, searchByID },
    token
  ) {
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

      const res = await this.privateAxios({
        method: "GET",
        url: this.endpoints.orders.read,
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

  async getOrderById(orderId, token) {
    try {
      const res = await this.privateAxios({
        method: "GET",
        url: `${this.endpoints.orders.read}/${orderId}`,
        headers: {
          Authorization: token,
        },
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async assignOrderDrivers(drivers = [], token) {
    try {
      const res = await this.privateAxios({
        method: "POST",
        url: this.endpoints.orders.driver.assignment.create,
        data: drivers,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async cancelOrder(orderId, token) {
    try {
      const res = await this.privateAxios({
        method: "POST",
        url: this.endpoints.orders.cancel.replace("{orderId}", orderId),
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
// class OrdersApi {
//   getOrders(request = {}) {
//     const { filters, page, rowsPerPage, sortBy, sortDir } = request;

//     let data = deepCopy(orders);
//     let count = data.length;

//     if (typeof filters !== 'undefined') {
//       data = data.filter((order) => {
//         if (typeof filters.query !== 'undefined' && filters.query !== '') {
//           // Checks only the order number, but can be extended to support other fields, such as customer
//           // name, email, etc.
//           const containsQuery = (order.number || '')
//             .toLowerCase()
//             .includes(filters.query.toLowerCase());

//           if (!containsQuery) {
//             return false;
//           }
//         }

//         if (typeof filters.status !== 'undefined') {
//           const statusMatched = order.status === filters.status;

//           if (!statusMatched) {
//             return false;
//           }
//         }

//         return true;
//       });
//       count = data.length;
//     }

//     if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
//       data = applySort(data, sortBy, sortDir);
//     }

//     if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
//       data = applyPagination(data, page, rowsPerPage);
//     }

//     return Promise.resolve({
//       data,
//       count
//     });
//   }

//   getOrder(request = {}) {
//     return Promise.resolve(deepCopy(order));
//   }
// }

export const ordersService = new OrdersService();
