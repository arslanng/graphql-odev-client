import { useSubscription } from "@apollo/client";
import { EVENTS_ALL_SUBSCRIPTION } from "./queries";
import { List, Button, Divider } from "antd";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import bibipSfx from "../sound/bibip.mp3";
import { useEffect } from "react";

function Home() {
  const [play] = useSound(bibipSfx);

  const { loading, error, data } = useSubscription(EVENTS_ALL_SUBSCRIPTION);

  useEffect(() => {
    play();
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Link to="/addEvent">
        <Button>Add Event</Button>
      </Link>
      <Divider>{`Events`}</Divider>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={data.eventsAll}
        renderItem={(item) => (
          <Link to={`events/${item.id}`}>
            <List.Item className={styles.listItem}>
              <div className={styles.listTitle}>{item.title}</div>
              <List.Item.Meta description={item.desc} />
              <div className={styles.listDate}>{item.date}</div>
            </List.Item>
          </Link>
        )}
      />
    </div>
  );
}

export default Home;
