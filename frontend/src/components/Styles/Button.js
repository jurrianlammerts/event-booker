import styled from 'styled-components';

const Button = styled.button`
  background: #333;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
  margin-right: 1rem;
  padding: 0.25rem 1rem;
  cursor: pointer;
  :hover,
  :active {
    background: #111;
  }
`;

export default Button;
