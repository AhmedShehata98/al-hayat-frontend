import { useCallback, useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {
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
import { useDeleteEmployee } from "../../../hooks/use-user";
import { useTranslation } from "react-i18next";

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

export const EmployeesListTable = (props) => {
  const {
    employees,
    employeesCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const { deselectAll, selectAll, deselectOne, selectOne, selected } =
    useSelectionModel(employees);
  const [_, options] = useTranslation();
  const customerTranslation = useTranslateCustomer();

  const { deleteEmployeeAsync, isLoading: isDeleting } = useDeleteEmployee();

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
    const employeeId = selected;
    await deleteEmployeeAsync(employeeId);
  };

  const selectedAll = selected.length === employees.length;
  const selectedSome =
    selected.length > 0 && selected.length < employees.length;
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
          <Button color="inherit" size="small" onClick={onBulkDeleteAction}>
            Delete
          </Button>
          {/* <Button
            color="inherit"
            size="small"
            LinkComponent={NextLink}
            href={paths.dashboard.customers.edit.replace(
              ":customerId",
              selected
            )}
          >
            Edit
          </Button> */}
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
            {employees.map((user) => {
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
                          href={paths.dashboard.employee.details.replace(
                            ":employeeId",
                            user.id
                          )}
                          variant="subtitle2"
                        >
                          {fullName}
                        </Link>
                        <Typography color="text.secondary" variant="body2">
                          {customerTranslation.usersTable.role.options[
                            user?.role?.toLowerCase()
                          ] ||
                            user?.role ||
                            "Unknown"}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell dir="ltr">{user?.phoneNumber || "NA"}</TableCell>
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
                      href={paths.dashboard.employee.edit.replace(
                        ":employeeId",
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
                      href={paths.dashboard.employee.details.replace(
                        ":employeeId",
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
        count={employeesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

EmployeesListTable.propTypes = {
  employees: PropTypes.array.isRequired,
  employeesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
