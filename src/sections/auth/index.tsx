import { useContext, useState } from "react";
import "./Auth.css";
import { Button, Form, Image, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { AuthenticationContext } from "../../helpers/AuthenticationContext";

const AuthSection = () => {
  const { login, register } = useContext(AuthenticationContext);
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-columnBackgroundColor  max-w-md mx-auto p-8 rounded-lg shadow-md flex flex-col justify-center items-center">
        <Image
          alt="Logo"
          src="/logo.png"
          width={250}
          className="ml-auto mr-auto"
          preview={false}
        />
        <Form
          layout={"vertical"}
          form={form}
          className={`mt-5 w-80 `}
          onFinish={async (values: { username: string; password: string }) => {
            setLoading(true);
            if(isRegister){
                await register(values.username, values.password);
                setIsRegister(false);
            }else{
                await login(values.username, values.password);
            }
            setLoading(false);

          }}
        >
          <Form.Item
            label={<Typography className="text-white">Login</Typography>}
            required
            name={"username"}
            tooltip={isRegister ? "This field is your login" : undefined}
          >
            <Input
              className="w-full bg-gray-200 mb-4 px-4 py-3 rounded-lg outline-none"
              type="text"
              placeholder="Your username here..."
            />
          </Form.Item>
          <Form.Item
            label={<Typography className="text-white">Password</Typography>}
            required
            name={"password"}
            tooltip={
              isRegister
                ? "Password must be at least 6 characters long"
                : undefined
            }
            rules={[
              {
                min: 6,
                max: 50,
                message: "Password must be at least 6 characters long",
              },
            ]}
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone
                    style={{
                      fontSize: "20px",
                    }}
                    twoToneColor="rgb(244 63 94 / 1)"
                  />
                ) : (
                  <EyeInvisibleOutlined
                    style={{
                      fontSize: "20px",
                    }}
                  />
                )
              }
              className="w-full bg-gray-200 mb-4 px-4 py-3 rounded-lg outline-none"
              type="password"
              placeholder="Your password here..."
            />
          </Form.Item>
          <Button
            size="large"
            htmlType="submit"
            type="text"
            className="w-full bg-rose-500 rounded-lg text-sm uppercase font-medium transition duration-300"
            loading={loading}
          >
            {isRegister ? "Create" : "Login"}
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            {isRegister ? (
              <>
                Already registered?{" "}
                <Button
                  type="link"
                  className="text-xs text-rose-500 hover:text-rose-800  ml-[-10px]"
                  onClick={() => setIsRegister(false)}
                >
                  Sign In
                </Button>
              </>
            ) : (
              <>
                Not registered?{" "}
                <Button
                  type="link"
                  className="text-xs text-rose-500 hover:text-rose-800 ml-[-10px]"
                  onClick={() => setIsRegister(true)}
                >
                  Create an account
                </Button>
              </>
            )}
          </p>
        </Form>
      </div>
    </div>
  );
};

export default AuthSection;
