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

  async getProductById(productId) {
    try {
      const res = await this.privateAxios.get(
        `${this.endpoints.products.readById}/${productId}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(product) {
    try {
      const res = await this.privateAxios.post(
        this.endpoints.products.create,
        product
      );

      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async updateProduct(productId, product) {
    try {
      const res = await this.privateAxios.patch(
        `${this.endpoints.products.update}`,
        product
      );

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const res = await this.privateAxios.delete(
        `${this.endpoints.products.delete}${productId}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getPartById(partId) {
    try {
      const res = await this.axios.get(
        `${this.endpoints.products.partById}${partId}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllProductDescription() {
    try {
      const res = await this.axios.get(
        this.endpoints.products.description.read
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getProductDescriptionById(productDescriptionId) {
    try {
      const res = await this.axios.get(
        `${this.endpoints.products.description.read}/${productDescriptionId}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async createProductDescription(productDescription) {
    const { manifactringNumber, trademark, type, size } = productDescription;
    try {
      const req = await this.privateAxios({
        method: "POST",
        url: this.endpoints.products.description.create,
        data: { manifactringNumber, trademark, type, size },
      });

      return req.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProductDescription(productDescriptionId, productDescription) {
    try {
      const res = await this.privateAxios.patch(
        `${this.endpoints.products.description.update}${productDescriptionId}`,
        productDescription
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductDescription(productDescriptionId) {
    try {
      const res = await this.privateAxios.delete(
        `${this.endpoints.products.description.delete}${productDescriptionId}`
      );

      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
// Old version
//
// getProducts(request = {}) {
//   const { filters, page, rowsPerPage } = request;

//   let data = deepCopy(products);
//   let count = data.length;

//   if (typeof filters !== 'undefined') {
//     data = data.filter((product) => {
//       if (typeof filters.name !== 'undefined' && filters.name !== '') {
//         const nameMatched = product.name.toLowerCase().includes(filters.name.toLowerCase());

//         if (!nameMatched) {
//           return false;
//         }
//       }

//       // It is possible to select multiple category options
//       if (typeof filters.category !== 'undefined' && filters.category.length > 0) {
//         const categoryMatched = filters.category.includes(product.category);

//         if (!categoryMatched) {
//           return false;
//         }
//       }

//       // It is possible to select multiple status options
//       if (typeof filters.status !== 'undefined' && filters.status.length > 0) {
//         const statusMatched = filters.status.includes(product.status);

//         if (!statusMatched) {
//           return false;
//         }
//       }

//       // Present only if filter required
//       if (typeof filters.inStock !== 'undefined') {
//         const stockMatched = product.inStock === filters.inStock;

//         if (!stockMatched) {
//           return false;
//         }
//       }

//       return true;
//     });
//     count = data.length;
//   }

//   if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
//     data = applyPagination(data, page, rowsPerPage);
//   }

//   return Promise.resolve({
//     data,
//     count
//   });
// }
// getProducts(request = {}) {
//   const { filters, page, rowsPerPage } = request;

//   let data = deepCopy(products);
//   let count = data.length;

//   if (typeof filters !== 'undefined') {
//     data = data.filter((product) => {
//       if (typeof filters.name !== 'undefined' && filters.name !== '') {
//         const nameMatched = product.name.toLowerCase().includes(filters.name.toLowerCase());

//         if (!nameMatched) {
//           return false;
//         }
//       }

//       // It is possible to select multiple category options
//       if (typeof filters.category !== 'undefined' && filters.category.length > 0) {
//         const categoryMatched = filters.category.includes(product.category);

//         if (!categoryMatched) {
//           return false;
//         }
//       }

//       // It is possible to select multiple status options
//       if (typeof filters.status !== 'undefined' && filters.status.length > 0) {
//         const statusMatched = filters.status.includes(product.status);

//         if (!statusMatched) {
//           return false;
//         }
//       }

//       // Present only if filter required
//       if (typeof filters.inStock !== 'undefined') {
//         const stockMatched = product.inStock === filters.inStock;

//         if (!stockMatched) {
//           return false;
//         }
//       }

//       return true;
//     });
//     count = data.length;
//   }

//   if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
//     data = applyPagination(data, page, rowsPerPage);
//   }

//   return Promise.resolve({
//     data,
//     count
//   });
// }

// async getProducts(request = {}) {
//   const { filters, page, rowsPerPage } = request;

//   let res = await axios({
//     baseURL: this.BASE_URL,
//     url: this.ENDPOINTS.products,
//     params: {
//       offset: page,
//       limit: rowsPerPage,
//     },
//   });
//   let count = res.data.length;

//   // if (typeof filters !== "undefined") {
//   //   data = data.filter((product) => {
//   //     if (typeof filters.name !== "undefined" && filters.name !== "") {
//   //       const nameMatched = product.name
//   //         .toLowerCase()
//   //         .includes(filters.name.toLowerCase());

//   //       if (!nameMatched) {
//   //         return false;
//   //       }
//   //     }

//   //     // It is possible to select multiple category options
//   //     if (
//   //       typeof filters.category !== "undefined" &&
//   //       filters.category.length > 0
//   //     ) {
//   //       const categoryMatched = filters.category.includes(product.category);

//   //       if (!categoryMatched) {
//   //         return false;
//   //       }
//   //     }

//   //     // It is possible to select multiple status options
//   //     if (
//   //       typeof filters.status !== "undefined" &&
//   //       filters.status.length > 0
//   //     ) {
//   //       const statusMatched = filters.status.includes(product.status);

//   //       if (!statusMatched) {
//   //         return false;
//   //       }
//   //     }

//   //     // Present only if filter required
//   //     if (typeof filters.inStock !== "undefined") {
//   //       const stockMatched = product.inStock === filters.inStock;

//   //       if (!stockMatched) {
//   //         return false;
//   //       }
//   //     }

//   //     return true;
//   //   });
//   //   count = data.length;
//   // }

//   // if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
//   //   data = applyPagination(data, page, rowsPerPage);
//   // }

//   // return Promise.resolve({
//   //   data,
//   //   count,
//   // });
//   return {
//     data: res.data,
//     count,
//   };
// }

export const productsService = new ProductsServices();
