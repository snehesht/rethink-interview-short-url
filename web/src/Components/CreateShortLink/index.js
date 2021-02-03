import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    // marginTop: theme.spacing(10),
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
    minWidth: 560,
  },
  insertLinkIcon: {
    marginLeft: theme.spacing(2),
  },
  sendIcon: {
    marginLeft: theme.spacing(2),
  },
  createBtn: {
    marginLeft: theme.spacing(2),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
  }
}));

const CreateShortLink = ({ link, handleChange, submitLink, createNewLink }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} direction="row" justify="center" alignItems="center">
      <Paper component="form" className={classes.root}>
        <InsertLinkIcon className={classes.insertLinkIcon} />
        <InputBase
          className={classes.input}
          placeholder="Paste URL to shortify"
          inputProps={{ 'aria-label': 'paste url to shortify' }}
          onChange={handleChange}
          value={link}
          fullWidth
        />
      </Paper>
      <Button variant="contained" color="primary" disableElevation onClick={() => submitLink(link)} className={classes.createBtn} endIcon={<SendIcon />}> CREATE </Button>
      {/* <Button variant="contained" color="primary" disableElevation onClick={() => createNewLink()} className={classes.createBtn} endIcon={<AddIcon />}> New </Button> */}
    </Grid>
  );
}

export default CreateShortLink;