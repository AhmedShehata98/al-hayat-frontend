import { useQuery } from "@tanstack/react-query";
import { statisticsService } from "../api/statistics/index";

export const useGetTotalOrders = () => {
  const {
    data: totalOrders,
    isSuccess: isSuccessTotalOrders,
    isPending: isPendingTotalOrders,
    isError: isErrorTotalOrders,
    error: totalOrdersError,
  } = useQuery({
    queryFn: () => statisticsService.getTotalOrders(),
    queryKey: ["total-orders"],
  });

  return {
    totalOrders: totalOrders?.contentList?.[0],
    isSuccessTotalOrders,
    isPendingTotalOrders,
    isErrorTotalOrders,
    totalOrdersError,
  };
};

export const useGetCompleted = () => {
  const {
    data: completed,
    isSuccess: isSuccessCompleted,
    isPending: isPendingCompleted,
    isError: isErrorCompleted,
    error: completedError,
  } = useQuery({
    queryKey: ["completed"],
    queryFn: () => statisticsService.getCompleted(),
  });

  return {
    completed: completed?.contentList?.[0],
    isSuccessCompleted,
    isPendingCompleted,
    isErrorCompleted,
    completedError,
  };
};

export const useGetInProgress = () => {
  const {
    data: inProgress,
    isPending: isPendingInProgress,
    isError: isErrorInProgress,
    isSuccess: isSuccessInProgress,
    error: inProgressError,
  } = useQuery({
    queryKey: ["in-progress"],
    queryFn: () => statisticsService.getInProgress(),
  });

  return {
    inProgress: inProgress?.contentList?.[0],
    isPendingInProgress,
    isErrorInProgress,
    isSuccessInProgress,
    inProgressError,
  };
};

export const useGetTodayCompleted = () => {
  const {
    data: todayCompleted,
    isSuccess: isSuccessTodayCompleted,
    isError: isErrorTodayCompleted,
    isPendingInProgress: isPendingInProgressTodayCompleted,
    error: todayCompletedError,
  } = useQuery({
    queryKey: ["today-completed"],
    queryFn: () => statisticsService.getTodayCompleted(),
  });

  return {
    todayCompleted: todayCompleted?.contentList?.[0],
    isSuccessTodayCompleted,
    isErrorTodayCompleted,
    isPendingInProgressTodayCompleted,
    todayCompletedError,
  };
};

export const useGetTodayProgress = () => {
  const {
    data: todayProgress,
    isSuccess: isSuccessTodayProgress,
    isPending: isPendingTodayProgress,
    isError: isErrorTodayProgress,
    error: todayProgressError,
  } = useQuery({
    queryKey: ["today-progress"],
    queryFn: () => statisticsService.getTodayProgress(),
  });

  return {
    todayProgress: todayProgress?.contentList?.[0],
    isSuccessTodayProgress,
    isPendingTodayProgress,
    isErrorTodayProgress,
    todayProgressError,
  };
};

export const useGetTopDrivers = ({
  startDate,
  endDate,
  numberOfProductsToReturn,
}) => {
  const {
    data: topDrivers,
    isSuccess: isSuccessTopDrivers,
    isPending: isPendingTopDrivers,
    isError: isErrorTopDrivers,
    error: topDriversError,
  } = useQuery({
    queryKey: ["top-drivers"],
    queryFn: () =>
      statisticsService.getTopDrivers({
        startDate,
        endDate,
        numberOfProductsToReturn,
      }),
  });

  return {
    topDrivers: topDrivers?.contentList?.[0],
    isSuccessTopDrivers,
    isPendingTopDrivers,
    isErrorTopDrivers,
    topDriversError,
  };
};

export const useGetTopProducts = ({
  startDate,
  endDate,
  numberOfProductsToReturn,
}) => {
  const {
    data: topProducts,
    isSuccess: isSuccessTopProducts,
    isPending: isPendingTopProducts,
    isError: isErrorTopProducts,
    error: topProductsError,
  } = useQuery({
    queryKey: ["top-products"],
    queryFn: () =>
      statisticsService.getTopProducts({
        startDate,
        endDate,
        numberOfProductsToReturn,
      }),
  });

  return {
    topProducts: topProducts?.contentList?.[0],
    isSuccessTopProducts,
    isPendingTopProducts,
    isErrorTopProducts,
    topProductsError,
  };
};
