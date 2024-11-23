import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import CreateEmployeeForm from "../../../sections/dashboard/employee/create-employee-form";
import useTranslateEmployees from "../../../hooks/use-translate-employee";

const CreateEmployee = () => {
  const employeeTranslation = useTranslateEmployees();

  return (
    <>
      <Head>
        <title>Dashboard: Create customers | Piston</title>
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
                <Typography variant="h4">
                  {employeeTranslation.createPage.headingTitle}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {/* create user form */}
          <CreateEmployeeForm />
        </Container>
      </Box>
    </>
  );
};
CreateEmployee.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateEmployee;
