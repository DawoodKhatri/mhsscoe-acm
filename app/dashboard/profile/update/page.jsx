"use client";
import React, { use, useEffect } from "react";
import { useState } from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { Typography } from "antd";
import Glassmorphism from "@/components/common/glassmorphism";
import UserService from "@/services/user";
import { useForm } from "antd/es/form/Form";
import getBase64 from "@/utils/getBase64";
import { useRouter } from "next/navigation";
import CommonServices from "@/services/common";

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
    linkedin: "",
    github: "",
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
        alert(message);
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
            alert(message);
            router.replace("/dashboard");
          },
          (message) => {}
        );
      },
      (message) => {
        alert(message);
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
                  <Input
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                  />
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
                  <Input
                    disabled
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                  />
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
                  <Input
                    disabled
                    onChange={(e) => {
                      setData({ ...data, rollno: e.target.value });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 8 }}>
                <Form.Item
                  name="branch"
                  label="Branch"
                  rules={[{ required: true }]}
                >
                  <Select
                    disabled
                    options={[
                      { value: "it", label: "Information Technology" },
                      { value: "MECH", label: "Computer Science" },
                      { value: "COMPS", label: "CSE - AI & ML" },
                      { value: "COMPS-AI", label: "CSE - Blockchain & IOT" },
                      {
                        value: "EXTC",
                        label: "Electronics & Telecommunication",
                      },
                      { value: "AUTO", label: "Mechanical" },
                      { value: "CIVIL", label: "Civil" },
                    ]}
                    onChange={(value) => {
                      setData({ ...data, branch: value });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 8 }}>
                <Form.Item
                  name="year"
                  label="Year"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={[
                      { value: 1, label: "F.E." },
                      { value: 2, label: "S.E." },
                      { value: 3, label: "T.E." },
                      { value: 4, label: "B.E." },
                    ]}
                    onChange={(value) => {
                      setData({ ...data, year: value });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            {data?.isMember && (
              <Row gutter={[32]}>
                <Col span={24} md={{ span: 12 }}>
                  <Form.Item name="linkedin" label="LinkedIn Profile URL">
                    <Input
                      onChange={(e) => {
                        setData({ ...data, linkedin: e.target.value });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }}>
                  <Form.Item name="github" label="Github Profile URL">
                    <Input
                      onChange={(e) => {
                        setData({ ...data, github: e.target.value });
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
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
