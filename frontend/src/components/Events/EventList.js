import React from "react";
import styled from "styled-components";
import EventItem from "./EventItem";

function EventList({ events, currentUserId, showDetails }) {
  return (
    <List>
      {events.map(event => (
        <EventItem
          key={event._id}
          event={event}
          userId={currentUserId}
          showMore={showDetails}
        />
      ))}
    </List>
  );
}

export default EventList;

const List = styled.ul`
  width: 40rem;
  max-width: 90%;
  margin: 2rem auto;
  list-style: none;
  padding: 0;
`;
