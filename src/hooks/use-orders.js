import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersService } from "../api/orders";
import { useRecoilValue } from "recoil";
import { authAtom } from "../atoms/auth-atom";
import { QUERY_KEY } from "../constants/query-keys";
export const useGetAllOrders = ({
  search,
  sortOrder,
  sortDirection,
  status,
  page,
  limit,
  searchByID,
}) => {
  const authState = useRecoilValue(authAtom);
  const {
    data: orders,
    isSuccess: isSuccessOrders,
    isPending: isPendingOrders,
    isError: isErrorOrders,
    error: errorMsg,
  } = useQuery({
    queryKey: [
      QUERY_KEY.ORDERS,
      search,
      searchByID,
      sortOrder,
      sortDirection,
      status,
      page,
      limit,
    ],
    queryFn: () =>
      ordersService.getAllOrders(
        {
          search,
          sortOrder,
          sortDirection,
          status,
          page,
          limit,
          searchByID,
        },
        authState.token
      ),
  });

  return {
    orders: orders?.contentList?.[0],
    isSuccessOrders,
    isPendingOrders,
    isErrorOrders,
    errorMsg,
  };
};

export const useGetOrderById = (orderId) => {
  const authState = useRecoilValue(authAtom);

  const {
    data: order,
    isSuccess: isSuccessGetOrder,
    isError: isErrorGetOrder,
    isPending: isPendingGetOrder,
  } = useQuery({
    queryKey: [QUERY_KEY.ORDERS, orderId],
    queryFn: () => ordersService.getOrderById(orderId, authState.token),
    enable: Boolean(orderId),
  });
  return {
    order: order?.contentList?.[0],
    isSuccessGetOrder,
    isErrorGetOrder,
    isPendingGetOrder,
  };
};

export const useAssignDrivers = () => {
  const queryClient = useQueryClient();
  const authState = useRecoilValue(authAtom);

  const {
    mutateAsync: assignOrderDriversAsync,
    isPending: isPendingAssign,
    isError: isErrorAssign,
    error: errorMsg,
  } = useMutation({
    mutationFn: (drivers) =>
      ordersService.assignOrderDrivers(drivers, authState.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DRIVERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDERS] });
    },
  });

  return {
    assignOrderDriversAsync,
    isPendingAssign,
    isErrorAssign,
    errorMsg,
  };
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  const authState = useRecoilValue(authAtom);

  const {
    mutateAsync: cancelOrderAsync,
    isPending: isPendingCancel,
    isError: isErrorCancel,
    error: errorMsg,
  } = useMutation({
    mutationFn: (orderId) =>
      ordersService.cancelOrder(orderId, authState.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDERS] });
    },
  });

  return {
    cancelOrderAsync,
    isPendingCancel,
    isErrorCancel,
    errorMsg,
  };
};
