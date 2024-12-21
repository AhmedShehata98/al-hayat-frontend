import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { offersService } from "../api/offers";
import { useRecoilValue } from "recoil";
import { authAtom } from "../atoms/auth-atom";

const useGetDiscounts = ({
  sortOrder,
  orderDirection,
  search,
  limit,
  page,
}) => {
  const {
    data: discounts,
    isSuccess: isSuccessDiscounts,
    isError: isErrorDiscounts,
    isPending: isPendingDiscounts,
    error: discountsError,
  } = useQuery({
    queryKey: ["discounts", sortOrder, orderDirection, search, limit, page],
    queryFn: () =>
      offersService.getAllDiscounts({
        sortOrder,
        orderDirection,
        search,
        limit,
        page,
      }),
  });

  return {
    discounts: discounts?.contentList?.[0],
    discountsCount: discounts?.contentList?.[0].length || 0,
    isSuccessDiscounts,
    isErrorDiscounts,
    isPendingDiscounts,
    discountsError,
  };
};

const useDeleteDiscount = (discountId) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteDiscount, isPending: isPendingDeleteDiscount } =
    useMutation({
      mutationFn: (discountId) => offersService.deleteDiscount(discountId),
      onSuccess: () => queryClient.invalidateQueries(["discounts"]),
    });

  return {
    deleteDiscount,
    isPendingDeleteDiscount,
  };
};

const useAddDiscount = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: addDiscount, isPending: isPendingAddDiscount } =
    useMutation({
      mutationKey: ["add-discount"],
      mutationFn: (discount) => offersService.createDiscount(discount),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["discounts"] }),
    });
  return { addDiscount, isPendingAddDiscount };
};

const useUpdateDiscount = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateDiscount, isPending: isPendingUpdateDiscount } =
    useMutation({
      mutationFn: ({ discountId, newDiscountData }) =>
        offersService.updateDiscount(discountId, newDiscountData),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["discounts"] }),
    });

  return {
    updateDiscount,
    isPendingUpdateDiscount,
  };
};

const useGetDiscountsById = (discountId) => {
  const { data: discount, isLoading: isGettingDiscount } = useQuery({
    queryKey: ["discounts", discountId],
    queryFn: () => offersService.getDiscountById(discountId),
    enabled: Boolean(discountId),
  });
  return { discount: discount?.contentList?.[0], isGettingDiscount };
};

const useToggleDiscountActive = () => {
  const queryClient = useQueryClient();
  const authState = useRecoilValue(authAtom);

  const {
    mutateAsync: toggleDiscountActive,
    isPending: isPendingToggleDiscountActive,
  } = useMutation({
    mutationFn: (data) =>
      offersService.toggleDiscountActive({
        data,
        token: authState.token,
      }),
    onSuccess: () => queryClient.invalidateQueries(["discounts"]),
  });

  return {
    toggleDiscountActive,
    isPendingToggleDiscountActive,
  };
};
export {
  useGetDiscounts,
  useDeleteDiscount,
  useAddDiscount,
  useUpdateDiscount,
  useGetDiscountsById,
  useToggleDiscountActive,
};
