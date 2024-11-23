import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

const useTranslateCoupon = () => {
  const [t] = useTranslation();
  const translateCoupon = {
    breadcrumbs: {
      dashboard: t(tokens.breadcrumbs.dashboard),
      offers: t(tokens.breadcrumbs.offers),
      coupons: t(tokens.breadcrumbs.couponList),
      createCoupon: t(tokens.breadcrumbs.offersCreateCoupon),
    },
    header: {
      headingTitle: t(tokens.offers.coupons.heading.title),
      cta: t(tokens.offers.coupons.heading.cta),
    },
    notFound: {
      title: t(tokens.offers.coupons.notFound.title),
      description: t(tokens.offers.coupons.notFound.description),
    },
    card: {
      actions: {
        title: t(tokens.offers.coupons.couponsCard.actions),
        cta: t(tokens.offers.coupons.heading.cta),
      },
      couponsCard: {
        dateTitle: t(tokens.offers.coupons.couponsCard.dateTitle),
        statisticsTitle: t(tokens.offers.coupons.couponsCard.statisticsTitle),
        name: t(tokens.offers.coupons.couponsCard.name),
        description: t(tokens.offers.coupons.couponsCard.description),
        startDate: t(tokens.offers.coupons.couponsCard.startDate),
        endDate: t(tokens.offers.coupons.couponsCard.endDate),
        numberOfTimes: t(tokens.offers.coupons.couponsCard.numberOfTimes),
        numberOfUsed: t(tokens.offers.coupons.couponsCard.numberOfUsed),
        maxAmount: t(tokens.offers.coupons.couponsCard.maxAmount),
        couponType: {
          title: t(tokens.offers.coupons.couponsCard.couponType.title),
          "one-time": t(
            tokens.offers.coupons.couponsCard.couponType["one-time"]
          ),
          "multiple-times": t(
            tokens.offers.coupons.couponsCard.couponType["multiple-times"]
          ),
        },
        actions: {
          edit: t(tokens.offers.coupons.couponsCard.actions.edit),
          delete: t(tokens.offers.coupons.couponsCard.actions.delete),
        },
      },
    },
    createCoupon: {
      headingTitle: t(tokens.offers.createCoupon.headingTitle),
      form: {
        title: t(tokens.offers.createCoupon.form.title),
        inputs: {
          voucherCode: t(tokens.offers.createCoupon.form.inputs.voucherCode),
          generateCodeBtn: t(
            tokens.offers.createCoupon.form.inputs.generateCodeBtn
          ),
          couponName: t(tokens.offers.createCoupon.form.inputs.couponName),
          description: t(tokens.offers.createCoupon.form.inputs.description),
          startDate: t(tokens.offers.createCoupon.form.inputs.startDate),
          endDate: t(tokens.offers.createCoupon.form.inputs.endDate),
          active: t(tokens.offers.createCoupon.form.inputs.active),
          numberOfTimes: t(
            tokens.offers.createCoupon.form.inputs.numberOfTimes
          ),
          numberOfUsed: t(tokens.offers.createCoupon.form.inputs.numberOfUsed),
          couponPercentage: t(
            tokens.offers.createCoupon.form.inputs.couponPercentage
          ),
          couponType: t(tokens.offers.createCoupon.form.inputs.couponType),
          maxAmount: t(tokens.offers.createCoupon.form.inputs.maxAmount),
        },
      },
      actions: {
        create: t(tokens.offers.createCoupon.actions.create),
        update: t(tokens.offers.createCoupon.actions.update),
        cancel: t(tokens.offers.createCoupon.actions.cancel),
      },
    },
  };
  return { translateCoupon };
};

export default useTranslateCoupon;
