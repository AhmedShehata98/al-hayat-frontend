import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

const useTranslateProducts = () => {
  const [t] = useTranslation();
  const translateProducts = {
    breadcrumb: {
      dashboard: t(tokens.breadcrumbs.dashboard),
      products: t(tokens.nav.productList),
      productsList: t(tokens.breadcrumbs.productsList),
      createProduct: t(tokens.breadcrumbs.productsCreate),
    },
    headingTitle: t(tokens.products.heading.title),
    ctaBtn: t(tokens.products.heading.ctaBtn),
    searchBar: t(tokens.products.searchBar),
    sort: t(tokens.products.sortSelect),
    sortBy: {
      all: t(tokens.products.sortBy.all),
      active: t(tokens.products.sortBy.active),
      deactivate: t(tokens.products.sortBy.deactivate),
      date: t(tokens.products.sortBy.date),
      price: t(tokens.products.sortBy.price),
      newest: t(tokens.products.sortBy.newest),
      oldest: t(tokens.products.sortBy.oldest),
    },
    productsTable: {
      mainTable: {
        title: t(tokens.products.productsTable.mainTable.title),
        columns: {
          name: t(tokens.products.productsTable.mainTable.columns.name),
          categoryName: t(
            tokens.products.productsTable.mainTable.columns.categoryName
          ),
          description: t(
            tokens.products.productsTable.mainTable.columns.description
          ),
          productImage: t(
            tokens.products.productsTable.mainTable.columns.productImage
          ),
          isPart: t(tokens.products.productsTable.mainTable.columns.isPart),
          partName: t(tokens.products.productsTable.mainTable.columns.partName),
          price: t(tokens.products.productsTable.mainTable.columns.price),
          quantity: t(tokens.products.productsTable.mainTable.columns.quantity),
          actions: {
            title: t(
              tokens.products.productsTable.mainTable.columns.actions.title
            ),
            delete: t(
              tokens.products.productsTable.mainTable.columns.actions.delete
            ),
            update: t(
              tokens.products.productsTable.mainTable.columns.actions.update
            ),
          },
          discount: {
            title: t(
              tokens.products.productsTable.mainTable.columns.discount.title
            ),
            noDiscount: t(
              tokens.products.productsTable.mainTable.columns.discount
                .noDiscount
            ),
          },
        },
      },
      nestedTables: {
        discount: {
          title: t(tokens.products.productsTable.nestedTables.discount.title),
          columns: {
            id: t(
              tokens.products.productsTable.nestedTables.discount.columns.id
            ),
            name: t(
              tokens.products.productsTable.nestedTables.discount.columns.name
            ),
            discountStatus: t(
              tokens.products.productsTable.nestedTables.discount.columns
                .discountStatus
            ),
            discountPercentage: t(
              tokens.products.productsTable.nestedTables.discount.columns
                .discountPercentage
            ),
            description: t(
              tokens.products.productsTable.nestedTables.discount.columns
                .description
            ),
            startDate: t(
              tokens.products.productsTable.nestedTables.discount.columns
                .startDate
            ),
            endDate: t(
              tokens.products.productsTable.nestedTables.discount.columns
                .endDate
            ),
          },
        },
        category: {
          title: t(tokens.products.productsTable.nestedTables.category.title),
          columns: {
            id: t(
              tokens.products.productsTable.nestedTables.category.columns.id
            ),
            categoryName: t(
              tokens.products.productsTable.nestedTables.category.columns
                .categoryName
            ),
            categoryType: t(
              tokens.products.productsTable.nestedTables.category.columns
                .categoryType
            ),
            questions: t(
              tokens.products.productsTable.nestedTables.category.columns
                .questions
            ),
          },
        },
        parts: {
          title: t(tokens.products.productsTable.nestedTables.parts.title),
          columns: {
            id: t(tokens.products.productsTable.nestedTables.parts.columns.id),
            partName: t(
              tokens.products.productsTable.nestedTables.parts.columns.partName
            ),
            partImage: t(
              tokens.products.productsTable.nestedTables.parts.columns.partImage
            ),
          },
        },
      },
    },

    createPage: {
      headingTitle: t(tokens.products.productCreate.headingTitle),
      headings: {
        parts: t(tokens.products.productCreate.headings.parts),
        category: t(tokens.products.productCreate.headings.category),
        basics: t(tokens.products.productCreate.headings.basics),
        discount: t(tokens.products.productCreate.headings.discount),
        choosePartImage: t(
          tokens.products.productCreate.headings.choosePartImage
        ),
      },
      forms: {
        partsForm: {
          title: t(tokens.products.productCreate.forms.partsForm.title),
          inputs: {
            partNumber: t(
              tokens.products.productCreate.forms.partsForm.inputs.partNumber
            ),
            productName: t(
              tokens.products.productCreate.forms.partsForm.inputs.productName
            ),
            manufacturing: t(
              tokens.products.productCreate.forms.partsForm.inputs.manufacturing
            ),
            modelYear: t(
              tokens.products.productCreate.forms.partsForm.inputs.modelYear
            ),
            isPartSwitch: t(
              tokens.products.productCreate.forms.partsForm.inputs.isPartSwitch
            ),
          },
          searchBtn: t(tokens.products.productCreate.forms.partsForm.searchBtn),
        },
        categoryForm: {
          title: t(tokens.products.productCreate.forms.categoryForm.title),
          inputs: {
            categorySelect: t(
              tokens.products.productCreate.forms.categoryForm.inputs
                .categorySelect
            ),
            answersList: t(
              tokens.products.productCreate.forms.categoryForm.inputs
                .answersList
            ),
            brief: t(
              tokens.products.productCreate.forms.categoryForm.inputs.brief
            ),
            briefPlaceholder: t(
              tokens.products.productCreate.forms.categoryForm.inputs
                .briefPlaceholder
            ),
          },
        },
        basicsForm: {
          title: t(tokens.products.productCreate.forms.basicsForm.title),
          inputs: {
            productName: t(
              tokens.products.productCreate.forms.basicsForm.inputs.productName
            ),
            price: t(
              tokens.products.productCreate.forms.basicsForm.inputs.price
            ),
            quantity: t(
              tokens.products.productCreate.forms.basicsForm.inputs.quantity
            ),
          },
        },
        discountForm: {
          title: t(tokens.products.productCreate.forms.discountForm.title),
          inputs: {
            discountSelect: t(
              tokens.products.productCreate.forms.discountForm.inputs
                .discountSelect
            ),
          },
        },
      },
      actions: {
        create: t(tokens.products.productCreate.actions.create),
        update: t(tokens.products.productCreate.actions.update),
        cancel: t(tokens.products.productCreate.actions.cancel),
      },
    },
  };
  return { translateProducts };
};

export default useTranslateProducts;
