import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

const useTranslateCustomer = () => {
  const [t] = useTranslation();
  return {
    heading: {
      title: t(tokens.customers.header.title),
      ctaBtn: t(tokens.customers.header.ctaBtn),
      exportFile: t(tokens.customers.header.exportFile),
      importFile: t(tokens.customers.header.importFile),
    },
    searchBar: t(tokens.customers.searchBar),
    sortSelect: t(tokens.customers.sortSelect),
    sortBy: {
      firstName: t(tokens.customers.sortBy.firstName),
      lastName: t(tokens.customers.sortBy.lastName),
      phone: t(tokens.customers.sortBy.phone),
      username: t(tokens.customers.sortBy.username),
      newest: t(tokens.customers.sortBy.newest),
      oldest: t(tokens.customers.sortBy.oldest),
    },
    notFoundUsers: {
      title: t(tokens.customers.notFoundUsers.title),
      description: t(tokens.customers.notFoundUsers.description),
    },
    usersTable: {
      name: t(tokens.customers.usersTable.name),
      email: t(tokens.customers.usersTable.email),
      phone: t(tokens.customers.usersTable.phone),
      location: t(tokens.customers.usersTable.location),
      orders: t(tokens.customers.usersTable.orders),
      status: t(tokens.customers.usersTable.status),
      actions: t(tokens.customers.usersTable.actions),
      role: {
        options: {
          admin: t(tokens.customers.customerCreate.form.options.roles.admin),
          customer: t(
            tokens.customers.customerCreate.form.options.roles.customer
          ),
          manager: t(
            tokens.customers.customerCreate.form.options.roles.manager
          ),
          driver: t(tokens.customers.customerCreate.form.options.roles.driver),
        },
      },
    },

    detailsPage: {
      header: {
        goBack: t(tokens.customers.customerDetails.header.goBackBtn),
        ctaBtn: t(tokens.customers.customerDetails.header.ctaBtn),
        editBtn: t(tokens.customers.customerDetails.header.editBtn),
        userId: t(tokens.customers.customerDetails.header.userId),
      },
      tabs: {
        details: t(tokens.customers.customerDetails.tabs.details),
      },
      details: {
        headingTitle: t(tokens.customers.customerDetails.details.headingTitle),
        name: t(tokens.customers.customerDetails.details.name),
        username: t(tokens.customers.customerDetails.details.username),
        email: t(tokens.customers.customerDetails.details.email),
        phone: t(tokens.customers.customerDetails.details.phone),
        location: t(tokens.customers.customerDetails.details.location),
        country: t(tokens.customers.customerDetails.details.country),
        stateOrRegion: t(
          tokens.customers.customerDetails.details.stateOrRegion
        ),
        currentAddress: t(
          tokens.customers.customerDetails.details.currentAddress
        ),
        address1: t(tokens.customers.customerDetails.details.address1),
        address2: t(tokens.customers.customerDetails.details.address2),
        location: t(tokens.customers.customerDetails.details.location),
        resetPassword: t(
          tokens.customers.customerDetails.details.resetPassword
        ),
        dataManagement: {
          cta: t(tokens.customers.customerDetails.dataManagement.ctaBtn),
          description: t(
            tokens.customers.customerDetails.dataManagement.description
          ),
          title: t(tokens.customers.customerDetails.dataManagement.title),
        },
      },
    },
    editPage: {
      header: {
        goBack: t(tokens.customers.customerEdit.header.goBack),
        customerId: t(tokens.customers.customerEdit.header.customerId),
      },
      HeadingTitle: t(tokens.customers.customerEdit.title),
      inputs: {
        firstName: t(tokens.customers.customerEdit.inputs.firstName),
        lastName: t(tokens.customers.customerEdit.inputs.lastName),
        email: t(tokens.customers.customerEdit.inputs.email),
        phone: t(tokens.customers.customerEdit.inputs.phone),
        userName: t(tokens.customers.customerEdit.inputs.userName),
        status: t(tokens.customers.customerEdit.inputs.status),
        country: t(tokens.customers.customerEdit.inputs.country),
        stateOrRegion: t(tokens.customers.customerEdit.inputs.stateOrRegion),
        location: t(tokens.customers.customerEdit.inputs.location),
        address1: t(tokens.customers.customerEdit.inputs.address1),
        address2: t(tokens.customers.customerEdit.inputs.address2),
      },
      actions: {
        create: t(tokens.customers.customerEdit.actions.create),
        update: t(tokens.customers.customerEdit.actions.update),
        cancel: t(tokens.customers.customerEdit.actions.cancel),
      },
    },
    createPage: {
      headingTitle: t(tokens.customers.customerCreate.headingTitle),
      form: {
        title: t(tokens.customers.customerCreate.form.title),
        inputs: {
          firstName: t(tokens.customers.customerCreate.form.inputs.firstName),
          lastName: t(tokens.customers.customerCreate.form.inputs.lastName),
          phone: t(tokens.customers.customerCreate.form.inputs.phone),
          role: t(tokens.customers.customerCreate.form.inputs.role),
        },
        options: {
          roles: {
            admin: t(tokens.customers.customerCreate.form.options.roles.admin),
            customer: t(
              tokens.customers.customerCreate.form.options.roles.customer
            ),
            manager: t(
              tokens.customers.customerCreate.form.options.roles.manager
            ),
            driver: t(
              tokens.customers.customerCreate.form.options.roles.driver
            ),
          },
        },
        actions: {
          create: t(tokens.customers.customerCreate.form.actions.create),
          cancel: t(tokens.customers.customerCreate.form.actions.cancel),
        },
      },
    },
  };
};

export default useTranslateCustomer;
