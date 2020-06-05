import withRoot from '../withRoot';

import React, { useState, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';

import Room from '@material-ui/icons/Room';
import Work from '@material-ui/icons/Work';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import Cancel from '@material-ui/icons/Cancel';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import Typography from '../components/Typography';
import MainNav from '../views/MainNav';
import MainFooter from '../views/MainFooter';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Cancel: forwardRef((props, ref) => <Cancel {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
  page: {
    margin: '2rem',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  avatar: {
    width: '60px',
    height: '60px',
    margin: '24px auto',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.light,
    fontFamily: 'Leckerli One',
    fontWeight: '100',
  },
  profile: {
    textAlign: 'center',
  },
  detailLine: {
    display: 'inline-flex',
    verticalAlign: 'top',
    width: '100%',
    margin: '12px 0',
  },
  detail: {
    padding: '2px 8px',
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      {
        title: 'Company',
        field: 'company',
      },
      {
        title: 'Phone',
        field: 'phone',
        type: 'numeric',
      },
      {
        title: 'Finished',
        field: 'isDone',
        type: 'boolean',
        defaultSort: 'desc',
      },
    ],
    data: [
      {
        name: 'Mark van Dijk',
        company: 'Coolblue',
        isDone: false,
        phone: '+31641236593',
      },
      {
        name: 'Bart Kort',
        company: 'Fabrique',
        isDone: false,
        phone: '+31643658341',
      },
      {
        name: 'Floris Dijkhof',
        company: 'ING',
        isDone: true,
        phone: '+31643658341',
      },
      {
        name: 'Bas Verknipt',
        company: 'ASML',
        isDone: false,
        phone: '+31643658341',
      },
      {
        name: 'Bart Kort',
        company: 'Urban Timber',
        isDone: false,
        phone: '+31643658341',
      },
      {
        name: 'Jochem Rutjes',
        company: 'Atlas',
        isDone: true,
        phone: '+31643658341',
      },
      {
        name: 'Ard Vermaat',
        company: 'Direct Result',
        isDone: true,
        phone: '+31643658341',
      },
    ],
  });

  return (
    <React.Fragment>
      <MainNav />
      <div className={classes.page}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>{'J'}</Avatar>
              <Typography className={classes.profile} variant="h5">
                {'Jurrian Lammerts'}
              </Typography>
              <Divider className={classes.divider} />
              <div className={classes.detailLine}>
                <Room fontSize="small" />
                <Typography variant="body2" className={classes.detail}>
                  {'Rotterdam, The Netherlands'}
                </Typography>
              </div>
              <div className={classes.detailLine}>
                <Work fontSize="small" />
                <Typography variant="body2" className={classes.detail}>
                  {'Junior Developer'}
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Paper className={classes.paper}>
              <Typography variant="h5">{'Welcome Jurrian'}</Typography>
              <Divider className={classes.divider} />
              <MaterialTable
                icons={tableIcons}
                title="Assignments"
                localization={{
                  body: {
                    editRow: {
                      deleteText:
                        'Are you sure?',
                    },
                  },
                }}
                columns={state.columns}
                data={state.data}
                options={{
                  rowStyle: (rowData) =>
                    rowData.isDone
                      ? { backgroundColor: '#A4E5C7' }
                      : { backgroundColor: '#f77f80' },
                }}
                actions={[
                  (rowData) => ({
                    icon: rowData.isDone ? tableIcons.Cancel : tableIcons.Check,
                    tooltip: rowData.isDone
                      ? 'Unfinish assignment'
                      : 'Finish assignment',

                    onClick: (event, rowData) => {
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          setState((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(rowData)][
                              'isDone'
                            ] = !rowData.isDone;
                            return { ...prevState, data };
                          });
                        }, 600);
                      });
                    },
                  }),
                ]}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data.push(newData);
                          return { ...prevState, data };
                        });
                      }, 600);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        if (oldData) {
                          setState((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                          });
                        }
                      }, 600);
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data.splice(data.indexOf(oldData), 1);
                          return { ...prevState, data };
                        });
                      }, 600);
                    }),
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
      <MainFooter />
    </React.Fragment>
  );
}

export default withRoot(Dashboard);
