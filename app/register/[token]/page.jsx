"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import { Button, Form, Input, message as showMessage } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import UserService from "@/services/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockOutlined } from "@ant-design/icons";

const RegistrationFinishPage = ({ params: { token } }) => {
  const router = useRouter();
  const [form] = useForm();
  const [details, setDetails] = useState({});

  const onFormSubmit = (fields) => {
    const { password } = fields;
    UserService.registerUser(
      { password, token },
      (message) => {
        router.replace("/dashboard");
      },
      (message) => {
        showMessage.error(message);
      }
    );
  };

  return (
    <div className="h-[calc(100vh-64px-40px)] flex justify-center items-center">
      <Glassmorphism className="px-8 py-8 lg:w-1/3">
        <Form
          form={form}
          layout="vertical"
          size="large"
          requiredMark={false}
          onFinish={onFormSubmit}
        >
          <h2 className="text-center font-bold text-4xl mb-6">
            Set Password
          </h2>
          <Form.Item name="password" label="Password:">
            <Input.Password
              placeholder="Enter Password"
              prefix={<LockOutlined />}
              size="large"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Complete Registration
          </Button>
          <p className="text-center my-3">
            <Link href="/register">Back to registration</Link>
          </p>
        </Form>
      </Glassmorphism>
    </div>
  );
};

export default RegistrationFinishPage;
