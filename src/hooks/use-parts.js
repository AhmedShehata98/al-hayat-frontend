import { useMutation, useQuery } from "@tanstack/react-query";
import { partsService } from "../api/parts";
import { authAtom } from "../atoms/auth-atom";
import { useRecoilValue } from "recoil";
export const useGetMatchPartsWithCar = (searchQuery) => {
  const { token } = useRecoilValue(authAtom);

  const {
    data: partMatchData,
    isLoading: isLoadingMatching,
    isError: isErrorMatching,
    error: errorMatching,
  } = useQuery({
    queryKey: ["match-part-id", searchQuery],
    queryFn: ({ partNo, manufacturer, year, carName }) =>
      partsService.getMatchPartsWithCar(
        {
          partNo: searchQuery,
          manufacturer,
          year,
          carName,
        },
        token
      ),
  });

  return {
    partMatchData,
    isLoadingMatching,
    isErrorMatching,
  };
};
