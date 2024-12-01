import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import Head from "next/head";
import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator";
import { paths } from "../../../paths";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../locales/tokens";
import MaintenanceRequestsCard from "../../../sections/dashboard/maintenance/MaintenanceRequestsCard";
import { useGetMaintenanceRequests } from "../../../hooks/use-maintenance";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

function MaintenanceRequests() {
  const { t } = useTranslation();
  const filterOptions = useMemo(() => {
    return [
      {
        value: "all",
        label: `${t(tokens.maintenance.status.title)} - ${t(
          tokens.maintenance.status.all
        )}`,
      },
      {
        value: "Declined",
        label: `${t(tokens.maintenance.status.title)} - ${t(
          tokens.maintenance.status.rejected
        )}`,
      },
      {
        value: "Pending",
        label: `${t(tokens.maintenance.status.title)} - ${t(
          tokens.maintenance.status.pending
        )}`,
      },
      {
        value: "Accepted",
        label: `${t(tokens.maintenance.status.title)} - ${t(
          tokens.maintenance.status.accept
        )}`,
      },
    ];
  }, [t]);
  const [page, setPage] = useState(1);
  const [filterMaintenance, setFilterMaintenance] = useState("");
  const [searchTerm, setSearchTerm] = useState("", 400);
  const [debounceSearchTerm, setDebounceSearchTerm] = useDebounceValue("", 400);
  const {
    maintenanceRequests,
    isErrorMaintenanceRequests,
    isLoadingMaintenanceRequests,
    errorMaintenanceRequests,
  } = useGetMaintenanceRequests({
    limit: 10,
    page,
    search: debounceSearchTerm,
    filter: filterMaintenance,
  });

  const handleChangeFilter = (event) => {
    setFilterMaintenance(event.target.value);
  };

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
    setDebounceSearchTerm(event.target.value);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };
  return (
    <>
      <Head>Dashboard : maintenance service</Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          {/* Heading */}
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">
                  {t(tokens.maintenance.headingTitle)}
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.index}
                    variant="subtitle2"
                  >
                    {t(tokens.breadcrumbs.dashboard)}
                  </Link>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.maintenance.index}
                    variant="subtitle2"
                  >
                    {t(tokens.maintenance.headingTitle)}
                  </Link>
                </Breadcrumbs>
              </Stack>
            </Stack>
            {/* filter an search */}
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={3}
            >
              <TextField
                id="search-maintenance"
                label={t(tokens.maintenance.searchOrderPlaceholder)}
                name="search-maintenance"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleChangeSearch}
              />
              <FormControl sx={{ m: 1, minWidth: 170 }}>
                <InputLabel id="filter-maintenance">filter</InputLabel>
                <Select
                  labelId="filter-maintenance"
                  id="filter-maintenance"
                  value={filterMaintenance}
                  label="filter"
                  onChange={handleChangeFilter}
                >
                  {filterOptions.map((option, idx) => (
                    <MenuItem
                      key={idx}
                      value={option.value}
                      selected={option.value === "all"}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
              </FormControl>
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 3,
              marginTop: 7,
              "@media screen and (min-width: 540px)": {
                gridTemplateColumns: "1fr 1fr",
              },
              "@media screen and (min-width: 768px)": {
                gridTemplateColumns: "1fr 1fr 1fr",
              },
              "@media screen and (min-width: 992px)": {
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
              },
              "@media screen and (min-width: 1440px)": {
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              },
            }}
          >
            {maintenanceRequests &&
              maintenanceRequests.contentList.map((request) => (
                <MaintenanceRequestsCard key={request.id} data={request} />
              ))}
            {isErrorMaintenanceRequests && (
              <Alert
                severity={
                  errorMaintenanceRequests.status === 404 ? "warning" : "error"
                }
                sx={{ width: "100%" }}
              >
                <AlertTitle>
                  {errorMaintenanceRequests.status === 404
                    ? t(tokens.networkMessages.noFoundResources.title).replace(
                        "{resourceName}",
                        t(tokens.maintenance.headingTitle)
                      )
                    : t(tokens.networkMessages.somethingWentWrong.title)}
                </AlertTitle>
              </Alert>
            )}
          </Stack>
        </Container>
        <Pagination
          count={maintenanceRequests?.totalPages || 1}
          page={maintenanceRequests?.currentPage || 1}
          color="primary"
          onChange={handleChangePage}
          disabled={isLoadingMaintenanceRequests || isErrorMaintenanceRequests}
          sx={{
            mt: 6,
          }}
        />
      </Box>
    </>
  );
}

export default MaintenanceRequests;

MaintenanceRequests.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
