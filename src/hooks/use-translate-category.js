import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

const useTranslateCategory = () => {
  const [t] = useTranslation();
  const translatedCategory = {
    breadcrumb: {
      dashboard: t(tokens.breadcrumbs.dashboard),
      category: t(tokens.breadcrumbs.categoryList),
      createCategory: t(tokens.breadcrumbs.categoryCreate),
    },
    headingTitle: t(tokens.categories.headingTitle),
    ctaBtn: t(tokens.categories.ctaBtn),
    categoryCard: {
      categoryName: t(tokens.categories.categoryCard.categoryName),
      categoryType: t(tokens.categories.categoryCard.categoryType),
      questions: t(tokens.categories.categoryCard.questions),
      actions: {
        edit: t(tokens.categories.categoryCard.actions.edit),
        delete: t(tokens.categories.categoryCard.actions.delete),
      },
    },
    createCategory: {
      headingTitle: t(tokens.categories.createCategory.headingTitle),
      form: {
        basicDetails: {
          title: t(tokens.categories.createCategory.form.basicDetails.title),
          categoryName: t(
            tokens.categories.createCategory.form.basicDetails.categoryName
          ),
          categoryType: t(
            tokens.categories.createCategory.form.basicDetails.categoryType
          ),
        },
        questions: {
          title: t(tokens.categories.createCategory.form.questions.title),
          list: t(tokens.categories.createCategory.form.questions.list),
          questions: t(
            tokens.categories.createCategory.form.questions.questions
          ),
          addBtn: t(tokens.categories.createCategory.form.questions.addBtn),
        },
        actions: {
          create: t(tokens.categories.createCategory.form.actions.create),
          update: t(tokens.categories.createCategory.form.actions.update),
          cancel: t(tokens.categories.createCategory.form.actions.cancel),
        },
      },
    },
  };

  return { translatedCategory };
};

export default useTranslateCategory;
