import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';

import AuthContext from '../context/AuthContext';
import Button from '../components/Styles/Button';

function Auth() {
  const { login } = useContext(AuthContext);
  const [loginPage, setLoginPage] = useState(true);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const submitHandler = e => {
    e.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!loginPage) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(
        ({
          data,
          data: {
            login: { token, userId, tokenExpiration }
          }
        }) => {
          console.log(data);
          if (data && token) {
            login(token, userId, tokenExpiration);
          }
        }
      )
      .catch(err => {
        console.log(err);
      });
  };

  const switchModeHandler = () => {
    setLoginPage(!loginPage);
  };

  return (
    <Form onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" ref={emailInput} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordInput} />
      </div>
      <div className="form-actions">
        <Button type="submit">{!loginPage ? 'Register' : 'Login'}</Button>
        <Button type="button" onClick={switchModeHandler}>
          Switch to {loginPage ? 'Register' : 'Login'}
        </Button>
      </div>
    </Form>
  );
}

export default Auth;

const Form = styled.form`
  width: 25rem;
  max-width: 80%;
  margin: 5rem auto;

  .form-control {
    margin-bottom: 1rem;
  }

  .form-control label {
    margin-bottom: 0.5rem;
  }

  .form-control label,
  .form-control input {
    width: 100%;
    display: block;
  }
`;
