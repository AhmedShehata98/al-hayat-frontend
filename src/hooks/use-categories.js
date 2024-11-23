import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { categoryService } from "../api/categories";

const useAddCategory = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: addCategory,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (category) => categoryService.createCategory(category),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  return {
    addCategory,
    isPending,
    isSuccess,
  };
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateCategory, isLoading: isUpdatingCategory } =
    useMutation({
      mutationFn: ({ categoryId, newCategory }) =>
        categoryService.updateCategory(categoryId, newCategory),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
  return {
    updateCategory,
    isUpdatingCategory,
  };
};

const useGetCatagories = ({
  sortOrder,
  sortDirection,
  search,
  page,
  limit,
}) => {
  const {
    data: categories,
    isSuccess: isSuccessCategories,
    isError: isErrorCategories,
    isPending: isPendingCategories,
    error: categoriesErrorMsg,
  } = useQuery({
    queryKey: ["categories", search, sortOrder, sortDirection, page, limit],
    queryFn: () =>
      categoryService.getAllCategories({
        sortOrder,
        sortDirection,
        search,
        page,
        limit,
      }),
  });

  return {
    categories: categories?.contentList?.[0],
    categoryCount: categories?.contentList?.[0].paginatedList.length || 0,
    isSuccessCategories: isSuccessCategories,
    isErrorCategories: isErrorCategories,
    isPendingCategories: isPendingCategories,
    categoriesErrorMsg,
  };
};

const useGetCategoryById = (categoryId) => {
  const { data: category, isLoading: isGettingCategory } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => categoryService.getCategoryById(categoryId),
    enabled: Boolean(categoryId),
  });
  return { category: category?.contentList?.[0], isGettingCategory };
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteCategory, isLoading: isDeleting } = useMutation({
    mutationFn: (categoryId) => categoryService.deleteCategory(categoryId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  return {
    deleteCategory,
    isDeleting,
  };
};

export {
  useAddCategory,
  useUpdateCategory,
  useGetCategoryById,
  useGetCatagories,
  useDeleteCategory,
};
