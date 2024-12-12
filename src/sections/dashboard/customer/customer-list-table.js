import { useCallback, useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../../components/scrollbar";
import { paths } from "../../../paths";
import { getInitials } from "../../../utils/get-initials";
import { useRouter } from "next/router";
import useTranslateCustomer from "../../../hooks/use-translate-customer";
import { useDeleteUser } from "../../../hooks/use-user";
import { useTranslation } from "react-i18next";
import { Snackbar } from "@mui/material";
import useSnackbar from "../../../hooks/use-snackbar";
import { tokens } from "../../../locales/tokens";

const useSelectionModel = (customers) => {
  const customerIds = useMemo(() => {
    return customers || [].map((customer) => customer.id);
  }, [customers]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, [customerIds]);

  const selectOne = useCallback((customerId) => {
    setSelected((prevState) => [...prevState, customerId]);
  }, []);

  const deselectOne = useCallback((customerId) => {
    setSelected((prevState) => {
      return prevState.filter((id) => id !== customerId);
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected([...customerIds]);
  }, [customerIds]);

  const deselectAll = useCallback(() => {
    setSelected([]);
  }, []);

  return {
    deselectAll,
    deselectOne,
    selectAll,
    selectOne,
    selected,
  };
};

export const CustomerListTable = (props) => {
  const {
    customers,
    customersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    users,
    rowsPerPage,
    ...other
  } = props;
  const { deselectAll, selectAll, deselectOne, selectOne, selected } =
    useSelectionModel(users);
  const [_, options] = useTranslation();
  const { deleteUserAsync, isLoading: isDeleting } = useDeleteUser();
  const customerTranslation = useTranslateCustomer();
  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();

  const handleToggleAll = useCallback(
    (event) => {
      const { checked } = event.target;

      if (checked) {
        selectAll();
      } else {
        deselectAll();
      }
    },
    [selectAll, deselectAll]
  );

  const onBulkDeleteAction = async () => {
    try {
      for (const customerId of selected) {
        await deleteUserAsync(customerId);
        handleOpenSnackbar({
          message: translatedToast.deleteMsg.replace(
            "@",
            `# ${customerId.slice(0, 8)}...`
          ),
          security: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting user", error);
      handleOpenSnackbar({
        message: tokens.networkMessages.somethingWentWrong.message,
        severity: "error",
      });
    }
  };

  const selectedAll = selected.length === users.length;
  const selectedSome = selected.length > 0 && selected.length < users.length;
  const enableBulkActions = selected.length > 0;

  return (
    <Box sx={{ position: "relative" }} {...other}>
      {enableBulkActions && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "neutral.800" : "neutral.50",
            display: enableBulkActions ? "flex" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            px: 2,
            py: 0.5,
            zIndex: 10,
          }}
        >
          <Checkbox
            checked={selectedAll}
            indeterminate={selectedSome}
            onChange={handleToggleAll}
          />
          <Button
            color="inherit"
            size="small"
            onClick={onBulkDeleteAction}
            disabled={isDeleting}
          >
            {isDeleting ? "deleting now ..." : "Delete"}
          </Button>
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={handleToggleAll}
                />
              </TableCell>
              <TableCell>{customerTranslation.usersTable.name}</TableCell>
              <TableCell>{customerTranslation.usersTable.phone}</TableCell>
              <TableCell width={"25%"}>
                {customerTranslation.usersTable.location}
              </TableCell>
              <TableCell>{customerTranslation.usersTable.orders}</TableCell>
              <TableCell align="right">
                {customerTranslation.usersTable.actions}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const isSelected = selected.includes(user.id);
              const fullName = `${user.firstName} ${user.lastName}`;

              return (
                <TableRow hover key={user.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        const { checked } = event.target;

                        if (checked) {
                          selectOne(user.id);
                        } else {
                          deselectOne(user.id);
                        }
                      }}
                      value={isSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Avatar
                        src={user?.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                          textTransform: "capitalize",
                        }}
                      >
                        {getInitials(fullName)}
                      </Avatar>
                      <div>
                        <Link
                          color="inherit"
                          component={NextLink}
                          href={paths.dashboard.customers.details.replace(
                            ":customerId",
                            user.id
                          )}
                          variant="subtitle2"
                        >
                          {fullName}
                        </Link>
                        <Typography color="text.secondary" variant="body2">
                          {customerTranslation.usersTable.role.options[
                            user?.roles?.[0]?.toLowerCase()
                          ] ||
                            user?.roles?.[0] ||
                            "Unknown"}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell dir={"ltr"}>{user?.phoneNumber || "NA"}</TableCell>
                  <TableCell>{user?.currentLocation || "NA"}</TableCell>
                  <TableCell>
                    {Intl.NumberFormat(`${options.language}-SA`, {
                      style: "decimal",
                    }).format(user?.ordersCount || 0)}
                  </TableCell>
                  {/* <TableCell>
                    <Typography variant="subtitle2">{totalSpent}</Typography>
                  </TableCell> */}
                  <TableCell align="right">
                    <IconButton
                      title="edit"
                      LinkComponent={NextLink}
                      href={paths.dashboard.customers.edit.replace(
                        ":customerId",
                        user.id
                      )}
                    >
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton>
                    <IconButton
                      title="details"
                      LinkComponent={NextLink}
                      href={paths.dashboard.customers.details.replace(
                        ":customerId",
                        user.id
                      )}
                      sx={{
                        transform:
                          options.language === "ar"
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                    >
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={customersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={autoHideDuration}
        anchorOrigin={anchorOrigin}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

CustomerListTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
