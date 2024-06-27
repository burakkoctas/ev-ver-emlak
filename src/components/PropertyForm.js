import React from 'react';
import { Form, Input, Button, Select} from 'antd';

const { Option } = Select;

const PropertyForm = ({ onAddProperty }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Şu anki tarihi al ve formatla
    const propertyData = {
      ...values,
      ilan_tarihi: currentDate
    };
    console.log(propertyData);
    onAddProperty(propertyData);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="ilan_baslik"
        label="İlan Başlığı"
        rules={[{ required: true, message: 'Boş bırakılamaz!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="tur"
        label="Tür"
        key="tur"
        rules={[{ required: true, message: 'Boş bırakılamaz!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="m2"
        label="Metrekare"
        key="m2"
        rules={[{ required: true, message: 'Boş bırakılamaz!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name="oda_sayisi"
        label="Oda Sayısı"
        key="oda_sayisi"
        rules={[{ required: true, message: 'Boş bırakılamaz!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="fiyat"
        label="Fiyat"
        key="fiyat"
        rules={[{ required: true, message: 'Boş bırakılamaz!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        name="il"
        label="İl"
        key="il"
        rules={[{ required: true, message: 'Boş bırakılamaz!' }]}
      >
        <Select placeholder="Bir il seçin">
          <Option value="İstanbul">İstanbul</Option>
          <Option value="Ankara">Ankara</Option>
          <Option value="İzmir">İzmir</Option>
          <Option value="Edirne">Edirne</Option>
          <Option value="Antalya">Antalya</Option>
          <Option value="Bursa">Bursa</Option>
          {/* Diğer iller */}
        </Select>
      </Form.Item>
      <Form.Item
        key="ilce"
        name="ilce"
        label="İlçe"
        rules={[{ required: true, message: 'Boş bırakılamaz!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Ekle
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PropertyForm;
