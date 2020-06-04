import withRoot from '../withRoot';

import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../components/Typography';
import MainFooter from '../views/MainFooter';
import MainNav from '../views/MainNav';
import AppForm from '../views/AppForm';
import { email, required } from '../form/validation';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import FormFeedback from '../form/FormFeedback';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

function SignUp() {
  const classes = useStyles();
  const { login } = useContext(AuthContext);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const validate = (values) => {
    const errors = required(
      ['firstName', 'lastName', 'email', 'password'],
      values,
    );

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const onSubmit = (values) => {
    setSent(true);

    const requestBody = {
      query: `
          mutation {
            createUser(userInput: {email: "${values.email}", password: "${values.password}"}) {
              _id
              email
            }
          }
        `,
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          setSent(false);
          setError('Server error: ', res.status);
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((res) => {
        if (res.errors) {
          setError(res.errors[0].message);
          setSent(false);
          return;
        }
        if (res.data && res.data.createUser.email) {
          const requestBodyLogin = {
            query: `
              query {
                login(email: "${values.email}", password: "${values.password}") {
                  userId
                  token
                  tokenExpiration
                }
              }
            `,
          };

          fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBodyLogin),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {
              if (res.status !== 200 && res.status !== 201) {
                setSent(false);
                setError('Server error: ', res.status);
                throw new Error('Failed!');
              }
              return res.json();
            })
            .then(
              ({
                data,
                data: {
                  login: { token, userId, tokenExpiration },
                },
              }) => {
                if (data && token) {
                  login(token, userId, tokenExpiration);
                }
              },
            )
            .catch((err) => {
              setSent(false);
              setError('Error: ', err);
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <MainNav />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/signin/" underline="always">
              Already have an account?
            </Link>
          </Typography>
          {error && (
            <FormFeedback className={classes.feedback} error>
              {error}
            </FormFeedback>
          )}
        </React.Fragment>
        <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    autoComplete="fname"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    autoComplete="lname"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback className={classes.feedback} error>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                className={classes.button}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
      <MainFooter />
    </React.Fragment>
  );
}

export default withRoot(SignUp);
