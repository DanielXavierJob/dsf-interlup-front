import { LogoutOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Menu, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useContext } from "react";
import { AuthenticationContext } from "../../helpers/AuthenticationContext";

const LayoutSection = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useContext(AuthenticationContext);
  return (
    <Layout style={{ background: "transparent" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <Row justify="end" align="middle">
          <Col>
            <Button
              type="text"
              icon={<LogoutOutlined style={{ fontSize: "20px" }} onClick={() => logout()} />}
            />
          </Col>
        </Row>
      </Header>
      <Content style={{ background: "transparent" }}>{children}</Content>
    </Layout>
  );
};

export default LayoutSection;
