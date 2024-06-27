// src/pages/LoginPage.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




const LoginPage = () => {

  const BASE_API = 'https://v1.nocodeapi.com/burakkoctas3/google_sheets/RXfNKLeUFkkNVGKb?tabId=login'
  
  const [users, setUsers] = useState([]);
  
  const handleGetData = async() => {
    await axios.get(BASE_API)
    .then(res => {
      setUsers(res.data.data);
      console.log(users);
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect( () => {
    
   handleGetData();

  }, []);
  
  const navigate = useNavigate();

  const onFinish = (values) => {
    let validUser = false;
    for (let i in users) {
      console.log(values)
      if (values.username === users[i].Username) {
        if (values.password === users[i].Password){
          validUser=true;
          
          break;
        }
        else{
          console.log("Wrong password")
        }
      }
    }
    if (validUser){
      console.log('Success:', values);
      localStorage.setItem('username',values.username);
      navigate('/property-management');
    }
    else{
      console.log('Wrong username or password');
      message.error("Kullanıcı Adı veya Şifre Hatalı");
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '50px' }}>
      <h1>Login</h1>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}
        >
          <Input placeholder="Kullanıcı Adı" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
        >
          <Input.Password placeholder="Şifre" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
