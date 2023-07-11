import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_USERS, ALL_LOCATIONS, ADD_NEW_EVENT } from "./queries";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, Select, Col, Row, message } from "antd";

const { Option } = Select;

function NewEvent() {
  const navigate = useNavigate();

  const { loading: user_loading, data: user_data } = useQuery(ALL_USERS);
  const { loading: location_loading, data: location_data } =
    useQuery(ALL_LOCATIONS);
  const [addEvent, { loading, error }] = useMutation(ADD_NEW_EVENT);

  const handleSubmit = async (values) => {
    try {
      await addEvent({
        variables: {
          data: values,
        },
      });
      message.success("Post saved", [4]);
      navigate("/");
    } catch (e) {
      message.error(`Post not saved!. Error: ${error.message}`, [10]);
    }
  };

  return (
    <div>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <Divider>{"Add Event"}</Divider>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              // label="Username"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input size="large" placeholder="Title" disabled={loading} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="desc"
              rules={[
                {
                  required: true,
                  message: "Please input event description!",
                },
              ]}
            >
              <Input.TextArea
                size="large"
                placeholder="Description"
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please select input date!",
                },
              ]}
            >
              <Input size="large" placeholder="Date" disabled={loading} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="from"
              rules={[
                {
                  required: true,
                  message: "Please enter the start time",
                },
              ]}
            >
              <Input size="large" placeholder="From" disabled={loading} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="to"
              rules={[
                {
                  required: true,
                  message: "Please enter the end time",
                },
              ]}
            >
              <Input size="large" placeholder="To" disabled={loading} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="user_id"
              rules={[
                {
                  required: true,
                  message: "Please select user!",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Select user"
                disabled={user_loading || loading}
              >
                {user_data &&
                  user_data.users.map((user) => (
                    <Option value={user.id} key={user.id}>
                      {user.username}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="location_id"
              rules={[
                {
                  required: true,
                  message: "Please select location!",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Select location"
                disabled={location_loading || loading}
              >
                {location_data &&
                  location_data.locations.map((loc) => (
                    <Option value={loc.id} key={loc.id}>
                      {loc.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={5} offset={19}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default NewEvent;
