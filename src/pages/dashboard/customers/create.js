import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import CreateUserForm from "../../../sections/dashboard/customer/create-user-form";
import useTranslateCustomer from "../../../hooks/use-translate-customer";

const CreateUser = () => {
  const customerTranslation = useTranslateCustomer();

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
                  {customerTranslation.createPage.headingTitle}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {/* create user form */}
          <CreateUserForm />
        </Container>
      </Box>
    </>
  );
};
CreateUser.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateUser;
