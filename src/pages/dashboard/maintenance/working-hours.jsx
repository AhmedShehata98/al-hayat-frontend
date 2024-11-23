import React, { useCallback } from "react";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import Head from "next/head";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator";
import { paths } from "../../../paths";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../locales/tokens";
import CalenderDays from "../../../sections/dashboard/maintenance/CalenderDays";
import { nanoid } from "@reduxjs/toolkit";
import VisitsCapacity from "../../../sections/dashboard/maintenance/VisitsCapacity";

const DAYS_TEXT_COLORS = {
  vacation: "#161616",
  working: "#f6f6f6",
};
const DAYS_BACKGROUND_COLORS = {
  vacation: "#FCFAEE",
  working: "#162129",
};

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
  const [weekDaysList, setWeekDaysList] = React.useState(INITIAL_WEEKDAYS_LIST);

  const handleAddWorkingDay = useCallback((data) => {
    console.log(data.shift);
    setWeekDaysList((prevState) =>
      prevState.map((item) =>
        item.day === data.day
          ? {
              ...item,
              isWorkingDay: true,
              isSelected: true,
              shifts: [{ ...data.shift, id: nanoid(2) }],
            }
          : item
      )
    );
  }, []);

  const handleAddNewShift = useCallback((data) => {
    setWeekDaysList((prevState) =>
      prevState.map((item) =>
        item.day === data.day
          ? {
              ...item,
              shifts: [...item.shifts, { ...data.shift, id: nanoid(2) }],
            }
          : item
      )
    );
  }, []);

  const handleDeleteDay = useCallback((day) => {
    console.log(day);
    setWeekDaysList((prevState) =>
      prevState.map((item) =>
        item.day === day
          ? { ...item, isSelected: false, isWorkingDay: false, shifts: [] }
          : item
      )
    );
  }, []);

  const handleDeleteShift = useCallback((data) => {
    setWeekDaysList((prevState) =>
      prevState.map((item) =>
        item.day === data.day
          ? {
              ...item,
              shifts: item.shifts.filter((shift) => shift.id !== data.shiftId),
            }
          : item
      )
    );
  }, []);

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
          </Stack>
          {/* Content */}
          <Stack spacing={4} marginTop={8}>
            <Box
              sx={{
                display: "grid",
                width: "100%",
                gridTemplateColumns: "1fr",
                gap: "1rem",
                // "@media screen and (min-width: 1024px)": {
                //   gridTemplateColumns: "1fr 1fr",
                // },
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
                <VisitsCapacity currentCapacity={43} maxCapacity={80} />
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
                  activeColor={DAYS_BACKGROUND_COLORS}
                  textActiveColor={DAYS_TEXT_COLORS}
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default WorkingHours;

WorkingHours.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
