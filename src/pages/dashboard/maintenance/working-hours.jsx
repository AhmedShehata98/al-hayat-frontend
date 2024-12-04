import React, { useCallback } from "react";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import Head from "next/head";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Container,
  LinearProgress,
  Link,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator";
import { paths } from "../../../paths";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../locales/tokens";
import CalenderDays from "../../../sections/dashboard/maintenance/CalenderDays";
import { nanoid } from "@reduxjs/toolkit";
import {
  useGetWorkingHours,
  useUpdateWorkingHours,
} from "../../../hooks/use-maintenance";
import {
  DAYS_BACKGROUND_COLORS,
  DAYS_TEXT_COLORS,
} from "../../../utils/adaptors/workdays-adaptor";
import useSnackbar from "../../../hooks/use-snackbar";
import useWeekDays from "../../../hooks/use-week-days";

const DAYS = {
  saturday: "saturday",
  sunday: "sunday",
  monday: "monday",
  tuesday: "tuesday",
  wednesday: "wednesday",
  thursday: "thursday",
  friday: "friday",
};

const INITIAL_WEEKDAYS_LIST = [
  {
    day: DAYS.saturday,
    shifts: [],
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: false,
    isWorkingDay: false,
  },
  {
    day: DAYS.sunday,
    shifts: [],
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: false,
    isWorkingDay: false,
  },
  {
    day: DAYS.monday,
    shifts: [],
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: false,
    isWorkingDay: false,
  },
  {
    day: DAYS.tuesday,
    shifts: [],
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: false,
    isWorkingDay: false,
  },
  {
    day: DAYS.wednesday,
    shifts: [],
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: false,
    isWorkingDay: false,
  },
  {
    day: DAYS.thursday,
    shifts: [],
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: false,
    isWorkingDay: false,
  },
  {
    day: DAYS.friday,
    shifts: [],
    color: DAYS_TEXT_COLORS,
    backgroundColor: DAYS_BACKGROUND_COLORS,
    isSelected: false,
    isWorkingDay: false,
  },
];

