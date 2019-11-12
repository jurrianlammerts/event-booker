import React from "react";
import styled from "styled-components";
import Button from "../Styles/Button";

function EventItem({ event: { title, description, creator }, userId }) {
  return (
    <Item>
      <h1>{title}</h1>
      <p>{description}</p>
      <small>{creator.email}</small>
      <div className="controls">
        {userId === creator._id ? (
          <p>This is your event</p>
        ) : (
          <Button>Details</Button>
        )}
      </div>
    </Item>
  );
}

export default EventItem;

const Item = styled.li`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #333;
  h1 {
    color: #333;
  }
  .controls {
    display: flex;
    justify-content: flex-end;
  }
`;
