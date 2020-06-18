import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  buttonColor: {
    backgroundColor: theme.palette.secondary.main,
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
  container: {
    padding: '1em',
  },
  avatar: {
    margin: '24px auto',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.light,
    fontFamily: 'Leckerli One',
    fontWeight: '100',
  },
}));

const Chat = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Paper elevation={0} className={classes.container}>
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={3} className={classes.borderRight500}>
            <List>
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar className={classes.avatar}>
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={user.name}></ListItemText>
              </ListItem>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: '10px' }}>
              <TextField
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Divider />
            <List>
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                <ListItemText secondary="online" align="right"></ListItemText>
              </ListItem>
              <ListItem button key="Alice">
                <ListItemIcon>
                  <Avatar
                    alt="Alice"
                    src="https://material-ui.com/static/images/avatar/3.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Alice Newton">Alice Newton</ListItemText>
              </ListItem>
              <ListItem button key="TedBaker">
                <ListItemIcon>
                  <Avatar
                    alt="Ted Baker"
                    src="https://material-ui.com/static/images/avatar/2.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Ted Baker">Ted Baker</ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={9}>
            <List className={classes.messageArea}>
              <ListItem key="1">
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      align="right"
                      primary="Hey man, What's up ?"
                    ></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText
                      align="right"
                      secondary="09:30"
                    ></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem key="2">
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      align="left"
                      primary="Hey, Iam Good! What about you ?"
                    ></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText align="left" secondary="09:31"></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem key="3">
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      align="right"
                      primary="Cool. i am good, let's catch up!"
                    ></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText
                      align="right"
                      secondary="10:30"
                    ></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
            <Divider />
            <Grid container>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                />
              </Grid>
              <Grid xs={1} align="right">
                <Fab color="secondary" aria-label="add">
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Chat;
