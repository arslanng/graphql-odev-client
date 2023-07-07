import { useSubscription } from "@apollo/client";
import {
  EVENTS_ALL_SUBSCRIPTION,
} from "./queries";
import { List } from "antd";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

function Home() {
  const { loading, error, data } = useSubscription(EVENTS_ALL_SUBSCRIPTION);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log("data", data.eventsAll);

  return (
    <div>
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
