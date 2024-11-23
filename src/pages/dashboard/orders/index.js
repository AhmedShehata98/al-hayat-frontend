import { useCallback, useMemo, useRef, useState } from "react";
import Head from "next/head";
import {
  Alert,
  AlertTitle,
  Box,
  Divider,
  LinearProgress,
  Snackbar,
  Stack,
  Typography,
  Tab,
  Tabs,
} from "@mui/material";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { OrderDrawer } from "../../../sections/dashboard/order/order-drawer";
import { OrderListContainer } from "../../../sections/dashboard/order/order-list-container";
import { OrderListSearch } from "../../../sections/dashboard/order/order-list-search";
import { OrderListTable } from "../../../sections/dashboard/order/order-list-table";
import { useCancelOrder, useGetAllOrders } from "../../../hooks/use-orders";
import usePagination from "../../../hooks/use-pagination";
import { ORDER_STATUS } from "../../../utils/orders-helpers";
import useTranslateOrders from "../../../hooks/use-translate-orders";
import useSnackbar from "../../../hooks/use-snackbar";
import { useDebounce } from "use-debounce";
import useTranslateNetworkMessages from "../../../hooks/use-translate-network-msgs.js";
import { useUpdateEffect } from "../../../hooks/use-update-effect";

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      query: undefined,
      status: ORDER_STATUS.get(0),
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: "orderDate",
    sortDir: "asc",
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const Page = () => {
  const { translatedOrders } = useTranslateOrders();
  const { noFoundResources, currentLang } = useTranslateNetworkMessages();
  const { handleChangeLimit, handleChangePage, limit, page } = usePagination({
    limit: 10,
    page: 1,
  });
  const [currentTab, setCurrentTab] = useState(ORDER_STATUS.get(0));
  const [filters, setFilters] = useState({
    query: undefined,
    status: ORDER_STATUS.get(0),
  });
  const { search, updateSearch } = useSearch();
  const [queryDebounced] = useDebounce(search.filters.query, 400);
  const TabsElements = useMemo(() => {
    const tabOptions = [...Array.from(ORDER_STATUS)];
    return tabOptions.map(([key, value]) => {
      const label =
        translatedOrders.filters[value.toLowerCase().split(" ").join("")];
      return <Tab key={key} label={label} value={value} />;
    });
  }, [translatedOrders.filters]);

  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();
  const { orders, isSuccessOrders, isPendingOrders, isErrorOrders } =
    useGetAllOrders({
      // search: queryDebounced,
      searchByID: queryDebounced,
      sortOrder: search.sortBy,
      sortDirection: search.sortDir,
      status: search.filters.status,
      page,
      limit,
    });
  const { cancelOrderAsync, isPendingCancel } = useCancelOrder();
  const sortOptions = useMemo(
    () => [
      {
        label: `${translatedOrders.sortByOptions.date} - ${translatedOrders.sortByOptions.newest}`,
        value: "orderDate:desc",
      },
      {
        label: `${translatedOrders.sortByOptions.date} - ${translatedOrders.sortByOptions.oldest}`,
        value: "orderDate:asc",
      },
    ],
    [translatedOrders]
  );

  const rootRef = useRef(null);
  const [drawer, setDrawer] = useState({
    isOpen: false,
    data: undefined,
  });
  const currentOrder = useMemo(() => {
    if (!drawer.data) {
      return undefined;
    }

    return orders.paginatedList.find((order) => order.id === drawer.data);
  }, [drawer, orders]);

  usePageView();

  const handleFiltersChange = useCallback(
    (filters) => {
      updateSearch((prevState) => ({
        ...prevState,
        filters,
      }));
    },
    [updateSearch]
  );

  const handleSortChange = useCallback(
    ({ sortBy, sortDir }) => {
      updateSearch((prevState) => ({
        ...prevState,
        sortDir,
        sortBy,
      }));
    },
    [updateSearch]
  );

  const handlePageChange = useCallback(
    (event, page) => {
      if (page < 1) return;

      updateSearch((prevState) => ({
        ...prevState,
        page,
      }));
    },
    [updateSearch]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      updateSearch((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
      }));
    },
    [updateSearch]
  );

  const handleOrderOpen = useCallback(
    (orderId) => {
      // Close drawer if is the same order

      if (drawer.isOpen && drawer.data === orderId) {
        setDrawer({
          isOpen: false,
          data: undefined,
        });
        // router.push(
        //   paths.dashboard.orders.details.replace(":orderId", orderId)
        // );
      }

      setDrawer({
        isOpen: true,
        data: orderId,
      });
    },
    [drawer]
  );

  const handleOrderClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: undefined,
    });
  }, []);

  const onReject = useCallback(
    async (orderId) => {
      try {
        await cancelOrderAsync(orderId);
        handleOpenSnackbar({
          message: translatedToast.orderCancelSuccess.replace("@", orderId),
          severity: "success",
        });
        setDrawer({
          isOpen: false,
          data: undefined,
        });
      } catch (error) {
        handleOpenSnackbar({
          message: translatedToast.orderCancelError,
          severity: "error",
        });
      }
    },
    [handleOpenSnackbar, cancelOrderAsync, translatedToast]
  );

  const handleTabsChange = useCallback((event, tab) => {
    setCurrentTab(tab);
    const status = tab === "all" ? undefined : tab;

    setFilters((prevState) => ({
      ...prevState,
      status,
    }));
  }, []);

  const handleFiltersUpdate = useCallback(() => {
    handleFiltersChange(filters);
  }, [filters, handleFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  return (
    <>
      <Head>
        <title>Dashboard: Order List | Devias Kit PRO</title>
      </Head>
      <Divider />
      <Box
        component="main"
        ref={rootRef}
        sx={{
          display: "flex",
          flex: "1 1 auto",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: "flex",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <OrderListContainer open={drawer.isOpen}>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    {translatedOrders.headingTitle}
                  </Typography>
                </div>
              </Stack>
            </Box>
            <Divider />
            <OrderListSearch
              onFiltersChange={(d) => console.log(d)}
              onSortChange={handleSortChange}
              onSearchQueryChange={(query) =>
                updateSearch((prev) => ({
                  ...prev,
                  filters: { ...prev.filters, query },
                }))
              }
              sortBy={search.sortBy}
              sortDir={search.sortDir}
              sortOptions={sortOptions}
              TabsComponent={
                <Tabs
                  indicatorColor="primary"
                  onChange={handleTabsChange}
                  scrollButtons="auto"
                  sx={{ px: 3 }}
                  textColor="primary"
                  value={currentTab}
                  variant="scrollable"
                >
                  {TabsElements}
                </Tabs>
              }
            />
            <Divider />
            {isPendingOrders && <LinearProgress />}
            {orders?.paginatedList?.length === 0 || isErrorOrders ? (
              <Alert severity={"error"}>
                <AlertTitle>
                  {noFoundResources.title.replace(
                    "{resourceName}",
                    currentLang === "ar" ? "طلبيات" : "orders"
                  )}
                </AlertTitle>
                {noFoundResources.message.replace(
                  "{resourceName}",
                  currentLang === "ar" ? "الطلبيات" : "orders"
                )}
              </Alert>
            ) : (
              <OrderListTable
                onOrderSelect={handleOrderOpen}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                orders={orders?.paginatedList || []}
                ordersCount={orders?.paginatedList?.totalCount || 0}
                page={page}
                rowsPerPage={limit}
              />
            )}
          </OrderListContainer>
          <OrderDrawer
            container={rootRef.current}
            onClose={handleOrderClose}
            onReject={() => onReject(drawer.data)}
            open={drawer.isOpen}
            order={currentOrder}
          />
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={autoHideDuration}
        anchorOrigin={anchorOrigin}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
