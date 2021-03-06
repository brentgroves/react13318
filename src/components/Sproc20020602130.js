import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

var g_sprocName;
var g_tableName;
var g_total;
var g_limit;
var g_skip;
var g_QueryFetch;
var g_firstPage;
var g_firstBuffPage;
var g_lastBuffPage;
var g_lastPage;

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    if(g_skip>0){
      g_QueryFetch(g_sprocName,g_tableName,g_limit,0);
    }
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    if(page==g_firstBuffPage){
      g_QueryFetch(g_sprocName,g_tableName,g_limit,g_skip-g_limit);
    }
    onChangePage(event,page-1);
  };

  const handleNextButtonClick = event => {
    if(page==g_lastBuffPage){
      console.log(`page: ${page},g_lastBuffPage: ${g_lastBuffPage}`)
      g_QueryFetch(g_sprocName,g_tableName,g_limit,g_skip+g_limit);
    }
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    if(g_skip<(g_total-g_limit)){
      g_QueryFetch(g_sprocName,g_tableName,g_limit,g_total-g_limit);
    }
    onChangePage(event, g_lastPage);
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={(page === 0)}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={(page === 0)}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={(page >=g_lastPage)}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= g_lastPage}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
// disabled={page >= Math.ceil(count / rowsPerPage) - 1}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function Sproc200206({ isAuthenticated,sprocName,tableName,total, limit, skip, data, Push, QueryFetch }) {
  g_sprocName=sprocName;
  g_tableName=tableName;
  g_total=total;
  g_limit=limit;
  g_skip=skip;
  g_QueryFetch=QueryFetch;
  useEffect(() => {
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;
    if (!isAuthenticated) {
      Push("/login");
    }
    if (total==0) {
      Push("/");
    }
  });
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  g_firstPage=0;
  g_firstBuffPage=Math.max(0,g_skip/rowsPerPage);
  g_lastBuffPage=g_firstBuffPage + Math.max(0,Math.ceil(data.length/rowsPerPage)-1);
  g_lastPage = Math.max(0, Math.ceil(g_total / rowsPerPage) - 1); // 0 based pages,


  let emptyRows = 0;
  if((g_skip+g_limit) > g_total ){
    emptyRows= rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  }



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    let rpp = parseInt(event.target.value, 10);
    setRowsPerPage(rpp);
    g_firstBuffPage=Math.max(0,g_skip/rpp);
    g_lastBuffPage=g_firstBuffPage + Math.max(0,Math.ceil(data.length/rpp)-1);
    g_lastPage = Math.max(0, Math.ceil(g_total / rpp) - 1); // 0 based pages,
    setPage(g_firstBuffPage);
    console.log(`g_firstBuffPage: ${g_firstBuffPage},g_lastBuffPage:${g_lastBuffPage},g_lastPage:${g_lastPage}`)
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
        <TableRow>
          <TableCell>Workcenter_Code</TableCell>
          <TableCell align="right">Part_number</TableCell>
          <TableCell align="right">Data_hour</TableCell>
          <TableCell align="right">Hourly_planned_production_count</TableCell>
          <TableCell align="right">Hourly_actual_production_count</TableCell>
        </TableRow>
      </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? data.slice((page-g_firstBuffPage) * rowsPerPage, (page-g_firstBuffPage) * rowsPerPage + rowsPerPage)
            : data
          ).map(row => (
            <TableRow key={row.ID}>
              <TableCell component="th" scope="row">
                {row.Workcenter_Code}
              </TableCell>
              <TableCell align="right">{row.Part_number}</TableCell>
              <TableCell align="right">{row.Data_hour}</TableCell>
              <TableCell align="right">{row.Hourly_planned_production_count}</TableCell>
              <TableCell align="right">{row.Hourly_actual_production_count}</TableCell>
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
              rowsPerPageOptions={[5, 10, 25 ]}
              colSpan={5}
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
