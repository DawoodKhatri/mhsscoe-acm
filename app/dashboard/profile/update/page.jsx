"use client";
import React, { use } from "react";
import { useState } from "react";
import { Form, Input, Button, Space, Select, Row, Col } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { Typography } from "antd";
const { Title } = Typography;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UserDashboardProfileUpdate = () => {
  const [pictureData, setPictureData] = useState();
  const [data, setData] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
    rollno: "",
    linkedin: "",
    github: "",
  });

  const handleChange = (info) => {
    getBase64(info.file.originFileObj, (data) => setPictureData(data));
    console.log(info);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-4xl w-full px-8 py-6">
        <h2 className="text-3xl font-bold text-center mb-5">Profile Update</h2>
        <Form layout="vertical" size="large">
          <Row gutter={[32]} align="middle">
            <Col span={24} md={{ span: 8 }}>
              <div className="text-center">
                <Upload
                  listType="picture-card"
                  accept="image/png, image/jpeg, image/jpg"
                  className="!w-[124px] !h-[124px] overflow-hidden"
                  showUploadList={false}
                  onChange={handleChange}
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
              </div>
            </Col>
            <Col span={24} md={{ span: 16 }}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
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
                name="age"
                label="Roll no"
                rules={[{ required: true }]}
              >
                <Input
                  onChange={(e) => {
                    setData({ ...data, rollno: e.target.value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }}>
              <Form.Item
                name="Branch"
                label="Branch"
                rules={[{ required: true }]}
              >
                <Select
                  defaultValue="IT"
                  options={[
                    { value: "IT", label: "Information Technology" },
                    { value: "MECH", label: "MECH" },
                    { value: "COMPS", label: "COMPS" },
                    { value: "COMPS-AI", label: "COMPS-AI" },
                    { value: "EXTC", label: "EXTC" },
                    { value: "CIVIL", label: "CIVIL" },
                    { value: "AUTO", label: "AUTO" },
                  ]}
                  onChange={(value) => {
                    setData({ ...data, branch: value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }}>
              <Form.Item name="Year" label="Year" rules={[{ required: true }]}>
                <Select
                  defaultValue="I"
                  options={[
                    { value: "I", label: "I" },
                    { value: "II", label: "II" },
                    { value: "III", label: "III" },
                    { value: "IV", label: "IV" },
                  ]}
                  onChange={(value) => {
                    setData({ ...data, year: value });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[32]}>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item name="LinkedIn" label="LinkedIn Profile URL">
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
          <div className="text-center">
            <Button type="primary" className="w-full md:w-56">Save</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserDashboardProfileUpdate;
