"use strict";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "../api/products/index";
import { useRecoilValue } from "recoil";
import { authAtom } from "../atoms/auth-atom";

const useGetAllProducts = ({ search, sortDir, sortBy, page, limit }) => {
  const authState = useRecoilValue(authAtom);

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    isSuccess: isSuccessProducts,
    error: errorProducts,
  } = useQuery({
    queryKey: [
      "products",
      search,
      sortDir,
      sortBy,
      page,
      limit,
      authState.token,
    ],
    queryFn: () =>
      productsService.getAllProducts({
        search,
        sortDir,
        sortBy,
        page,
        limit,
        token: authState.token,
      }),
  });
  return {
    products: products?.contentList?.[0],
    productsCount: products?.contentList?.[0]?.paginatedList?.length || 0,
    isLoadingProducts,
    isErrorProducts,
    errorProducts,
    isSuccessProducts,
  };
};

const useGetProductById = (productId) => {
  const { token } = useRecoilValue(authAtom);

  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    isSuccess: isSuccessProduct,
    error: errorProduct,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productsService.getProductById({ productId, token }),
    enabled: Boolean(productId),
  });

  return {
    product: product?.contentList[0],
    isLoadingProduct,
    isErrorProduct,
    isSuccessProduct,
    product,
    errorProduct,
  };
};

const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { token } = useRecoilValue(authAtom);
  const {
    mutateAsync: addProductAsync,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: (product) => productsService.createProduct({ product, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { addProductAsync, isLoading, isError, error };
};

const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { token } = useRecoilValue(authAtom);

  const {
    mutateAsync: updateProductAsync,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ productId, newProduct }) =>
      productsService.updateProduct({ newProduct, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { updateProductAsync, isLoading, isError, error };
};

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { token } = useRecoilValue(authAtom);

  const {
    mutateAsync: deleteProductAsync,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (productId) =>
      productsService.deleteProduct({ productId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { deleteProductAsync, isLoading, isError, error, isSuccess };
};
const useToggleProductActive = () => {
  const queryClient = useQueryClient();
  const { token } = useRecoilValue(authAtom);

  const {
    mutateAsync: toggleProductActiveAsync,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (fd) => productsService.toggleActive({ fd, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { toggleProductActiveAsync, isLoading, isError, error, isSuccess };
};

export {
  useGetAllProducts,
  useGetProductById,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
  useToggleProductActive,
};
