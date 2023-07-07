import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EVENT_DETAIL, EVENT_PARTICIPANT } from "./queries";
import { Button, Divider, Descriptions } from "antd";

function Event() {
  const { id } = useParams();

  const { loading, data, error, subscribeToMore } = useQuery(GET_EVENT_DETAIL, {
    variables: {
      eventId: id,
    },
  });

  useEffect(() => {
    subscribeToMore({
      document: EVENT_PARTICIPANT,
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev);
        if (!subscriptionData.data) return prev;

        return {
          event: {
            ...prev.event,
            participants: [
              ...prev.event.participants,
              subscriptionData.data.participantAdded,
            ],
          },
        };
      },
    });
  }, [subscribeToMore]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  const event = data.event;

  return (
    <div>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <Divider>{`Event ${event.id} Detail`}</Divider>
      <Descriptions bordered>
        <Descriptions.Item label="Title" span={6}>
          {event.title}
        </Descriptions.Item>
        <Descriptions.Item label="Date" span={6}>
          {event.date}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={6}>
          {event.desc}
        </Descriptions.Item>
        <Descriptions.Item label="Owner" span={2}>
          {event.user.username}
        </Descriptions.Item>
        <Descriptions.Item label="Location" span={2}>
          {event.location.name}
        </Descriptions.Item>
        <Descriptions.Item label="Location Desc." span={3}>
          {event.location.desc}
        </Descriptions.Item>
        {event.participants.length > 0 &&
          event.participants.map((item, i) => (
            <Descriptions.Item key={i} label={`Participant ${i + 1}`} span={2}>
              {item.username}
            </Descriptions.Item>
          ))}
      </Descriptions>
    </div>
  );
}

export default Event;
