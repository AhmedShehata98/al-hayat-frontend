import NextLink from "next/link";
import Head from "next/head";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { usePageView } from "../../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import { paths } from "../../../../paths";
import { CustomerEditForm } from "../../../../sections/dashboard/customer/customer-edit-form";
import { getInitials } from "../../../../utils/get-initials";
import { useGetUserById } from "../../../../hooks/use-user";
import { usePathname } from "next/navigation";
import useTranslateCustomer from "../../../../hooks/use-translate-customer";

const Page = () => {
  const { editPage } = useTranslateCustomer();
  const pathname = usePathname();
  const { user } = useGetUserById(pathname?.split("/").at(-2));
  usePageView();

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Customer Edit | Piston</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href={paths.dashboard.customers.index}
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">
                    {editPage.header.goBack}
                  </Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: "column",
                  md: "row",
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Avatar
                    src={user.avatar}
                    sx={{
                      height: 64,
                      width: 64,
                    }}
                  >
                    {getInitials(`${user.firstName} ${user.lastName}`)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">{user.email}</Typography>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">
                        {" "}
                        {editPage.header.customerId} :
                      </Typography>
                      <Chip label={user.id} size="small" />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <CustomerEditForm customer={user} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
