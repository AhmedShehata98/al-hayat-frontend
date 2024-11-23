import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

const useTranslateDiscounts = () => {
  const [t] = useTranslation();
  const translateDiscounts = {
    breadcrumbs: {
      dashboard: t(tokens.breadcrumbs.dashboard),
      offers: t(tokens.breadcrumbs.offers),
      discounts: t(tokens.breadcrumbs.discountList),
      createDiscount: t(tokens.breadcrumbs.offersCreateDiscount),
    },
    headingTitle: t(tokens.offers.discounts.heading.title),
    ctaBtn: t(tokens.offers.discounts.heading.cta),
    notFound: t(tokens.offers.discounts.notFound),
    discountTable: {
      columns: {
        name: t(tokens.offers.discounts.discountTable.columns.name),
        status: t(tokens.offers.discounts.discountTable.columns.status),
        active: t(tokens.offers.discounts.discountTable.columns.active),
        inActive: t(tokens.offers.discounts.discountTable.columns.inActive),
        discount: t(tokens.offers.discounts.discountTable.columns.discount),
        description: t(
          tokens.offers.discounts.discountTable.columns.description
        ),
        startDate: t(tokens.offers.discounts.discountTable.columns.startDate),
        endDate: t(tokens.offers.discounts.discountTable.columns.endDate),
        actions: t(tokens.offers.discounts.discountTable.columns.actions),
      },
    },
    discountCreate: {
      headingTitle: t(tokens.offers.createDiscount.headingTitle),
      form: {
        title: t(tokens.offers.createDiscount.form.title),
        inputs: {
          name: t(tokens.offers.createDiscount.form.inputs.discountName),
          description: t(tokens.offers.createDiscount.form.inputs.description),
          discount: t(
            tokens.offers.createDiscount.form.inputs.discountPercentage
          ),
          startDate: t(tokens.offers.createDiscount.form.inputs.startDate),
          endDate: t(tokens.offers.createDiscount.form.inputs.endDate),
          active: t(tokens.offers.createDiscount.form.inputs.active),
        },
      },
      actions: {
        create: t(tokens.offers.createDiscount.actions.create),
        update: t(tokens.offers.createDiscount.actions.update),
        cancel: t(tokens.offers.createDiscount.actions.cancel),
      },
    },
  };
  return { translateDiscounts };
};

export default useTranslateDiscounts;
