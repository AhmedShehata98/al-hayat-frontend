import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { maintenanceService } from "../api/maintaine-services";
import { authAtom } from "../atoms/auth-atom";
import { useRecoilValue } from "recoil";
import { maintenanceAdaptor } from "../utils/adaptors/maintenance-adaptor";
import {
  workDaysResponseAdaptor,
  workingDaysUpdateRequestAdaptor,
} from "../utils/adaptors/workdays-adaptor";
import { useEffect, useMemo } from "react";

const QUERIES_KEY = {
  MAINTENANCE_REQUEST_DETAILS: "maintenance-request-details",
  MAINTENANCE_REQUESTS: "maintenance-requests",
  MAINTENANCE_SERVICES: "maintenance-services",
  WORKING_HOURS: "working-hours",
};
export const useGetMaintenanceRequests = ({
  limit,
  page,
  search,
  filter,
  VisitDate,
}) => {
  const { token } = useRecoilValue(authAtom);
  const {
    data,
    isLoading: isLoadingMaintenanceRequests,
    isError: isErrorMaintenanceRequests,
    error: errorMaintenanceRequests,
  } = useQuery({
    queryKey: [
      QUERIES_KEY.MAINTENANCE_REQUESTS,
      { limit, page },
      token,
      { search, filter, VisitDate },
    ],
    queryFn: () =>
      maintenanceService.getAllMaintenanceRequests({
        token,
        limit,
        page,
        search,
        filter,
        VisitDate,
      }),
    keepPreviousData: true,
  });

  return {
    maintenanceRequests: data
      ? {
          ...data,
          contentList: maintenanceAdaptor(data?.paginatedList),
        }
      : undefined,
    isLoadingMaintenanceRequests,
    isErrorMaintenanceRequests,
    errorMaintenanceRequests,
  };
};

export const useGetMaintenanceRequestDetails = (maintenanceRequestId) => {
  const { token } = useRecoilValue(authAtom);

  const {
    data,
    isLoading: isLoadingMaintenanceRequestDetails,
    isError: isErrorMaintenanceRequestDetails,
  } = useQuery({
    queryKey: [
      QUERIES_KEY.MAINTENANCE_REQUEST_DETAILS,
      token,
      maintenanceRequestId,
    ],
    queryFn: () =>
      maintenanceService.getMaintenanceRequestDetails({
        id: maintenanceRequestId,
        token,
      }),
  });

  return {
    maintenanceRequestDetails: {
      ...data,
      contentList: maintenanceAdaptor(data?.contentList)?.[0],
    },
    isLoadingMaintenanceRequestDetails,
    isErrorMaintenanceRequestDetails,
  };
};

export const useChangeMaintenanceStatus = () => {
  const { token } = useRecoilValue(authAtom);
  const queryClient = useQueryClient();

  const {
    mutateAsync: changeStatusAsync,
    isPending: isPendingChangeStatus,
    isError: isErrorChangeStatus,
    error: errorMsg,
  } = useMutation({
    mutationFn: ({ status, maintenanceId }) =>
      maintenanceService.changeMaintenanceStatus({
        token,
        status,
        maintenanceId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERIES_KEY.MAINTENANCE_REQUESTS]);
    },
  });

  return {
    changeStatusAsync,
    isPendingChangeStatus,
    isErrorChangeStatus,
    errorMsg,
  };
};

export const useGetMaintenanceServices = ({ limit, page }) => {
  const { token } = useRecoilValue(authAtom);
  const {
    data,
    isLoading: isLoadingMaintenanceServices,
    isError: isErrorMaintenanceServices,
  } = useQuery({
    queryKey: [QUERIES_KEY.MAINTENANCE_SERVICES, token, { limit, page }],
    queryFn: () =>
      maintenanceService.getAllMaintenanceServices({ token, limit, page }),
  });

  return {
    maintenanceServices: data,
    isLoadingMaintenanceServices,
    isErrorMaintenanceServices,
  };
};

