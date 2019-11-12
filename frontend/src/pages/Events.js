import React, { useState, useRef, useContext, useEffect } from "react";
import styled from "styled-components";

import Button from "../components/Styles/Button";
import Modal from "../components/Modal";
import Backdrop from "../components/Backdrop";
import Form from "../components/Styles/Form";
import AuthContext from "../context/AuthContext";
import EventList from "../components/Events/EventList";
import Spinner from "../components/Spinner";

function Events() {
  const [creating, setCreating] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleInput = useRef(null);
  const priceInput = useRef(null);
  const dateInput = useRef(null);
  const descriptionInput = useRef(null);
  const { token, userId } = useContext(AuthContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const startCreateEventHandler = () => {
    setCreating(true);
  };

  const modalCancelHandler = () => {
    setCreating(false);
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
            }
          }
        `
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(
        ({
          data: {
            createEvent: { _id, title, description, date, price }
          }
        }) => {
          setEvents([
            {
              _id,
              title,
              description,
              date,
              price,
              creator: {
                _id: userId
              }
            },
            ...events
          ]);
        }
      )
      .catch(err => {
        console.log(err);
      });
  };

  const fetchEvents = () => {
    const requestBody = {
      query: `
          query {
            events {
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

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(({ data }) => {
        setLoading(false);
        setEvents(data.events);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <StyledPage>
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
      {token && (
        <div className="container">
          <p>Share your own events here!</p>
          <Button onClick={startCreateEventHandler}>Create event</Button>
        </div>
      )}
      {loading ? (
        <div className="centered">
          <Spinner />
        </div>
      ) : (
        <EventList currentUserId={userId} events={events} />
      )}
    </StyledPage>
  );
}

export default Events;

const StyledPage = styled.div`
  .container {
    text-align: center;
    border: 1px solid #333;
    padding: 1rem;
    margin: 2rem auto;
    width: 30rem;
    max-width: 80%;
  }
  .centered {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
