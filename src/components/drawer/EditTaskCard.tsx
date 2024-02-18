import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Dropdown,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { KanbanContext } from "../../helpers/KanbanContext";
import { CloseOutlined, MoreOutlined, SaveOutlined } from "@ant-design/icons";

const EditTaskCard = () => {
  const {
    columns,
    closeDrawerEdit,
    openDrawerEditTask,
    activeTaskEdit,
    updateTask,
    createTask,
    deleteTask,
  } = useContext(KanbanContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (form.getFieldInstance("title")) {
      form.setFieldsValue(activeTaskEdit);
    }
  }, [form, activeTaskEdit]);

  return (
    <Drawer
      placement="right"
      size="large"
      onClose={closeDrawerEdit}
      open={openDrawerEditTask}
      closeIcon={<CloseOutlined style={{ color: "#fff" }} />}
      classNames={{
        body: "bg-columnBackgroundColor",
        header: "bg-columnBackgroundColor",
      }}
      destroyOnClose
      className="rounded-md flex flex-col"
      title={
        <Typography style={{ color: "#fff", fontSize: "15pt" }}>
          #{activeTaskEdit?.id} {activeTaskEdit?.title}
        </Typography>
      }
      styles={{
        content: {
          background: "transparent",
        },
      }}
      extra={
        <Space style={{ width: "100%" }}>
          <Dropdown
            placement="bottomRight"
            arrow
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <Button
                      type="text"
                      onClick={() => deleteTask(activeTaskEdit?.id ?? 0)}
                      className="text-black hover:text-white"
                    >
                      Remove Task
                    </Button>
                  ),
                  danger: true,
                },
              ],
            }}
          >
            <Button icon={<MoreOutlined />} type="text" />
          </Dropdown>
          <Button
            size={"large"}
            type="text"
            onClick={() => form.submit()}
            loading={loading}
            className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:text-rose-500"
            icon={<SaveOutlined />}
          >
            Save
          </Button>
        </Space>
      }
    >
      <Form
        layout={"vertical"}
        form={form}
        initialValues={{ ...activeTaskEdit }}
        onFinish={async (values) => {
          setLoading(true);
          if (activeTaskEdit) {
            if (activeTaskEdit.id === 0) {
              await createTask({
                title: values.title,
                description: values.description,
                category_id: values.category_id,
                order: activeTaskEdit.order,
              });
            } else {
              await updateTask(activeTaskEdit.id, values, true);
            }
            setLoading(false);
          }
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              label={<Typography className="text-white">Title:</Typography>}
              name={"title"}
              required
            >
              <Input placeholder="Your title here..." size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label={<Typography className="text-white">Status:</Typography>}
              name="category_id"
              required
            >
              <Select
                size="large"
                style={{ width: "100%" }}
                options={columns.map((col) => ({
                  value: col.id,
                  label: col.title,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item
              label={
                <Typography className="text-white">Description:</Typography>
              }
              name={"description"}
            >
              <Input.TextArea
                placeholder="Your description here..."
                style={{ height: 120 }}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default EditTaskCard;
