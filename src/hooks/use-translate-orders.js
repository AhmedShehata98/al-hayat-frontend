import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

const useTranslateOrders = () => {
  const { t } = useTranslation();
  const translatedOrders = {
    headingTitle: t(tokens.orders.list.headingTitle),
    filters: {
      pending: t(tokens.orders.list.filters.pending),
      cancelled: t(tokens.orders.list.filters.cancelled),
      delivered: t(tokens.orders.list.filters.delivered),
      ontheway: t(tokens.orders.list.filters.onTheWay),
      scheduled: t(tokens.orders.list.filters.scheduled),
    },
    searchBar: t(tokens.orders.list.searchBar),
    sortBy: t(tokens.orders.list.sortBy),
    sortByOptions: {
      date: t(tokens.orders.list.sortByOptions.date),
      newest: t(tokens.orders.list.sortByOptions.newest),
      oldest: t(tokens.orders.list.sortByOptions.oldest),
    },
    ordersTable: {
      totalOf: t(tokens.orders.list.ordersTable.totalOf),
      goToBtn: t(tokens.orders.list.ordersTable.goToBtn),
    },
    drawer: {
      headingTitle: t(tokens.orders.list.ordersDrawer.headingTitle),
      orderId: t(tokens.orders.list.ordersDrawer.orderId),
      orderNo: t(tokens.orders.list.ordersDrawer.orderNo),
      orderDate: t(tokens.orders.list.ordersDrawer.orderDate),
      customerName: t(tokens.orders.list.ordersDrawer.customerName),
      promotionCode: t(tokens.orders.list.ordersDrawer.promotionCode),
      noPromotion: t(tokens.orders.details.noPromotion),
      totalAmount: t(tokens.orders.list.ordersDrawer.totalAmount),
      status: t(tokens.orders.list.ordersDrawer.status),
      actions: {
        cancel: t(tokens.orders.list.ordersDrawer.actions.cancel),
      },
      lineItems: {
        title: t(tokens.orders.list.ordersDrawer.lineItems.title),
        description: t(tokens.orders.list.ordersDrawer.lineItems.description),
        amount: t(tokens.orders.list.ordersDrawer.lineItems.amount),
      },
    },
    detailsPage: {
      backBtn: t(tokens.orders.details.backBtn),
      placedOn: t(tokens.orders.details.heading.placedOn),
      headingTitle: t(tokens.orders.details.headingTitle),
      headerActions: {
        edit: t(tokens.orders.details.heading.actions.edit),
        action: t(tokens.orders.details.heading.actions.action),
      },
      orderId: t(tokens.orders.details.orderId),
      invoice: t(tokens.orders.details.invoice),
      orderDate: t(tokens.orders.details.orderDate),
      customerName: t(tokens.orders.details.customerName),
      promotionCode: t(tokens.orders.details.promotionCode),
      noPromotion: t(tokens.orders.details.noPromotion),
      totalAmount: t(tokens.orders.details.totalAmount),
      orderStatus: t(tokens.orders.details.orderStatus),
      paymentStatus: t(tokens.orders.details.paymentStatus),
      orderItems: {
        title: t(tokens.orders.details.orderItems.title),
        description: t(tokens.orders.details.orderItems.description),
        billingCycle: t(tokens.orders.details.orderItems.billingCycle),
        amount: t(tokens.orders.details.orderItems.amount),
      },
      actions: {
        cancel: t(tokens.orders.details.actions.cancel),
      },
    },
  };
  return { translatedOrders };
};

export default useTranslateOrders;
