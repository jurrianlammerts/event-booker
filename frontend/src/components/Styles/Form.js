import styled from 'styled-components';

const Form = styled.form`
  width: 25rem;
  max-width: 80%;
  margin: 1rem auto;

  .form-control {
    margin-bottom: 1rem;
    label {
      margin-bottom: 0.5rem;
    }
    label,
    input,
    textarea {
      width: 100%;
      display: block;
    }
  }
`;

export default Form;
