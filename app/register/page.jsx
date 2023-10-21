"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import RegistrationDetailsInput from "@/components/register/registrationDetailsInput";
import RegistrationDetailsVerificationInput from "@/components/register/registrationDetailsVerificationInput";
import UserService from "@/services/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MailOutlined } from "@ant-design/icons";

const RegistrationPage = () => {
  const [form] = useForm();
  const [step, setStep] = useState(0);

  const onFormSubmit = (fields) => {
    const { email } = fields;
    UserService.getVerificationMail(
      { email },
      (message) => {
        alert(message);
      },
      (message) => {
        alert(message);
      }
    );
  };

  return (
    <div className="h-[calc(100vh-86px-40px)] flex justify-center items-center">
      <Glassmorphism className="px-8 py-8 lg:w-1/3">
        <Form
          form={form}
          layout="vertical"
          size="large"
          requiredMark={false}
          onFinish={onFormSubmit}
        >
          <h2 className="text-center font-bold text-4xl mb-6">Registration</h2>
          <p className="text-center my-5">
            A verification email will be sent on your email address to complete your registration
          </p>
          <Form.Item
            name="email"
            label="Email Address:"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) return Promise.reject("Email required");
                  if (!value.endsWith("@mhssce.ac.in"))
                    return Promise.reject(
                      "Please enter a valid college domain email"
                    );
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              placeholder="Student Email address (@mhssce.ac.in)"
              prefix={<MailOutlined />}
              size="large"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Get Verification Email
          </Button>
          <p className="text-center my-3">
            Already have an account ? <Link href="/login">Login</Link>
          </p>
        </Form>
      </Glassmorphism>
    </div>
  );
};

export default RegistrationPage;
