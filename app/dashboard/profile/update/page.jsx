"use client"; 
import React, { use } from 'react'
import { useState } from 'react';
import { Form, Input, Button, Space, Select } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const UserDashboardProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [data,setData] = useState({
    name: '',
    email: '',
    branch: '',
    year: '',
    rollno: '',
    linkedin: '',
    github: '',
  });

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className='flex w-full justify-center '>
      <div className='w-2/3'>
      <Form autoComplete='off' layout='vertical'>
      <Title level={2} className='text-center'>Profile Details</Title>
      <div className=' items-center'>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader items-center mx-11"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      </div>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input  onChange={(e)=>{setData({...data,name: e.target.value, });  }} />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Space/>
        <Input  onChange={(e)=>{setData({...data,email: e.target.value})}} />
      </Form.Item>
      <Form.Item name="age" label="Roll no" rules={[{ required: true }]}>
        <Input onChange={(e)=>{setData({...data,rollno: e.target.value})}} />
      </Form.Item>
      <Form.Item name="Branch" label="Branch" rules={[{required:true}]}>
      <Select
      defaultValue="IT"   
      style={{ width: 120 }}
      options={[
        { value: 'IT', label: 'IT' },
        { value: 'MECH', label: 'MECH' },
        { value: 'COMPS', label: 'COMPS' },
        { value: 'COMPS-AI', label: 'COMPS-AI' },
        { value: 'EXTC', label: 'EXTC' },
        { value: 'CIVIL', label: 'CIVIL' },
        { value: 'AUTO', label: 'AUTO' },
      ]}
      onChange={(value)=>{setData({...data,branch: value})}}
    />
      </Form.Item>
      <Form.Item name="Year" label="Year" rules={[{required:true}]}>
      <Select
      defaultValue="I"   
      style={{ width: 120 }}
      
      options={[
        { value: "I", label: 'I' },
        { value: "II", label: 'II' },
        { value: "III", label: 'III' },
        { value:"IV", label: 'IV' },
        
      ]}
      onChange={(value)=>{setData({...data,year: value})}}
    />
      </Form.Item>
      <Form.Item
        name="LinkedIn"
        label="LinkedIn Profile URL"
      >
          <Input onChange={(e)=>{setData({...data,linkedin: e.target.value})}} />
      </Form.Item>
      <Form.Item
        name="github"
        label="Github Profile URL"
      >
          <Input onChange={(e)=>{setData({...data,github: e.target.value})}}/>
      </Form.Item>
     
      
    </Form>
    <div className='flex justify-center gap-11'> 
      <Button type="primary" onClick={console.log(data)} >Submit</Button>
      <Button type="primary" >Reset</Button>
      </div>
      </div>
    </div>
  )
}

export default UserDashboardProfileUpdate