function WorkingHours() {
  const { t } = useTranslation();

  const [maxCapacityInput, setMaxCapacityInput] = React.useState(0);

  const { workingHours, isLoadingWorkingHours } = useGetWorkingHours({
    onSuccess: (response) => {
      const maxRequestsPerDay = response?.contentList?.find(
        (item) => item.isDayOff === false
      )?.maxRequestsPerDay;
      setMaxCapacityInput(maxRequestsPerDay);
    },
  });

  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();
  const { updateWorkingHoursAsync, isUpdatingWorkingHours } =
    useUpdateWorkingHours();

  const handleSyncUpdates = useCallback(
    async (weekDaysList) => {
      try {
        const withCapacity = weekDaysList?.map((item) => ({
          ...item,
          maxRequestsPerDay: maxCapacityInput,
        }));
        await updateWorkingHoursAsync(withCapacity);
        handleOpenSnackbar({
          severity: "success",
          message: t(tokens.toastMessages.updateMsg),
        });
      } catch (error) {
        console.error("Error updating working hours: ", error);
        handleOpenSnackbar({
          severity: "error",
          message: t(tokens.toastMessages.errorMsg),
        });
      }
    },
    [updateWorkingHoursAsync, t, maxCapacityInput]
  );

  const { weekDaysList, handleSetWeekdays } = useWeekDays({
    initialWeekdaysList: workingHours.contentList,
    onChangeWeekdays: handleSyncUpdates,
  });

  const handleAddWorkingDay = useCallback(
    (data) => {
      try {
        handleSetWeekdays((prevState) =>
          prevState.map((item) =>
            item.day === data.day
              ? {
                  ...item,
                  isWorkingDay: true,
                  isSelected: true,
                  shifts: [{ ...data.shift, id: nanoid(2) }],
                  maxCapacity: maxCapacityInput,
                }
              : item
          )
        );
      } catch (error) {
        console.error("Error adding new working day: ", error);
      }
    },
    [maxCapacityInput]
  );

  const handleAddNewShift = useCallback(
    (data) => {
      handleSetWeekdays((prevState) =>
        prevState.map((item) =>
          item.day === data.day
            ? {
                ...item,
                shifts: [...item.shifts, { ...data.shift, id: nanoid(2) }],
                isWorkingDay: true,
                isSelected: true,
                maxCapacity: maxCapacityInput,
              }
            : item
        )
      );
    },
    [maxCapacityInput]
  );

  const handleDeleteDay = useCallback((day) => {
    handleSetWeekdays((prevState) =>
      prevState.map((item) =>
        item.day === day
          ? {
              ...item,
              isSelected: false,
              isWorkingDay: false,
              shifts: [],
              maxCapacity: 0,
            }
          : item
      )
    );
  }, []);

  const handleDeleteShift = useCallback(
    (data) => {
      console.log("deleted shift: ", data.shift);
      handleSetWeekdays((prevState) =>
        prevState.map((item) =>
          item.day === data.day
            ? {
                ...item,
                shifts: item.shifts.filter((shift) => {
                  return (
                    shift.time.startTime !== data.shift.startTime &&
                    shift.time.endTime !== data.shift.endTime
                  );
                }),
                maxCapacity: maxCapacityInput,
              }
            : { ...item, maxCapacity: maxCapacityInput }
        )
      );
    },
    [maxCapacityInput]
  );

  const handleAddCapacity = useCallback(
    async (_evt) => {
      try {
        const withCapacity = weekDaysList.map((item) => ({
          ...item,
          maxCapacity: maxCapacityInput,
        }));
        await handleSyncUpdates(withCapacity);
        handleOpenSnackbar({
          message: t(tokens.toastMessages.updateMsg).replace(
            "@",
            t(tokens.maintenanceWorkingHours.visitsCapacity)
          ),
          severity: "success",
        });
      } catch (error) {
        console.error("Error updating working hours with capacity: ", error);
        handleOpenSnackbar({
          severity: "error",
          message: t(tokens.toastMessages.errorMsg),
        });
      }
    },
    [weekDaysList, maxCapacityInput]
  );

  return (
    <>
      <Head>Dashboard : working hours</Head>
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
                  {t(tokens.maintenanceWorkingHours.headingTitle)}
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
                    href={paths.dashboard.maintenance.workingHours}
                    variant="subtitle2"
                  >
                    {t(tokens.maintenanceWorkingHours.headingTitle)}
                  </Link>
                </Breadcrumbs>
              </Stack>
              {/* <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  component={NextLink}
                  href={paths.dashboard.offers.createDiscount}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  {t(tokens.maintenance)}
                </Button>
              </Stack> */}
            </Stack>
            <Box sx={{ width: "100%", display: "flex" }}>
              {isLoadingWorkingHours && (
                <LinearProgress color="secondary" sx={{ width: "100%" }} />
              )}
            </Box>
          </Stack>
          {/* Content */}
          <Stack spacing={4} marginTop={8}>
            <Box
              sx={{
                display: "grid",
                width: "100%",
                gridTemplateColumns: "1fr",
                gap: "1rem",
              }}
              id="working-hours-content"
            >
              <Stack>
                <Stack spacing={2} marginBottom={4}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography variant="h5" textTransform={"capitalize"}>
                      {t(tokens.maintenanceWorkingHours.visitsCapacity)} :
                    </Typography>
                  </Box>
                </Stack>
                <Box sx={{ display: "flex", flexGrow: 1, mb: 6, gap: 3 }}>
                  <TextField
                    name="maxCapacity"
                    type="number"
                    color="primary"
                    fullWidth
                    label={t(tokens.maintenanceWorkingHours.visitsCapacity)}
                    value={maxCapacityInput}
                    disabled={isLoadingWorkingHours}
                    onChange={(evt) => setMaxCapacityInput(evt.target.value)}
                  />
                  <Button
                    onClick={handleAddCapacity}
                    variant="contained"
                    color="primary"
                  >
                    {t(tokens.common.addBtn)}
                  </Button>
                </Box>
              </Stack>
              <Stack marginBottom={6}>
                <Stack spacing={2} marginBottom={4}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography variant="h5" textTransform={"capitalize"}>
                      {t(tokens.maintenanceWorkingHours.workDaysHeading)} :
                    </Typography>
                    <Paper
                      sx={{
                        backgroundColor: DAYS_BACKGROUND_COLORS.working,
                        width: "5.5rem",
                        height: "1.75rem",
                        borderRadius: "4px",
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                      }}
                    ></Paper>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography variant="h5" textTransform={"capitalize"}>
                      {t(tokens.maintenanceWorkingHours.vacationDaysHeading)} :
                    </Typography>
                    <Paper
                      elevation={4}
                      sx={{
                        backgroundColor: DAYS_BACKGROUND_COLORS.vacation,
                        width: "5.5rem",
                        height: "1.75rem",
                        borderRadius: "4px",
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                      }}
                    ></Paper>
                  </Box>
                </Stack>

                <CalenderDays
                  days={weekDaysList}
                  onAdd={handleAddWorkingDay}
                  onDeleteDay={handleDeleteDay}
                  onAddNewShift={handleAddNewShift}
                  onDeleteShift={handleDeleteShift}
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
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
}

export default WorkingHours;

WorkingHours.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
