import React from "react";
import styled from "styled-components";
import Button from "../Styles/Button";
// import Modal from "../Modal";

function EventItem({
  event: { _id, title, description, price, date, creator },
  userId,
  showMore
}) {
  return (
    <Item>
      <h2>{title}</h2>
      <p>${price}</p>
      <small>{new Date(date).toLocaleDateString()}</small>
      <div className="controls">
        {userId === creator._id ? (
          <p>This is your event</p>
        ) : (
          <Button onClick={() => showMore(_id)}>Details</Button>
        )}
      </div>
    </Item>
  );
}

export default EventItem;

const Item = styled.li`
  margin: 1rem 0;
  padding: 0 1rem;
  border: 1px solid #333;
  h1 {
    color: #333;
  }
  .controls {
    padding: 0.5rem;
    display: flex;
    justify-content: flex-end;
  }
`;