export const useAddMaintenanceService = () => {
  const queryClient = useQueryClient();
  const authState = useRecoilValue(authAtom);

  const {
    mutate: addMaintenanceService,
    isPending: isAddingMaintenanceService,
    isError: isErrorMaintenanceService,
    error: errorMaintenanceService,
  } = useMutation({
    mutationFn: (serviceData) =>
      maintenanceService.addMaintenanceService({
        serviceData,
        maintenanceService,
        token: authState.token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.MAINTENANCE_SERVICES],
      });
    },
  });

  return {
    addMaintenanceService,
    isAddingMaintenanceService,
    isErrorMaintenanceService,
    errorMaintenanceService,
  };
};

export const useUpdateMaintenanceService = () => {
  const queryClient = useQueryClient();
  const authState = useRecoilValue(authAtom);

  const {
    mutate: updateMaintenanceService,
    isPending: isUpdatingMaintenanceService,
    isError: isErrorMaintenanceService,
    error: errorMaintenanceService,
  } = useMutation({
    mutationFn: ({ newServiceData, serviceId }) =>
      maintenanceService.updateMaintenanceService({
        newServiceData,
        serviceId,
        token: authState.token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.MAINTENANCE_SERVICES],
      });
    },
  });

  return {
    updateMaintenanceService,
    isUpdatingMaintenanceService,
    isErrorMaintenanceService,
    errorMaintenanceService,
  };
};

export const useDeleteMaintenanceService = () => {
  const queryClient = useQueryClient();
  const authState = useRecoilValue(authAtom);

  const {
    mutateAsync: deleteMaintenanceServiceAsync,
    isLoading: isDeletingMaintenanceService,
    isError: isErrorMaintenanceService,
    error: errorMaintenanceService,
  } = useMutation({
    mutationFn: (serviceId) =>
      maintenanceService.deleteMaintenanceService({
        id: serviceId,
        token: authState.token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.MAINTENANCE_SERVICES],
      });
    },
  });

  return {
    deleteMaintenanceServiceAsync,
    isDeletingMaintenanceService,
    isErrorMaintenanceService,
    errorMaintenanceService,
  };
};

export const useGetWorkingHours = ({ onSuccess }) => {
  const { token } = useRecoilValue(authAtom);
  const {
    data,
    isLoading: isLoadingWorkingHours,
    isError: isErrorWorkingHours,
    error: errorWorkingHours,
  } = useQuery({
    queryKey: [QUERIES_KEY.WORKING_HOURS, token],
    queryFn: () => maintenanceService.getWorkingHours({ token }),
    keepPreviousData: true,
  });

  const newData = useMemo(
    () => ({
      ...data,
      contentList: workDaysResponseAdaptor(data?.contentList),
    }),
    [data, isLoadingWorkingHours]
  );

  useEffect(() => {
    if (!data) return;
    onSuccess?.(data);
  }, [data, isLoadingWorkingHours]);

  return {
    workingHours: newData,
    isLoadingWorkingHours,
    isErrorWorkingHours,
    errorWorkingHours,
  };
};

export const useUpdateWorkingHours = () => {
  const queryClient = useQueryClient();
  const authState = useRecoilValue(authAtom);

  const {
    mutateAsync: updateWorkingHoursAsync,
    isLoading: isUpdatingWorkingHours,
    isError: isErrorWorkingHours,
    error: errorWorkingHours,
  } = useMutation({
    mutationFn: (workingHours) => {
      maintenanceService.updateWorkingHours({
        workingHours: workingDaysUpdateRequestAdaptor(workingHours),
        token: authState.token,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.WORKING_HOURS],
      });
    },
  });

  return {
    updateWorkingHoursAsync,
    isUpdatingWorkingHours,
    isErrorWorkingHours,
    errorWorkingHours,
  };
};
