import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  LinearProgress,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { paths } from "../../../paths";
import { ProductListSearch } from "../../../sections/dashboard/product/product-list-search";
import { ProductListTable } from "../../../sections/dashboard/product/product-list-table";
import { useGetAllProducts } from "../../../hooks/use-product";
import usePagination from "../../../hooks/use-pagination";
import useTranslateProducts from "../../../hooks/use-translate-products";
import { useDebounce } from "use-debounce";
import useTranslateNetworkMessages from "../../../hooks/use-translate-network-msgs.js";
import DataListRender from "../../../components/DataListRender.jsx";
import { QUERY_KEY } from "../../../constants/query-keys.js";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../atoms/auth-atom.js";
import { productsService } from "../../../api/products/index.js";
const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      name: undefined,
      category: [],
      status: [],
      inStock: undefined,
      query: undefined,
    },
    page: 0,
    rowsPerPage: 5,
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const ProductList = () => {
  const {
    translateProducts: { headingTitle, ctaBtn, breadcrumb },
  } = useTranslateProducts();
  const { noFoundResources, currentLang } = useTranslateNetworkMessages();
  const authState = useRecoilValue(authAtom);

  const { limit, page, handleChangePage, handleChangeLimit } = usePagination({
    limit: 10,
    page: 1,
  });
  const { search, updateSearch } = useSearch();
  const [queryString, setQueryString] = useState();
  const [sortQuery, setSort] = useState({
    sortBy: "orderDate",
    sortDir: "asc",
  });
  const [queryDebounced] = useDebounce(queryString, 400);

  const handleFiltersChange = useCallback(
    (filters) => {
      updateSearch((prevState) => ({
        ...prevState,
        filters,
      }));
    },
    [updateSearch]
  );

  const handleQueryChange = useCallback((query) => {
    setQueryString(query);
  }, []);

  const handleSortChange = useCallback((sort) => {
    setSort(sort);
  }, []);

  const handlePageChange = useCallback(
    (_event, page) => {
      handleChangePage(page);
    },
    [handleChangePage]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      handleChangeLimit(parseInt(event.target.value, 10));
    },
    [handleChangeLimit]
  );

  return (
    <>
      <Head>
        <title>Dashboard: Product List | Devias Kit PRO</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{headingTitle}</Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.index}
                    variant="subtitle2"
                  >
                    {breadcrumb.dashboard}
                  </Link>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.products.index}
                    variant="subtitle2"
                  >
                    {headingTitle}
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    {breadcrumb.productsList}
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  component={NextLink}
                  href={paths.dashboard.products.create}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  {ctaBtn}
                </Button>
              </Stack>
            </Stack>
            <ProductListSearch
              onFiltersChange={handleFiltersChange}
              onQueryChange={handleQueryChange}
              onSortChange={handleSortChange}
            />
            <DataListRender
              title={headingTitle}
              dataExtractor={(data) => data.contentList?.[0].paginatedList}
              queryKey={[
                QUERY_KEY.products,
                queryDebounced,
                sortQuery.sortDir,
                sortQuery.sortBy,
                page,
                limit,
                authState.token,
              ]}
              enabled={true}
              queryFn={() =>
                productsService.getAllProducts({
                  search: queryDebounced,
                  sortDir: sortQuery.sortDir,
                  sortBy: sortQuery.sortBy,
                  page,
                  limit,
                  token: authState.token,
                })
              }
            >
              {({ data }) => (
                <Card>
                  <ProductListTable
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    page={data.contentList?.[0]?.currentPage || page}
                    products={data.contentList?.[0]?.paginatedList}
                    productsCount={data.contentList?.[0]?.totalPages || 0}
                    isSuccessProducts={true}
                    rowsPerPage={limit}
                  />
                </Card>
              )}
            </DataListRender>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

ProductList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProductList;
