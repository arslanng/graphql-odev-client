import { Col, Row } from "antd";
import styles from "./styles.module.css";
import Home from "pages/Home";
import { Routes, Route } from "react-router-dom";
import Event from "pages/Event";
import NewEvent from "pages/NewEvent";

function App() {
  return (
    <div className={styles.container}>
      <Row justify="center">
        <Col span={14} className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events/:id" element={<Event />} />
            <Route path="/addEvent" element={<NewEvent />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
}

export default App;
