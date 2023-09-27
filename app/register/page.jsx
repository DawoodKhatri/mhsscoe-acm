"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import { Button, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import RegistrationDetailsInput from "@/components/register/registrationDetailsInput";
import RegistrationDetailsVerificationInput from "@/components/register/registrationDetailsVerificationInput";
import UserService from "@/services/user";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
  const router = useRouter();
  const [form] = useForm();
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState({});
  const [resendVerificationTimer, setResendVerificationTimer] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (resendVerificationTimer > 0) {
        setResendVerificationTimer(resendVerificationTimer - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendVerificationTimer]);

  const onFormSubmit = (fields) => {
    if (step === 0) {
      setDetails({
        email: fields.email,
        password: fields.password,
      });
      getVerificationMail(fields.email);
    }

    if (step === 1) {
      registerUser({ ...details, otp: fields.otp });
    }
  };

  const getVerificationMail = (email) => {
    UserService.getVerificationMail(
      { email },
      (message) => {
        setStep(1);
        setResendVerificationTimer(59);
        alert(message);
      },
      (message) => {
        alert(message);
      }
    );
  };

  const changeEmail = () => {
    setStep(0);
    setResendVerificationTimer(0);
  };

  const registerUser = (userDetails) => {
    const { email, password, otp } = userDetails;
    UserService.registerUser(
      { email, password, otp },
      (message) => {
        setResendVerificationTimer(0);
        router.replace("/dashboard");
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
          {step === 0 ? (
            <RegistrationDetailsInput />
          ) : (
            <RegistrationDetailsVerificationInput
              email={details.email}
              resendVerificationTimer={resendVerificationTimer}
              onChangeEmail={changeEmail}
              onResendOTP={getVerificationMail}
            />
          )}

          <Button type="primary" htmlType="submit" block>
            {step === 0 ? "Get Verification Email" : "Complete Registration"}
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
