"use client";
import React, { use, useEffect } from "react";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Upload } from "antd";
import Glassmorphism from "@/components/common/glassmorphism";
import UserService from "@/services/user";
import { useForm } from "antd/es/form/Form";
import getBase64 from "@/utils/getBase64";
import { useRouter } from "next/navigation";
import CommonServices from "@/services/common";
import { BRANCHES } from "@/constants/branches";
import { YEARS } from "@/constants/years";

const UserDashboardProfileUpdate = () => {
  const router = useRouter();
  const [form] = useForm();
  const [pictureData, setPictureData] = useState();
  const [data, setData] = useState({
    profilePicture: null,
    name: "",
    email: "",
    branch: "",
    year: "",
    rollno: "",
    // links: [],
  });

  const handleProfilePictureChange = (info) => {
    getBase64(info.file.originFileObj, (data) => setPictureData(data));
  };

  useEffect(() => {
    UserService.getProfileDetails(
      (details) => {
        details.profilePicture && setPictureData(details.profilePicture);
        setData(details);
        form.setFieldsValue(details);
      },
      (message) => {
        showMessage.error(message);
      }
    );
  }, []);

  const handleSubmit = (fields) => {
    if (fields.profilePicture.file) {
      fields.profilePicture = fields.profilePicture.file.originFileObj;
    } else {
      delete fields.profilePicture;
    }
    console.log(fields);
    UserService.updateProfileDetails(
      fields,
      (message) => {
        CommonServices.getProfileStatus(
          (message) => {
            router.replace("/dashboard");
          },
          (message) => {}
        );
      },
      (message) => {
        showMessage.error(message);
      }
    );
  };

  return (
    <Glassmorphism>
      <div className="flex justify-center items-center">
        <div className="max-w-4xl w-full px-8 py-6">
          <h2 className="text-3xl font-bold text-center mb-5">
            Profile Update
          </h2>
          <Form
            layout="vertical"
            size="large"
            form={form}
            initialValues={data ?? {}}
            onFinish={handleSubmit}
          >
            <Row gutter={[32]} align="middle">
              <Col span={24} md={{ span: 8 }}>
                <div className="text-center">
                  <Form.Item
                    className="!mb-0"
                    name="profilePicture"
                    valuePropName="file"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Profile Picture",
                      },
                    ]}
                  >
                    <Upload
                      listType="picture-card"
                      accept="image/png, image/jpeg, image/jpg"
                      className="!w-[124px] !h-[124px] overflow-hidden"
                      customRequest={() => {}}
                      showUploadList={false}
                      multiple={false}
                      onChange={handleProfilePictureChange}
                    >
                      {pictureData ? (
                        <div className="w-full h-full relative">
                          <img
                            src={pictureData}
                            alt="Profile Picture"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center opacity-0 text-white bg-black bg-opacity-50 hover:opacity-100">
                            <PlusOutlined />
                            <div className="mt-3">Upload</div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center">
                          <PlusOutlined />
                          <div className="mt-3">Upload</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                </div>
              </Col>
              <Col span={24} md={{ span: 16 }}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[32]}>
              <Col span={24} md={{ span: 8 }}>
                <Form.Item
                  name="rollno"
                  label="Roll no"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 8 }}>
                <Form.Item
                  name="branch"
                  label="Branch"
                  rules={[{ required: true }]}
                >
                  <Select options={BRANCHES} />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 8 }}>
                <Form.Item
                  name="year"
                  label="Year"
                  rules={[{ required: true }]}
                >
                  <Select options={YEARS} />
                </Form.Item>
              </Col>
            </Row>
            {data?.isMember && (
              <>
                <Form.List name="links">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <Row key={field.key} gutter={[32]} align="middle" className="mb-6">
                          <Col span={24} md={{ span: 16 }} lg={{ span: 20 }}>
                            <Form.Item
                              {...field}
                              className="flex-1 !mb-2"
                              label="Enter Url"
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={24} md={{ span: 8 }} lg={{ span: 4 }}>
                            <Row className="w-full gap-5">
                              <Col span={12} flex={1}>
                                <Button
                                  className="!w-full mt-5 !bg-transparent"
                                  icon={
                                    <CloseOutlined className="!text-red-500" />
                                  }
                                  onClick={() => {
                                    remove(field.name);
                                  }}
                                />
                              </Col>
                              <Col span={12} flex={1}>
                                <Button
                                  className="!w-full mt-5 !bg-transparent"
                                  icon={
                                    <PlusOutlined className="!text-primary" />
                                  }
                                  onClick={() => {
                                    add(null, field.name + 1);
                                  }}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      ))}
                      {fields.length === 0 && (
                        <Button
                          className="w-full !bg-transparent mb-6"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            add();
                          }}
                        >
                          Add Link
                        </Button>
                      )}
                    </>
                  )}
                </Form.List>
              </>
            )}

            <div className="text-center">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full md:w-56"
              >
                Save
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Glassmorphism>
  );
};

export default UserDashboardProfileUpdate;
