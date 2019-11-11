import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';

import Button from '../components/Styles/Button';
import Modal from '../components/Modal';
import Backdrop from '../components/Backdrop';
import Form from '../components/Styles/Form';
import AuthContext from '../context/AuthContext';

function Events() {
  const [creating, setCreating] = useState(false);
  // const [events, setEvents] = useState([]);
  const titleInput = useRef(null);
  const priceInput = useRef(null);
  const dateInput = useRef(null);
  const descriptionInput = useRef(null);
  const { token } = useContext(AuthContext);

  const startCreateEventHandler = () => {
    setCreating(true);
  };

  const modalConfirmHandler = () => {
    setCreating(false);
    const title = titleInput.current.value;
    const price = +priceInput.current.value;
    const date = dateInput.current.value;
    const description = descriptionInput.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const event = { title, price, date, description };
    console.log(event);

    const requestBody = {
      query: `
          mutation {
            createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
              _id
              title
              description
              date
              price
              creator {
                _id
                email
              }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        // this.fetchEvents();
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const modalCancelHandler = () => {
    setCreating(false);
  };

  return (
    <>
      {creating && <Backdrop />}
      {creating && (
        <Modal
          title="Add Event"
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}
        >
          <Form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" ref={titleInput} />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" ref={priceInput} />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type="datetime-local" id="date" ref={dateInput} />
            </div>
            <div className="form-control">
              <label htmlFor="description">description</label>
              <textarea id="description" rows={4} ref={descriptionInput} />
            </div>
          </Form>
        </Modal>
      )}
      <Container>
        <p>Share your own events here!</p>
        <Button onClick={startCreateEventHandler}>Create event</Button>
      </Container>
    </>
  );
}

export default Events;

const Container = styled.div`
  text-align: center;
  border: 1px solid #333;
  padding: 1rem;
  margin: 2rem auto;
  width: 30rem;
  max-width: 80%;
`;
