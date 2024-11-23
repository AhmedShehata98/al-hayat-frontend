import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import {
  useGetCompleted,
  useGetInProgress,
  useGetTodayCompleted,
  useGetTodayProgress,
  useGetTopDrivers,
  useGetTopProducts,
  useGetTotalOrders,
} from "../../../hooks/use-statistics";
import useTranslateStatistics from "../../../hooks/use-translate-statistics";
import Image from "next/image";

const now = new Date();

const startOfMonth = new Date(
  now.getFullYear(),
  now.getMonth() - 1,
  1
).toISOString();
const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

const OverviewOrders = () => {
  const { translatedStatistics } = useTranslateStatistics();
  const { totalOrders, isSuccessTotalOrders } = useGetTotalOrders();
  const { todayProgress, isSuccessTodayProgress } = useGetTodayProgress();
  const { todayCompleted, isSuccessTodayCompleted } = useGetTodayCompleted();
  const { inProgress, isSuccessInProgress } = useGetInProgress();
  const { completed, isSuccessCompleted } = useGetCompleted();
  const { topDrivers, isSuccessTopDrivers } = useGetTopDrivers({
    numberOfProductsToReturn: 12,
    startDate: startOfMonth,
    endDate: endOfMonth,
  });
  const { topProducts, isSuccessTopProducts } = useGetTopProducts({
    numberOfProductsToReturn: 12,
    startDate: startOfMonth,
    endDate: endOfMonth,
  });
  return (
    <Grid
      paddingInline={3}
      paddingBlockStart={7}
      spacing={1.2}
      width="100%"
      container
    >
      {/* total orders */}
      <Grid item xs={12} sm={6} md={3}>
        {isSuccessTotalOrders && (
          <Card width="100%" elevation={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom textTransform={"uppercase"}>
                {translatedStatistics.totalOrders}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  marginTop: "1rem",
                }}
                color={"text.secondary"}
              >
                <Image
                  src="/assets/icons/responsive.png"
                  width={44}
                  height={44}
                  alt="thumbnail"
                />
                <Typography variant="subtitle1" color={"secondary"}>
                  {totalOrders || 0}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
      {/* today completed */}
      <Grid item xs={12} sm={6} md={3}>
        {isSuccessTodayCompleted && (
          <Card width="100%">
            <CardContent>
              <Typography variant="h6" gutterBottom textTransform={"uppercase"}>
                {translatedStatistics.todayCompleted}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  marginTop: "1rem",
                }}
                color={"text.secondary"}
              >
                <Image
                  src="/assets/icons/shopping-bag.png"
                  width={44}
                  height={44}
                  alt="thumbnail"
                />
                <Typography variant="subtitle1" color={"secondary"}>
                  {todayCompleted || 0}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
      {/* total orders */}
      <Grid item xs={12} sm={6} md={3}>
        {isSuccessTodayProgress && (
          <Card width="100%">
            <CardContent>
              <Typography variant="h6" gutterBottom textTransform={"uppercase"}>
                {translatedStatistics.todayProgress}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  marginTop: "1rem",
                }}
                color={"text.secondary"}
              >
                <Image
                  src="/assets/icons/clock.png"
                  width={44}
                  height={44}
                  alt="thumbnail"
                />
                <Typography variant="subtitle1" color={"secondary"}>
                  {todayProgress || 0}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
      {/* in progress */}
      <Grid item xs={12} sm={6} md={3}>
        {isSuccessInProgress && (
          <Card width="100%">
            <CardContent>
              <Typography variant="h6" gutterBottom textTransform={"uppercase"}>
                {translatedStatistics.inProgress}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  marginTop: "1rem",
                }}
                color={"text.secondary"}
              >
                <Image
                  src="/assets/icons/work-process.png"
                  width={44}
                  height={44}
                  alt="thumbnail"
                />
                <Typography variant="subtitle1" color={"secondary"}>
                  {inProgress || 0}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
      {/* completed */}
      <Grid item xs={12} sm={6} md={3}>
        {isSuccessCompleted && (
          <Card width="100%">
            <CardContent>
              <Typography variant="h6" gutterBottom textTransform={"uppercase"}>
                {translatedStatistics.completed}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  marginTop: "1rem",
                }}
                color={"text.secondary"}
              >
                <Image
                  src="/assets/icons/check.png"
                  width={44}
                  height={44}
                  alt="thumbnail"
                />
                <Typography variant="subtitle1" color={"secondary"}>
                  {completed || 0}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
      {/* top driver */}
      <Grid item xs={12} sm={6} md={3}>
        {isSuccessTopDrivers && (
          <Card width="100%">
            <CardContent>
              <Typography variant="h6" gutterBottom textTransform={"uppercase"}>
                {translatedStatistics.topDrivers}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  marginTop: "1rem",
                }}
                color={"text.secondary"}
              >
                <Image
                  src="/assets/icons/driver.png"
                  width={44}
                  height={44}
                  alt="thumbnail"
                />
                <Typography variant="subtitle1" color={"secondary"}>
                  {topDrivers || 0}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
      {/* top products */}
      <Grid item xs={12} sm={6} md={3}>
        {isSuccessTopProducts && (
          <Card width="100%">
            <CardContent>
              <Typography variant="h6" gutterBottom textTransform={"uppercase"}>
                {translatedStatistics.topProducts}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  marginTop: "1rem",
                }}
                color={"text.secondary"}
              >
                <Image
                  src="/assets/icons/products.png"
                  width={44}
                  height={44}
                  alt="thumbnail"
                />
                <Typography variant="subtitle1" color={"secondary"}>
                  {topProducts || 0}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
};

export default OverviewOrders;
