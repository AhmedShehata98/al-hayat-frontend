import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { offersService } from "../api/offers";

const useAddCoupon = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: mutateAsyncAddCoupon,
    isPending: isPendingAddCoupon,
    isSuccess: isSuccessAddCoupon,
  } = useMutation({
    mutationKey: ["add-coupon"],
    mutationFn: (data) => offersService.createCoupon(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });

  return {
    mutateAsyncAddCoupon,
    isPendingAddCoupon,
    isSuccessAddCoupon,
  };
};
const useUpdateCoupon = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: updateCoupon,
    isSuccess: isSuccessUpdateCoupon,
    isError: isErrorUpdateCoupon,
    isPending: isPendingUpdateCoupon,
  } = useMutation({
    mutationKey: ["updateCoupon"],
    mutationFn: ({ couponId, newCouponData }) =>
      offersService.updateCoupon(couponId, newCouponData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
  return {
    updateCoupon,
    isSuccessUpdateCoupon,
    isErrorUpdateCoupon,
    isPendingUpdateCoupon,
  };
};
const useGetCoupons = (search, page, limit) => {
  const {
    data: coupons,
    isSuccess: isSuccessCoupons,
    isError: isErrorCoupons,
    isPending: isPendingCoupons,
    error: couponsError,
  } = useQuery({
    queryKey: ["coupons", search, page, limit],
    queryFn: () => offersService.getAllCoupons(search, limit, page),
  });

  return {
    coupons: coupons?.contentList?.[0],
    couponsCount: coupons?.contentList?.[0].length || 0,
    isSuccessCoupons,
    isErrorCoupons,
    isPendingCoupons,
    couponsError,
  };
};
const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteCoupon,
    isSuccess: isSuccessDeleteCoupon,
    isError: isErrorDeleteCoupon,
    isPending: isPendingDeleteCoupon,
  } = useMutation({
    mutationKey: ["deleteCoupon"],
    mutationFn: (couponId) => offersService.deleteCoupon(couponId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });

  return {
    deleteCoupon,
    isSuccessDeleteCoupon,
    isErrorDeleteCoupon,
    isPendingDeleteCoupon,
  };
};
const useGetCouponById = (couponId) => {
  const { data: coupon, isLoading: isLoadingCoupon } = useQuery({
    queryKey: ["coupon", couponId],
    queryFn: () => offersService.getCouponById(couponId),
    enabled: Boolean(couponId),
  });
  return {
    coupon: coupon?.contentList?.[0],
    isLoadingCoupon,
  };
};

export {
  useAddCoupon,
  useUpdateCoupon,
  useGetCouponById,
  useGetCoupons,
  useDeleteCoupon,
};
