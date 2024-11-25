import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";

// const tenants = ["Devias", "Acme Corp"];
const tenants = ["Ahmed shehata", "Ehsan duwidi"];

export const TenantSwitch = (props) => {
  const anchorRef = useRef(null);
  const [selectedTenant, setSelectedTenant] = useState(tenants[0]);
  const [openPopover, setOpenPopover] = useState(false);

  const handlePopoverOpen = useCallback(() => {
    setOpenPopover(true);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setOpenPopover(false);
  }, []);

  const handleTenantChange = useCallback((tenant) => {
    setOpenPopover(false);
    setSelectedTenant(tenant);
  }, []);

  return (
    <>
      <Stack alignItems="center" direction="row" spacing={2} {...props}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography color="inherit" variant="h6">
            Al-Hayat
          </Typography>
          {/* <Typography color="neutral.400" variant="body2">
            Batahf
          </Typography> */}
        </Box>
        {/* <IconButton onClick={handlePopoverOpen} ref={anchorRef}>
          <SvgIcon sx={{ fontSize: 16 }}>
            <ChevronDownIcon />
          </SvgIcon>
        </IconButton> */}
      </Stack>
      {/* <TenantPopover
        anchorEl={anchorRef.current}
        onChange={handleTenantChange}
        onClose={handlePopoverClose}
        open={openPopover}
        tenants={tenants}
      /> */}
    </>
  );
};

TenantSwitch.propTypes = {
  // @ts-ignore
  sx: PropTypes.object,
};
