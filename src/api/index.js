import axios from "axios";
import { getCookie } from "cookies-next";

export const PISTON_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const PISTON_PRIVATE_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: getCookie("token"),
  },
});

export const ENDPOINTS = {
  auth: {
    generateOTP: "/api/Authorization/GenerateOtpToken",
    validateOTP: "/api/Authorization/ValidateOtpToken",
    logout: "/api/Authorization/logout",
  },
  products: {
    read: "/api/Products",
    readById: "/api/Products",
    create: "/api/Products",
    info: "/api/Products/info",
    partById: "/api/Products/",
    update: "/api/Products/",
    delete: "/api/Products/",
    description: {
      read: "/api/Products/productDescription",
      create: "/api/Products/productDescription/",
      update: "/api/Products/productDescription/",
      delete: "/api/Products/productDescription/",
    },
  },
  parts: {
    matchWithCar: "/api/Parts/GetMatchingArticlesWithCar",
  },
  category: {
    read: "/api/Categories",
    create: "/api/Categories",
    update: "/api/Categories",
    delete: "/api/Categories",
  },
  aboutUs: {
    index: "/about",
  },
  cars: {
    read: "/api/Cars",
    me: {
      read: "/api/Cars/me",
      update: "/api/Cars/me",
      delete: "/api/Cars/me",
      create: "/api/Cars/me",
    },
  },
  minio: {
    getCarouselImages: "/api/Minio/getSliderImages",
    uploadCarouselImages: "/api/Minio/uploadSliderImage",
    deleteCarouselImage: "/api/Minio/deleteSliderImage",
  },
  offers: {
    discount: {
      read: "/api/Offers/discounts",
      create: "/api/Offers/discounts",
      update: "/api/Offers/discounts",
      delete: "/api/Offers/discounts",
    },
    coupon: {
      read: "/api/Offers/coupons",
      create: "/api/Offers/coupons",
      update: "/api/Offers/coupons",
      delete: "/api/Offers/coupons",
    },
  },
  users: {
    me: {
      read: "/api/Users/me",
      update: "/api/Users/me",
    },
    roles: {
      read: "/api/Users/Roles",
    },
    employees: {
      read: "/api/Users/employees",
      delete: "/api/Users",
    },
    read: "/api/Users",
    update: "/api/Users",
    create: "/api/Users",
    delete: "/api/Users",
  },
  orders: {
    read: "/api/Orders",
    update: "/api/Orders",
    delete: "/api/Orders",
    cancel: "/api/Orders/{orderId}/cancel",
    me: {
      read: "/api/Orders/me",
      driver: {
        read: "/api/Orders/me/driver",
      },
    },
    checkout: {
      create: "/api/Orders/checkout",
    },
    driver: {
      assignment: {
        create: "/api/Orders/driver/assignment",
      },
    },
  },
  maintenance: {
    index: "/api/RepairingServiceRequest",
    reject: "/api/CustomQuotation/reject",
    services: { index: "/api/RepairingServices" },
    workingHours: { index: "/api/RepairingServices/working-hours" },
  },
  statistics: {
    totalOrders: "/api/Statistics/total-orders",
    todayProgress: "/api/Statistics/today-progress",
    todayCompleted: "/api/Statistics/today-completed",
    inProgress: "/api/Statistics/inprogress",
    completed: "/api/Statistics/completed",
    totalIncome: "/api/Statistics/total-income",
    totalHoldIncome: "/api/Statistics/total-HoldIncome",
    topDrivers: "/api/Statistics/top-drivers",
    topProducts: "/api/Statistics/top-products",
  },
  termsAndConditions: {
    index: "/policies",
  },
};
export class ApiService {
  #_axios = PISTON_INSTANCE;
  #_privateAxios = PISTON_PRIVATE_INSTANCE;
  #_endpoints = ENDPOINTS;
  #_isDevelopmentEnvironment = process.env.NODE_ENV !== "production";

  get axios() {
    return this.#_axios;
  }
  get privateAxios() {
    return this.#_privateAxios;
  }
  get endpoints() {
    return this.#_endpoints;
  }
  get isDevelopmentEnvironment() {
    return this.#_isDevelopmentEnvironment;
  }
}
