import React from 'react';
import styled from 'styled-components';

import Button from '../components/Styles/Button';

function Modal({
  title,
  children,
  canCancel,
  canConfirm,
  onCancel,
  onConfirm
}) {
  return (
    <Container>
      <div className="modal">
        <header>
          <h1>{title}</h1>
        </header>
        <section className="content">{children}</section>
        <section className="actions">
          {canCancel && <Button onClick={onCancel}>Cancel</Button>}
          {canConfirm && <Button onClick={onConfirm}>Confirm</Button>}
        </section>
      </div>
    </Container>
  );
}

export default Modal;

const Container = styled.div`
  width: 90%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  top: 20vh;
  position: fixed;
  left: 5%;

  h1 {
    margin: 0;
    font-size: 1.25rem;
  }

  header {
    padding: 1rem;
    background: #333;
    color: #fff;
  }

  .content {
    padding: 1rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
  }

  @media (min-width: 768px) {
    width: 30rem;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
