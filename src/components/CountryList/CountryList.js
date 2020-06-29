import React, { useState } from "react";
import styles from "./CountryList.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";

const CountryList = ({ countries }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, countries.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={styles.container}>
      <TableContainer component={Paper}>
        <Table className={styles.table} size="small" aria-label="simple table">
          <TableHead className={styles.tablehead}>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell align="right">Cases</TableCell>
              <TableCell align="right">Deaths</TableCell>
              <TableCell align="right">Recovered</TableCell>
              <TableCell align="right">Last Updated On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? countries.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : countries
            ).map((country) => (
              <TableRow key={country.id}>
                <TableCell component="th" scope="row">
                  <NavLink
                    to={`/countrydata/${country.slug}`}
                    activeClassName="active"
                  >
                    {country.country}
                  </NavLink>
                </TableCell>
                <TableCell align="right">{country.totalConfirmed}</TableCell>
                <TableCell align="right">{country.totalDeaths}</TableCell>
                <TableCell align="right">{country.totalRecovered}</TableCell>
                <TableCell align="right">
                  {new Date(country.lastUpdate).toDateString()}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={countries.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CountryList;
