"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";
import { PlusOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { BRANCHES } from "@/constants/branches";
import { YEARS } from "@/constants/years";
import ImageEditor from "../common/imageEditor";

const UserProfileUpdateForm = ({ userDetails, updateUserDetails }) => {
  const [form] = useForm();
  const [pictureData, setPictureData] = useState({ file: null, url: null });
  const [isEditorOpen, setEditorOpen] = useState(false);

  const resetPicture = () => {
    setPictureData({
      url: userDetails?.profilePicture
        ? `/api/file/${userDetails?.profilePicture}`
        : null,
      file: null,
    });
    form.setFieldValue("profilePicture", 0);
  };

  const changePicture = (newPicture) => {
    setPictureData({
      file: newPicture,
      url: URL.createObjectURL(newPicture),
    });
    form.setFieldValue("profilePicture", newPicture);
    setEditorOpen(false);
  };

  useEffect(() => {
    if (userDetails) {
      const { profilePicture, ...details } = userDetails;
      setPictureData({
        url: profilePicture ? `/api/file/${profilePicture}` : null,
        file: null,
      });
      form.setFieldsValue({ ...details, profilePicture: 0 });
    } else {
      setPictureData({ file: null, url: null });
      form.resetFields();
    }
  }, [userDetails]);

  const handleSubmit = (fields) => {
    if (!fields.profilePicture) {
      delete fields.profilePicture;
    }

    updateUserDetails(fields);
  };

  return (
    <div className="h-full flex justify-center items-center p-5">
      <Form
        className="max-w-4xl w-full"
        layout="vertical"
        size="large"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <Row gutter={[32]} align="middle">
          <Col span={24} md={{ span: 8 }}>
            <div className="text-center">
              <Form.Item
                className="!hidden !w-0 !h-0 !mb-0"
                name="profilePicture"
                rules={[
                  {
                    required: true,
                    message: "Please Select Profile Picture",
                  },
                ]}
              >
                <Input className="!hidden !w-0 !h-0" />
              </Form.Item>
              {isEditorOpen && (
                <ImageEditor
                  originalImageUrl={pictureData.url}
                  closeEditor={() => setEditorOpen(false)}
                  onSaveImage={changePicture}
                />
              )}
              <div className="w-1/2 md:w-3/5 aspect-square rounded-md overflow-hidden mx-auto">
                {pictureData.url ? (
                  <div className="w-full h-full relative">
                    <img
                      src={pictureData.url}
                      alt="Profile Picture"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center gap-3 opacity-0 text-white bg-black bg-opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out">
                      <Button
                        type="primary"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditorOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        className="!bg-red-500 hover:!bg-red-400"
                        type="primary"
                        size="small"
                        icon={<CloseOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          resetPicture();
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center border border-gray-300 rounded-md hover:border-primary transition-all ease-in-out duration-300">
                    <Button
                      type="primary"
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditorOpen(true);
                      }}
                    >
                      Upload
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col span={24} md={{ span: 16 }}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
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
              <Input disabled={userDetails ? true : false} />
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
            <Form.Item name="year" label="Year" rules={[{ required: true }]}>
              <Select options={YEARS} />
            </Form.Item>
          </Col>
        </Row>
        {userDetails?.isMember && (
          <>
            <Form.List name="links">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Row
                      key={field.key}
                      gutter={[32]}
                      align="middle"
                      className="mb-6"
                    >
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
                              icon={<CloseOutlined className="!text-red-500" />}
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          </Col>
                          <Col span={12} flex={1}>
                            <Button
                              className="!w-full mt-5 !bg-transparent"
                              icon={<PlusOutlined className="!text-primary" />}
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
          <Button type="primary" htmlType="submit" className="w-full md:w-56">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UserProfileUpdateForm;
