import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

export const useValidationMessages = () => {
  const { t } = useTranslation();

  return {
    products: {
      name: {
        required: t(tokens.validationMessages.productCreate.name.required),
        minLength: t(tokens.validationMessages.productCreate.name.minLength),
        maxLength: t(tokens.validationMessages.productCreate.name.maxLength),
      },
      price: {
        required: t(tokens.validationMessages.productCreate.price.required),
        min: t(tokens.validationMessages.productCreate.price.min),
        max: t(tokens.validationMessages.productCreate.price.max),
      },
      quantity: {
        required: t(tokens.validationMessages.productCreate.quantity.required),
        min: t(tokens.validationMessages.productCreate.quantity.min),
        max: t(tokens.validationMessages.productCreate.quantity.max),
      },
      category: {
        required: t(tokens.validationMessages.productCreate.category.required),
      },
      description: {
        required: t(
          tokens.validationMessages.productCreate.description.required
        ),
        minLength: t(
          tokens.validationMessages.productCreate.description.minLength
        ),
        maxLength: t(
          tokens.validationMessages.productCreate.description.maxLength
        ),
      },
      image: {
        required: t(tokens.validationMessages.productCreate.image.required),
      },
    },
    customerCreate: {
      firstName: {
        required: t(
          tokens.validationMessages.customerCreate.firstName.required
        ),
      },
      lastName: {
        required: t(tokens.validationMessages.customerCreate.lastName.required),
      },
      phoneNumber: {
        required: t(
          tokens.validationMessages.customerCreate.phoneNumber.required
        ),
        minLength: t(
          tokens.validationMessages.customerCreate.phoneNumber.minLength
        ),
        maxLength: t(
          tokens.validationMessages.customerCreate.phoneNumber.maxLength
        ),
      },
      role: {
        required: t(tokens.validationMessages.customerCreate.role.required),
      },
    },
    employeeCreate: {
      firstName: {
        required: t(
          tokens.validationMessages.employeeCreate.firstName.required
        ),
      },
      lastName: {
        required: t(tokens.validationMessages.employeeCreate.lastName.required),
      },
      phoneNumber: {
        required: t(
          tokens.validationMessages.employeeCreate.phoneNumber.required
        ),
        minLength: t(
          tokens.validationMessages.employeeCreate.phoneNumber.minLength
        ),
        maxLength: t(
          tokens.validationMessages.employeeCreate.phoneNumber.maxLength
        ),
      },
      role: {
        required: t(tokens.validationMessages.employeeCreate.role.required),
      },
    },
    discount: {
      discountName: {
        required: t(tokens.validationMessages.discount.discountName.required),
      },
      description: {
        required: t(tokens.validationMessages.discount.description.required),
      },
      startDate: {
        required: t(tokens.validationMessages.discount.startDate.required),
      },
      endDate: {
        required: t(tokens.validationMessages.discount.endDate.required),
      },
      discountPercentage: {
        required: t(
          tokens.validationMessages.discount.discountPercentage.required
        ),
        between: t(
          tokens.validationMessages.discount.discountPercentage.between
        ),
      },
    },
    coupon: {
      couponName: {
        required: t(tokens.validationMessages.coupon.couponName.required),
      },
      description: {
        required: t(tokens.validationMessages.coupon.description.required),
      },
      startDate: {
        required: t(tokens.validationMessages.coupon.startDate.required),
      },
      endDate: {
        required: t(tokens.validationMessages.coupon.endDate.required),
      },
      couponPercentage: {
        required: t(tokens.validationMessages.coupon.couponPercentage.required),
        between: t(tokens.validationMessages.coupon.couponPercentage.between),
      },
      couponCode: {
        required: t(tokens.validationMessages.coupon.couponCode.required),
      },
      numberOfTimes: {
        required: t(tokens.validationMessages.coupon.numberOfTimes.required),
      },
      numberOfUsed: {
        required: t(tokens.validationMessages.coupon.numberOfUsed.required),
      },
      maxAmount: {
        required: t(tokens.validationMessages.coupon.maxAmount.required),
      },
      couponTypes: {
        required: t(tokens.validationMessages.coupon.couponTypes.required),
      },
    },
    category: {
      image: {
        required: t(tokens.validationMessages.category.image.required),
      },
      name: {
        required: t(tokens.validationMessages.category.name.required),
      },
      type: {
        required: t(tokens.validationMessages.category.type.required),
      },
      questions: {
        required: t(tokens.validationMessages.category.questions.required),
      },
    },
    login: {
      phoneNumber: {
        required: t(tokens.validationMessages.login.phoneNumber.required),
        minLength: t(tokens.validationMessages.login.phoneNumber.minLength),
        maxLength: t(tokens.validationMessages.login.phoneNumber.maxLength),
      },
      otp: {
        required: t(tokens.validationMessages.login.otp.required),
      },
    },
  };
};
