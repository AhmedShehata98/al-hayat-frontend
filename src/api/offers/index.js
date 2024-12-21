import { ApiService } from "..";

class OffersService extends ApiService {
  async getAllDiscounts({
    sortOrder,
    orderDirection,
    search,
    limit = 10,
    page = 1,
  }) {
    try {
      const params = {
        pageSize: limit,
        pageIndex: page,
      };

      if (search) {
        params.SearchString = search;
      }
      if (sortOrder) {
        params.SortOrder = sortOrder;
      }
      if (orderDirection) {
        params.SortDirection = orderDirection;
      }

      const res = await this.privateAxios({
        method: "GET",
        url: this.endpoints.offers.discount.read,
        params,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async getDiscountById(discountId = 0) {
    try {
      const res = await this.privateAxios.get(
        `${this.endpoints.offers.discount.read}/${discountId}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async createDiscount(request) {
    try {
      const {
        name,
        discription,
        discountPercentage,
        active,
        fromDate,
        toDate,
      } = request;

      const res = await this.privateAxios({
        method: "POST",
        data: {
          name,
          discription,
          discountPercentage,
          active,
          fromDate,
          toDate,
        },
        url: this.endpoints.offers.discount.create,
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async deleteDiscount(discountId) {
    try {
      const res = await this.privateAxios.delete(
        `${this.endpoints.offers.discount.delete}/${discountId}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async updateDiscount(discountId, newDiscount) {
    try {
      const res = await this.privateAxios({
        method: "PATCH",
        url: `${this.endpoints.offers.discount.update}/${discountId}`,
        data: { ...newDiscount },
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  //
  //Coupons
  async getAllCoupons(search, limit = 10, page = 1) {
    try {
      const res = await this.privateAxios({
        method: "GET",
        url: this.endpoints.offers.coupon.read,
        params: {
          pageSize: limit,
          pageIndex: page,
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async getCouponById(couponId = 0) {
    try {
      const res = await this.privateAxios.get(
        `${this.endpoints.offers.coupon.read}/${couponId}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async createCoupon(request) {
    try {
      const res = await this.privateAxios({
        method: "POST",
        data: request,
        url: this.endpoints.offers.coupon.create,
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async deleteCoupon(couponId) {
    try {
      const res = await this.privateAxios.delete(
        `${this.endpoints.offers.coupon.delete}/${couponId}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async updateCoupon(couponId, newCoupon) {
    try {
      const res = await this.privateAxios({
        method: "PATCH",
        url: `${this.endpoints.offers.coupon.update}/${couponId}`,
        data: { ...newCoupon },
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async toggleDiscountActive({ data, token }) {
    try {
      const res = await this.privateAxios({
        method: "PATCH",
        url: this.endpoints.offers.discount.update.concat("/" + data.id),
        data,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async toggleCouponActive({ data, token }) {
    try {
      const res = await this.privateAxios({
        method: "PATCH",
        url: this.endpoints.offers.coupon.update.concat("/" + data.id),
        data,
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

export const offersService = new OffersService();
