import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import Head from "next/head";
import {
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
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import LinearProgressWithLabel from "../../../components/linear-progress-with-label";
import { calcPercentageFromUnits } from "../../../utils/maintenance-requests";
import DataListRender from "../../../components/DataListRender";
import { authAtom } from "../../../atoms/auth-atom";
import { useRecoilValue } from "recoil";
import { maintenanceService } from "../../../api/maintaine-services";
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
  const [totalPages, setTotalPages] = useState(1);
  const [currentDate, setCurrentDate] = useState(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  const [filterMaintenance, setFilterMaintenance] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxRequestsPerDay, setMaxRequestsPerDay] = useState(undefined);
  const [totalRequestsPerDay, setTotalRequestsPerDay] = useState(undefined);
  const [debounceSearchTerm, setDebounceSearchTerm] = useDebounceValue("", 400);
  const { token } = useRecoilValue(authAtom);
  // const {
  //   maintenanceRequests,
  //   isErrorMaintenanceRequests,
  //   isLoadingMaintenanceRequests,
  //   errorMaintenanceRequests,
  // } = useGetMaintenanceRequests({
  //   limit: 10,
  //   page,
  //   search: debounceSearchTerm,
  //   filter: filterMaintenance,
  //   VisitDate: currentDate,
  // });

  const calculateVisits = useMemo(() => {
    if (!maxRequestsPerDay || !totalRequestsPerDay) return 0;

    const totalVisits = calcPercentageFromUnits({
      totalUnits: maxRequestsPerDay,
      currentUnits: totalRequestsPerDay,
    });
    return totalVisits;
  }, [totalRequestsPerDay, maxRequestsPerDay]);

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

  const handleFilterByDate = (evt) => {
    if (!evt.target.value) {
      console.warn("No date selected");
      return;
    }
    setCurrentDate(evt.target.value);
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
              <Box
                sx={{ display: "flex", gap: "0.3rem", alignItems: "center" }}
              >
                <TextField
                  type="date"
                  name="visit-date"
                  id="visit-date"
                  color="primary"
                  value={currentDate}
                  label={t(tokens.maintenance.filterByDate)}
                  onChange={handleFilterByDate}
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
                      <MenuItem key={idx} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
              </Box>
            </Stack>
          </Stack>
          {totalRequestsPerDay && maxRequestsPerDay && (
            <Box sx={{ width: "100%", mt: 4 }}>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                {t(tokens.maintenanceWorkingHours.visitsCapacity)}:{" "}
                <Typography variant="body1">{maxRequestsPerDay}</Typography>
              </Typography>
              <LinearProgressWithLabel value={calculateVisits} />
            </Box>
          )}
          <Stack
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 3,
              marginTop: 3,
              "@media screen and (min-width: 540px)": {
                gridTemplateColumns: "1fr 1fr",
              },
              "@media screen and (min-width: 768px)": {
                gridTemplateColumns: "1fr 1fr 1fr",
              },
              "@media screen and (min-width: 992px)": {
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
              },
              "@media screen (min-width: 1440px)": {
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              },
            }}
          >
            <DataListRender
              dataExtractor={(data) => data.paginatedList}
              enabled
              title={t(tokens.maintenance.headingTitle)}
              queryKey={[
                "services-requests",
                token,
                page,
                debounceSearchTerm,
                { filterMaintenance, currentDate },
              ]}
              queryFn={() =>
                maintenanceService.getAllMaintenanceRequests({
                  token,
                  limit: 10,
                  page,
                  search: debounceSearchTerm,
                  filter: filterMaintenance,
                  VisitDate: currentDate,
                })
              }
            >
              {({ data }) => {
                setTotalPages(data.totalPages);
                setTotalRequestsPerDay(data?.totalRequestsPerDay);
                setMaxRequestsPerDay(data?.maxRequestsPerDay);

                return data.paginatedList.map((request) => (
                  <MaintenanceRequestsCard key={request.id} data={request} />
                ));
              }}
            </DataListRender>
          </Stack>
        </Container>
        <Pagination
          count={totalPages}
          page={page}
          color="primary"
          onChange={handleChangePage}
          // disabled={isLoadingMaintenanceRequests || isErrorMaintenanceRequests}
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
