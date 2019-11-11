import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../components/Styles/Button';

function Auth() {
  // const [state, setstate] = useState(initialState);
  return (
    <Form>
      <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <div className="form-actions">
        <Button>Switch to sign up</Button>
        <Button type="submit">Sign in</Button>
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
