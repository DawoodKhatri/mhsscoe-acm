"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import { Button, Form, Input, message as showMessage } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserService from "@/services/user";

const LoginPage = () => {
  const [form] = useForm();
  const router = useRouter();

  const onFormSubmit = (fields) => {
    const { email, password } = fields;

    UserService.login(email, password)
      .then((message) => {
        showMessage.success(message);
        router.replace("/myaccount");
      })
      .catch((message) => showMessage.error(message));
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
          <h2 className="text-center font-bold text-4xl mb-6">Login</h2>
          <Form.Item
            name="email"
            label="Email Address:"
            rules={[{ required: true, message: "" }]}
          >
            <Input
              placeholder="Email address (@mhssce.ac.in)"
              prefix={<MailOutlined />}
              size="large"
            />
          </Form.Item>

          <Form.Item
            className="!mb-0"
            name="password"
            label="Password:"
            rules={[{ required: true, message: false }]}
          >
            <Input.Password
              placeholder="Enter Password"
              prefix={<LockOutlined />}
              size="large"
            />
          </Form.Item>
          <Link className="mb-6 float-right" href="/resetPassword">
            Forgot Password ?
          </Link>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
          <p className="text-center my-3">
            Don&apos;t have an account ?{" "}
            <Link href="/register">Register Now</Link>
          </p>
        </Form>
      </Glassmorphism>
    </div>
  );
};

export default LoginPage;
