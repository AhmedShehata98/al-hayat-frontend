import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersServices } from "../api/users";
import { useEffect } from "react";
import { authAtom } from "../atoms/auth-atom";
import { useRecoilState, useRecoilValue } from "recoil";

const useGetAllUsers = ({ search, sortBy, sortDir, limit, page }) => {
  const { token } = useRecoilValue(authAtom);
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    error: errorUsers,
    isSuccess: isSuccessUsers,
  } = useQuery({
    queryKey: ["users", search, sortBy, sortDir, limit, page],
    queryFn: () =>
      usersServices.getAllUsers(
        { search, sortBy, sortDir, limit, page },
        token
      ),
  });

  return {
    users: users?.contentList?.[0],
    isLoadingUsers,
    isErrorUsers,
    errorUsers,
    isSuccessUsers,
  };
};

const useGetAllEmployees = ({ search, sortBy, sortDir, limit, page }) => {
  const { token } = useRecoilValue(authAtom);
  const {
    data: users,
    isLoading: isLoadingEmployees,
    isError: isErrorEmployees,
    error: errorEmployees,
    isSuccess: isSuccessEmployees,
  } = useQuery({
    queryKey: ["employees", search, sortBy, sortDir, limit, page],
    queryFn: () =>
      usersServices.getAllEmployees(
        { search, sortBy, sortDir, limit, page },
        token
      ),
  });

  return {
    employees: users?.contentList?.[0],
    isLoadingEmployees,
    isErrorEmployees,
    errorEmployees,
    isSuccessEmployees,
  };
};

const useGeMeData = (enabled = true) => {
  const [_, setAuthAtom] = useRecoilState(authAtom);
  const {
    data: me,
    isLoading: isGettingMeData,
    isError: isErrorGetMeData,
    isSuccess: isSuccessGetMeData,
    error: meErrorMsg,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => usersServices.getMe(),
    enabled,
  });

  useEffect(() => {
    if (isSuccessGetMeData) {
      setAuthAtom((prevState) => ({
        ...prevState,
        isExpiredSessionDialog: false,
        user: me?.contentList?.[0],
        isLoggedIn: true,
      }));
    }

    if (isErrorGetMeData) {
      setAuthAtom((prevState) => ({
        ...prevState,
        isExpiredSessionDialog: true,
        user: null,
        isLoggedIn: false,
      }));
    }
  }, [setAuthAtom, isSuccessGetMeData, isErrorGetMeData, me]);

  return {
    me: me?.contentList?.[0],
    isGettingMeData,
    isErrorGetMeData,
    isSuccessGetMeData,
    meErrorMsg,
  };
};

const useGetUserById = (userId) => {
  const { token } = useRecoilValue(authAtom);
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => usersServices.getUserById(userId, token),
    enabled: Boolean(userId),
  });

  return { user: user?.contentList?.[0], isLoading, isError, error };
};

const useAddUser = () => {
  const { token } = useRecoilValue(authAtom);

  const queryClient = useQueryClient();
  const {
    mutate: addUser,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: (user) => usersServices.addUser(user, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { addUser, isLoading, isError, error };
};

const useDeleteUser = () => {
  const { token } = useRecoilValue(authAtom);

  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteUserAsync,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: (userId) => usersServices.deleteUser(userId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { deleteUserAsync, isLoading, isError, error };
};
const useDeleteEmployee = () => {
  const { token } = useRecoilValue(authAtom);

  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteEmployeeAsync,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: (userId) => usersServices.deleteEmployee(userId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return { deleteEmployeeAsync, isLoading, isError, error };
};

const useUpdateUser = () => {
  const { token } = useRecoilValue(authAtom);

  const queryClient = useQueryClient();
  const {
    mutateAsync: updateUserAsync,
    isLoading: isUpdatingUserData,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ userId, newUserData }) =>
      usersServices.updateUser(userId, newUserData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "users"] });
    },
  });

  return { updateUserAsync, isUpdatingUserData, isError, error };
};

const useUpdateMe = () => {
  const { token } = useRecoilValue(authAtom);

  const queryClient = useQueryClient();
  const {
    mutateAsync: updateMeAsync,
    isLoading: isUpdatingMeData,
    isError,
    error,
  } = useMutation({
    mutationFn: (newMeData) => usersServices.updateMe(newMeData, token),
    onSuccess: () => {
      // invalidate the 'user' query and the 'me' query
      queryClient.invalidateQueries(["user", "me"]);
    },
  });

  return {
    updateMeAsync,
    isUpdatingMeData,
    isError,
    error,
  };
};

const useGetAllDriversUsers = ({ limit, page, orderBy, orderDir, search }) => {
  const { token } = useRecoilValue(authAtom);

  const {
    data: drivers,
    isPending: isGettingDriversUsers,
    isSuccess: isSuccessGettingDriversUsers,
    isError: isErrorGettingDriversUsers,
    error: errorGettingDriversUsersMsg,
  } = useQuery({
    queryKey: ["drivers"],
    queryFn: () =>
      usersServices.getDriversUsers(
        { limit, page, orderBy, orderDir, search },
        token
      ),
  });

  return {
    drivers: drivers?.contentList?.[0],
    isGettingDriversUsers,
    isSuccessGettingDriversUsers,
    isErrorGettingDriversUsers,
    errorGettingDriversUsersMsg,
  };
};
export {
  useGetAllUsers,
  useGetUserById,
  useAddUser,
  useDeleteUser,
  useUpdateUser,
  useGeMeData,
  useGetAllDriversUsers,
  useUpdateMe,
  useGetAllEmployees,
  useDeleteEmployee,
};
