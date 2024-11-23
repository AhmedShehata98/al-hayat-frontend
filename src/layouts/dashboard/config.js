import { SvgIcon } from "@mui/material";
import HomeSmileIcon from "../../icons/untitled-ui/duocolor/home-smile";
import ShoppingBag03Icon from "../../icons/untitled-ui/duocolor/shopping-bag-03";
import ShoppingCart01Icon from "../../icons/untitled-ui/duocolor/shopping-cart-01";
import Users03Icon from "../../icons/untitled-ui/duocolor/users-03";
import OffersIcon from "../../icons/untitled-ui/duocolor/offers";
import CustomOrderIcon from "../../icons/untitled-ui/duocolor/CustomOrderIcon";
import Category from "../../icons/untitled-ui/duocolor/category";
import ScheduledOrder from "../../icons/untitled-ui/duocolor/scheduled-order";
import EmployeeIcon from "../../icons/untitled-ui/duocolor/employeeIcon";
import CarouselIcon from "../../icons/untitled-ui/duocolor/CarouselIcon";
import MaintenanceIcon from "../../icons/untitled-ui/duocolor/MaintenanceIcon";
import { tokens } from "../../locales/tokens";
import { paths } from "../../paths";
import { ROLES } from "../../constants/roles.js";
import TermsAndCondition from "../../icons/untitled-ui/duocolor/termsAndConditions.js";
import AboutIcon from "../../icons/untitled-ui/duocolor/AboutIcon.js";

export const getSections = (t) => [
  {
    items: [
      {
        title: t(tokens.nav.overview),
        path: paths.dashboard.index,
        icon: (
          <SvgIcon fontSize="small">
            <HomeSmileIcon />
          </SvgIcon>
        ),
        role: ROLES.ALL,
      },
      {
        title: t(tokens.nav.account),
        path: paths.dashboard.account,
        icon: (
          <SvgIcon fontSize="small">
            <HomeSmileIcon />
          </SvgIcon>
        ),
        role: ROLES.ALL,
      },
    ],
  },
  {
    subheader: t(tokens.nav.concepts),
    items: [
      {
        title: t(tokens.nav.customers),
        path: paths.dashboard.customers.index,
        icon: (
          <SvgIcon fontSize="small">
            <Users03Icon />
          </SvgIcon>
        ),
        role: ROLES.ADMIN,
        items: [
          {
            title: t(tokens.nav.list),
            path: paths.dashboard.customers.index,
          },
          {
            title: t(tokens.nav.create),
            path: paths.dashboard.customers.create,
          },
        ],
      },
      {
        title: t(tokens.nav.employee),
        path: paths.dashboard.employee.index,
        icon: (
          <SvgIcon fontSize="small">
            <EmployeeIcon />
          </SvgIcon>
        ),
        role: ROLES.ADMIN,
        items: [
          {
            title: t(tokens.nav.list),
            path: paths.dashboard.employee.index,
          },
          {
            title: t(tokens.nav.create),
            path: paths.dashboard.employee.create,
          },
        ],
      },
      {
        title: t(tokens.nav.productList),
        path: paths.dashboard.products.index,
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBag03Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.list),
            path: paths.dashboard.products.index,
          },
          {
            title: t(tokens.nav.create),
            path: paths.dashboard.products.create,
          },
        ],
      },
      {
        title: t(tokens.nav.carousel),
        path: paths.dashboard.carousel.index,
        icon: (
          <SvgIcon fontSize="small">
            <CarouselIcon />
          </SvgIcon>
        ),
        // items: [
        //   {
        //     title: t(tokens.nav.carouselList),
        //     path: paths.dashboard.carousel.index,
        //   },
        //   {
        //     title: t(tokens.nav.carouselCreate),
        //     path: paths.dashboard.carousel.create,
        //   },
        // ],
      },
      {
        title: t(tokens.nav.offers),
        path: paths.dashboard.offers.discountList,
        icon: (
          <SvgIcon fontSize="small">
            <OffersIcon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.discountList),
            path: paths.dashboard.offers.discountList,
          },
          {
            title: t(tokens.nav.couponList),
            path: paths.dashboard.offers.couponList,
          },
          {
            title: t(tokens.nav.offersCreateDiscount),
            path: paths.dashboard.offers.createDiscount,
          },
          {
            title: t(tokens.nav.offersCreateCoupon),
            path: paths.dashboard.offers.createCoupon,
          },
        ],
      },
      {
        title: t(tokens.nav.categories),
        path: paths.dashboard.categories.index,
        icon: (
          <SvgIcon fontSize="small">
            <Category />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.categoriesList),
            path: paths.dashboard.categories.index,
          },
          {
            title: t(tokens.nav.categoriesCreate),
            path: paths.dashboard.categories.create,
          },
        ],
      },
      {
        title: t(tokens.nav.policy),
        path: paths.dashboard.policy.termsOfUse,
        icon: (
          <SvgIcon fontSize="small">
            <TermsAndCondition />
          </SvgIcon>
        ),
        // items: [
        //   {
        //     title: t(tokens.nav.termsOfUse),
        //     path: paths.dashboard.policy.termsOfUse,
        //   },
        //   {
        //     title: t(tokens.nav.privacyPolicy),
        //     path: paths.dashboard.policy.privacyPolicy,
        //   },
        // ],
      },
      {
        title: t(tokens.nav.aboutUs),
        path: paths.dashboard.aboutUs.index,
        icon: (
          <SvgIcon fontSize="small">
            <AboutIcon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.orderList),
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingCart01Icon />
          </SvgIcon>
        ),
        path: paths.dashboard.orders.index,
      },
      {
        title: t(tokens.nav.maintenance),
        icon: (
          <SvgIcon fontSize="small">
            <MaintenanceIcon />
          </SvgIcon>
        ),
        path: paths.dashboard.maintenance.index,
        items: [
          {
            title: t(tokens.nav.maintenanceRequests),
            path: paths.dashboard.maintenance.index,
          },
          {
            title: t(tokens.nav.maintenanceWorkingHours),
            path: paths.dashboard.maintenance.workingHours,
          },
        ],
      },
      {
        title: t(tokens.nav.orderSchedule),
        icon: (
          <SvgIcon fontSize="small">
            <ScheduledOrder />
          </SvgIcon>
        ),
        path: paths.dashboard.orderSchedule.index,
        // items: [
        //   {
        //     title: t(tokens.nav.list),
        //     path: paths.dashboard.orderSchedule.index,
        //   },
        // ],
      },
    ],
  },
];
