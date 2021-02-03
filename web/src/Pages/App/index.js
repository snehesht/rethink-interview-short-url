import React from 'react';
import superagent from 'superagent';
import copy from 'copy-to-clipboard';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { isURL } from 'validator'
import CreateShortLink from '../../Components/CreateShortLink';

let apiEndpoint = '/api/v1/link';
if (process.env.NODE_ENV !== 'production') {
  apiEndpoint = 'http://localhost:8000/api/v1/link'
} else {
  apiEndpoint = `${window.location.protocol}//${window.location.host}/api/v1/link`
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(10),
  },
  paper: {
    padding: theme.spacing(20),
    textAlign: 'center',
  },
  paperTitle: {
    paddingTop: theme.spacing(2),
  },
  books: {
    magrinTop: theme.spacing(5),
  }
}));

export default function App() {
  const classes = useStyles();
  const [shortUrl, setShortUrl] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [link, setLink] = React.useState('');

  const createShortLink = async (link) => {
    if (!isURL(link)) {
      setErrorMessage('Entered link is not valid')
    } else {
      setErrorMessage('')
      superagent
        .post(apiEndpoint)
        .send({ link })
        .then(response => response.body)
        .then(data => {
          console.log(data, data.shortUrl)
          setShortUrl(data.shortUrl);
          copy(data.shortUrl);
        })
        .catch(error => {
          if (error.response && error.response.message) {
            setErrorMessage(error.response.message);
          } else {
            setErrorMessage('Failed to create short URL');
          }
        })
    }
  };

  const createNewLink = () => {
    setLink('');
    setShortUrl('');
    setErrorMessage('');
  }

  const renderAlert = () => {
    if (errorMessage) {
      return (<Alert severity="error" onClose={() => {
        setErrorMessage('')
      }}>{errorMessage}</Alert>)
    } else if (shortUrl) {
      return (<Alert severity="success" onClose={() => {
        setLink('');
        setShortUrl('');
        setErrorMessage('');
      }}><strong>{shortUrl}</strong>  Copied to clipboard</Alert>)
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Paper variant="outlined" square className={classes.paper}>
          <Grid container spacing={6} direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
              <Typography align="center" variant="h4" className={classes.paperTitle}>SHORTIFY</Typography>
              <Typography align="center" variant="subtitle1">Create a short link</Typography>
            </Grid>
            <Grid item xs={12}>
              <CreateShortLink link={link} handleChange={(event) => { setLink(event.target.value) }} submitLink={createShortLink} createNewLink={createNewLink} /> 
            </Grid>
            <Grid item xs={12}>
              {renderAlert()}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
