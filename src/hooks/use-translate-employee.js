import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

export default function useEmployeeTranslations() {
  const [t] = useTranslation();

  return {
    heading: {
      title: t(tokens.employees.header.title),
      ctaBtn: t(tokens.employees.header.ctaBtn),
      exportFile: t(tokens.employees.header.exportFile),
      importFile: t(tokens.employees.header.importFile),
    },
    searchBar: t(tokens.employees.searchBar),
    sortSelect: t(tokens.employees.sortSelect),
    sortBy: {
      firstName: t(tokens.employees.sortBy.firstName),
      lastName: t(tokens.employees.sortBy.lastName),
      phone: t(tokens.employees.sortBy.phone),
      username: t(tokens.employees.sortBy.username),
      newest: t(tokens.employees.sortBy.newest),
      oldest: t(tokens.employees.sortBy.oldest),
    },
    notFoundUsers: {
      title: t(tokens.employees.notFoundUsers.title),
      description: t(tokens.employees.notFoundUsers.description),
    },
    usersTable: {
      name: t(tokens.employees.employeeTable.name),
      email: t(tokens.employees.employeeTable.email),
      phone: t(tokens.employees.employeeTable.phone),
      location: t(tokens.employees.employeeTable.location),
      orders: t(tokens.employees.employeeTable.orders),
      status: t(tokens.employees.employeeTable.status),
      actions: t(tokens.employees.employeeTable.actions),
    },

    detailsPage: {
      header: {
        goBack: t(tokens.employees.employeeDetails.header.goBackBtn),
        ctaBtn: t(tokens.employees.employeeDetails.header.ctaBtn),
        editBtn: t(tokens.employees.employeeDetails.header.editBtn),
        userId: t(tokens.employees.employeeDetails.header.userId),
      },
      tabs: {
        details: t(tokens.employees.employeeDetails.tabs.details),
      },
      details: {
        headingTitle: t(tokens.employees.employeeDetails.details.headingTitle),
        name: t(tokens.employees.employeeDetails.details.name),
        username: t(tokens.employees.employeeDetails.details.username),
        email: t(tokens.employees.employeeDetails.details.email),
        phone: t(tokens.employees.employeeDetails.details.phone),
        location: t(tokens.employees.employeeDetails.details.location),
        country: t(tokens.employees.employeeDetails.details.country),
        stateOrRegion: t(
          tokens.employees.employeeDetails.details.stateOrRegion
        ),
        currentAddress: t(
          tokens.employees.employeeDetails.details.currentAddress
        ),
        address1: t(tokens.employees.employeeDetails.details.address1),
        address2: t(tokens.employees.employeeDetails.details.address2),
        location: t(tokens.employees.employeeDetails.details.location),
        resetPassword: t(
          tokens.employees.employeeDetails.details.resetPassword
        ),
        dataManagement: {
          cta: t(tokens.employees.employeeDetails.dataManagement.ctaBtn),
          description: t(
            tokens.employees.employeeDetails.dataManagement.description
          ),
          title: t(tokens.employees.employeeDetails.dataManagement.title),
        },
      },
    },
    editPage: {
      header: {
        goBack: t(tokens.employees.employeeEdit.header.goBack),
        customerId: t(tokens.employees.employeeEdit.header.customerId),
      },
      HeadingTitle: t(tokens.employees.employeeEdit.title),
      inputs: {
        firstName: t(tokens.employees.employeeEdit.inputs.firstName),
        lastName: t(tokens.employees.employeeEdit.inputs.lastName),
        email: t(tokens.employees.employeeEdit.inputs.email),
        phone: t(tokens.employees.employeeEdit.inputs.phone),
        userName: t(tokens.employees.employeeEdit.inputs.userName),
        status: t(tokens.employees.employeeEdit.inputs.status),
        country: t(tokens.employees.employeeEdit.inputs.country),
        stateOrRegion: t(tokens.employees.employeeEdit.inputs.stateOrRegion),
        location: t(tokens.employees.employeeEdit.inputs.location),
        address1: t(tokens.employees.employeeEdit.inputs.address1),
        address2: t(tokens.employees.employeeEdit.inputs.address2),
      },
      actions: {
        create: t(tokens.employees.employeeEdit.actions.create),
        update: t(tokens.employees.employeeEdit.actions.update),
        cancel: t(tokens.employees.employeeEdit.actions.cancel),
      },
    },
    createPage: {
      headingTitle: t(tokens.employees.employeeCreate.headingTitle),
      form: {
        title: t(tokens.employees.employeeCreate.form.title),
        inputs: {
          firstName: t(tokens.employees.employeeCreate.form.inputs.firstName),
          lastName: t(tokens.employees.employeeCreate.form.inputs.lastName),
          phone: t(tokens.employees.employeeCreate.form.inputs.phone),
          role: t(tokens.employees.employeeCreate.form.inputs.role),
        },
        options: {
          roles: {
            admin: t(tokens.employees.employeeCreate.form.options.roles.admin),
            customer: t(
              tokens.employees.employeeCreate.form.options.roles.customer
            ),
            manager: t(
              tokens.employees.employeeCreate.form.options.roles.manager
            ),
            driver: t(
              tokens.employees.employeeCreate.form.options.roles.driver
            ),
          },
        },
        actions: {
          create: t(tokens.employees.employeeCreate.form.actions.create),
          cancel: t(tokens.employees.employeeCreate.form.actions.cancel),
        },
      },
    },
  };
}
