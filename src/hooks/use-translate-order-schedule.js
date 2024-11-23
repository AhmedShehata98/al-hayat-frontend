import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

const useTranslateOrderSchedule = () => {
  const [t] = useTranslation();
  const translatedScheduledOrders = {
    breadcrumb: {
      dashboard: t(tokens.breadcrumbs.dashboard),
      ordersScheduled: t(tokens.breadcrumbs.ordersScheduled),
    },
    headingTitle: t(tokens.orderSchedule.headingTitle),
    actions: {
      autoAssign: t(tokens.orderSchedule.actions.autoAssign),
      submit: t(tokens.orderSchedule.actions.submit),
    },
    assignedOrdersHeading: {
      title: t(tokens.orderSchedule.assignedOrdersHeading.title),
      notFoundMsg: t(tokens.orderSchedule.assignedOrdersHeading.notfoundMsg),
    },
    nonAssignedOrdersHeading: {
      title: t(tokens.orderSchedule.nonAssignedOrdersHeading.title),
      notFoundMsg: t(tokens.orderSchedule.nonAssignedOrdersHeading.notfoundMsg),
    },
    card: {
      driverSelect: t(tokens.orderSchedule.card.driverSelect),
      driverName: t(tokens.orderSchedule.card.driverName),
      orderId: t(tokens.orderSchedule.card.orderId),
      customer: t(tokens.orderSchedule.card.customer),
      location: t(tokens.orderSchedule.card.location),
      date: t(tokens.orderSchedule.card.date),
      deliveryType: t(tokens.orderSchedule.card.deliveryType),
      orderStatus: t(tokens.orderSchedule.card.orderStatus),
      customerInfo: {
        title: t(tokens.orderSchedule.card.customerInfo.title),
        id: t(tokens.orderSchedule.card.customerInfo.id),
        name: t(tokens.orderSchedule.card.customerInfo.name),
        email: t(tokens.orderSchedule.card.customerInfo.email),
        phone: t(tokens.orderSchedule.card.customerInfo.phone),
        address: t(tokens.orderSchedule.card.customerInfo.address),
      },
      orderItems: {
        title: t(tokens.orderSchedule.card.orderItems.title),
        name: t(tokens.orderSchedule.card.orderItems.name),
        quantity: t(tokens.orderSchedule.card.orderItems.quantity),
        total: t(tokens.orderSchedule.card.orderItems.total),
      },
      locationInfo: {
        title: t(tokens.orderSchedule.card.locationInfo.title),
        address: t(tokens.orderSchedule.card.locationInfo.address),
        city: t(tokens.orderSchedule.card.locationInfo.city),
        state: t(tokens.orderSchedule.card.locationInfo.state),
        country: t(tokens.orderSchedule.card.locationInfo.country),
        zipCode: t(tokens.orderSchedule.card.locationInfo.zipCode),
      },
    },
  };
  return { translatedScheduledOrders };
};

export default useTranslateOrderSchedule;
