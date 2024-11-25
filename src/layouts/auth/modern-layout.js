import NextLink from "next/link";
import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";
import { Logo } from "../../components/logo";
import { paths } from "../../paths";
import useTranslateLogin from "../../hooks/use-translate-login";

export const Layout = (props) => {
  const { children } = props;
  const {
    informationSectionHeadingTitle,
    informationSectionDescription,
    logo,
  } = useTranslateLogin();

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flex: "1 1 auto",
        flexDirection: {
          xs: "column-reverse",
          md: "row",
        },
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "neutral.800",
          backgroundImage: 'url("/assets/gradient-bg.svg")',
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          color: "common.white",
          display: "flex",
          flex: {
            xs: "0 0 auto",
            md: "1 1 auto",
          },
          justifyContent: "center",
          p: {
            xs: 4,
            md: 8,
          },
        }}
      >
        <Box maxWidth="md">
          <Typography sx={{ mb: 1 }} variant="h4">
            {informationSectionHeadingTitle}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            {informationSectionDescription}
          </Typography>
          {/* <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            gap={4}
            sx={{
              color: 'text.primary',
              '& > *': {
                color: 'neutral.400',
                flex: '0 0 auto'
              }
            }}
          >
            <LogoSamsung />
            <LogoVisma />
            <LogoBolt />
            <LogoAws />
            <LogoAccenture />
            <LogoAtt />
          </Stack> */}
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          display: "flex",
          flex: {
            xs: "1 1 auto",
            md: "0 0 auto",
          },
          flexDirection: "column",
          justifyContent: {
            md: "center",
          },
          maxWidth: "100%",
          p: {
            xs: 4,
            md: 8,
          },
          width: {
            md: 600,
          },
        }}
      >
        <div>
          <Box sx={{ mb: 4 }}>
            <Stack
              alignItems="center"
              component={NextLink}
              direction="row"
              display="inline-flex"
              gap={"1rem"}
              href={paths.index}
              spacing={1}
              sx={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  height: 24,
                  width: 24,
                }}
              >
                <Logo />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "text.primary",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 20,
                  fontWeight: 800,
                  // letterSpacing: "0.3px",
                  // lineHeight: 4.0,
                  "& span": {
                    color: "primary.main",
                    mt: 1,
                  },
                }}
              >
                {/* {logo?.split(":")[0]} */}
                <span> {logo?.split(":")[0]} </span>
              </Box>
            </Stack>
          </Box>
          {children}
        </div>
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
