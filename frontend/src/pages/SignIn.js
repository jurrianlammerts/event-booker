import withRoot from '../withRoot';

import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
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

function SignIn() {
  const classes = useStyles();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');

  const [sent, setSent] = useState(false);

  const validate = (values) => {
    const errors = required(['email', 'password'], values);

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

        if (res.data) {
          const {
            data: {
              login: { token, userId, tokenExpiration },
            },
          } = res;
          if (token) {
            login(token, userId, tokenExpiration);
          }
        }
      })
      .catch((err) => {
        setSent(false);
        setError('Error: ', err);
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <MainNav />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link href="/signup" align="center" underline="always">
              Sign Up here
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
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
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
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
            </form>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/forgot-password/">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <MainFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);
