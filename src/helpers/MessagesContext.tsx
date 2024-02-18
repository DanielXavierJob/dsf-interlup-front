import { message } from "antd";
import React, { createContext } from "react";
import { MessageContextProps } from "../@types/message.type";

export const MessageContext = createContext<MessageContextProps>({
  success: (message: string) => {},
  error: (message: string) => {},
  warning: (message: string) => {},
});
const MessagesProvider = ({ children }: { children: React.ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = (message: string) => {
    messageApi.open({
      type: "success",
      content: message,
      key: `success-message-${message.replaceAll(" ", "-").slice(0, 10)}`,
    });
  };

  const error = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
      key: `error-message-${(message || "-")
        .replaceAll(" ", "-")
        .slice(0, 10)}`,
    });
  };

  const warning = (message: string) => {
    messageApi.open({
      type: "warning",
      content: message,
      key: `warning-message-${(message || "-")
        .replaceAll(" ", "-")
        .slice(0, 10)}`,
    });
  };
  return (
    <MessageContext.Provider
      value={{
        success,
        error,
        warning,
      }}
    >
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export default MessagesProvider;
