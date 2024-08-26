import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Layout, Modal, Table, message, InputNumber, Card } from 'antd';
import PropertyForm from '../components/PropertyForm';
import axios from 'axios';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';


const BASE_API = 'https://v1.nocodeapi.com/burakkoctas3/google_sheets/RXfNKLeUFkkNVGKb?tabId=emlaklar';

const PropertyManagementPage = () => {
  const [properties, setProperties] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [copyProperties, setCopyProperties] = useState([]);

  const [odaFilterArray, setOdaFilterArray] = useState([]);
  const [turFilterArray, setTurFilterArray] = useState([]);
  const [sehirFilterArray, setSehirFilterArray] = useState([]);

  const [odaNotFilterArray, setOdaNotFilterArray] = useState([]);
  const [turNotFilterArray, setTurNotFilterArray] = useState([]);
  const [sehirNotFilterArray, setSehirNotFilterArray] = useState([]);

  const [minM2, setMinM2] = useState(null);
  const [maxM2, setMaxM2] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddProperty = (property) => {
    const newProperty = { ...property, id: properties.length + 1 };

    setProperties([...properties, newProperty]);
    savePropertiesToStorage([...properties, newProperty]);

    setIsModalVisible(false);
    window.location.reload();
  };

  const columns = [
    { title: 'İlan Başlığı', dataIndex: 'ilan_baslik', key: 'ilan_baslik' },
    { title: 'Tür', dataIndex: 'tur', key: 'tur' },
    { title: 'm²', dataIndex: 'm2', key: 'm2' },
    { title: 'Oda Sayısı', dataIndex: 'oda_sayisi', key: 'oda_sayisi' },
    { title: 'Fiyat', dataIndex: 'fiyat', key: 'fiyat' },
    { title: 'Tarih', dataIndex: 'ilan_tarihi', key: 'ilan_tarihi' },
    { title: 'İl', dataIndex: 'il', key: 'il' },
    { title: 'İlçe', dataIndex: 'ilce', key: 'ilce' },
    {
      title: '',
      key: 'actions',
      render: (text, record) => (
        <Button type='primary' onClick={() => message.success('Mail Gönderildi')}>Mail At</Button>
      ),
    },
  ];

  const handleGetData = async () => {
    await axios.get(BASE_API)
      .then(res => {
        setProperties(res.data.data);
        setCopyProperties(res.data.data);
        savePropertiesToStorage(res.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem('properties'));
    if (storedProperties) {
      setProperties(storedProperties);
      setCopyProperties(storedProperties);
    } else {
      handleGetData();
    }
  }, []);

  const savePropertiesToStorage = (properties) => {
    localStorage.setItem('properties', JSON.stringify(properties));
  };

  const emlak_oda_sayisi = [
    { label: '1+0', value: '1+0' },
    { label: '1+1', value: '1+1' },
    { label: '2+1', value: '2+1' },
    { label: '3+1', value: '3+1' },
    { label: '4+1', value: '4+1' },
    { label: '5+1', value: '5+1' },
    { label: '6+1', value: '6+1' },
  ];

  const emlak_tur = [
    { label: 'Satılık', value: 'satılık' },
    { label: 'Kiralık', value: 'kiralık' },
  ];

  const emlak_sehir = [
    { label: 'İzmir', value: 'İzmir' },
    { label: 'Ankara', value: 'Ankara' },
    { label: 'İstanbul', value: 'İstanbul' },
    { label: 'Antalya', value: 'Antalya' },
    { label: 'Edirne', value: 'Edirne' },
    { label: 'Bursa', value: 'Bursa' },
    {label: "Manisa", value: "Manisa"}
  ];

  const handleFilterButton = () => {
    let filteredProperties = properties;

    if (odaFilterArray.length > 0) {
      filteredProperties = filteredProperties.filter(property => odaFilterArray.includes(property.oda_sayisi));
    }

    if (turFilterArray.length > 0) {
      filteredProperties = filteredProperties.filter(property => turFilterArray.includes(property.tur));
    }

    if (sehirFilterArray.length > 0) {
      filteredProperties = filteredProperties.filter(property => sehirFilterArray.includes(property.il));
    }

    if (odaNotFilterArray.length > 0) {
      filteredProperties = filteredProperties.filter(property => !odaNotFilterArray.includes(property.oda_sayisi));
    }

    if (turNotFilterArray.length > 0) {
      filteredProperties = filteredProperties.filter(property => !turNotFilterArray.includes(property.tur));
    }

    if (sehirNotFilterArray.length > 0) {
      filteredProperties = filteredProperties.filter(property => !sehirNotFilterArray.includes(property.il));
    }

    if (minM2 && maxM2) {
      filteredProperties = filteredProperties.filter(property => property.m2 >= minM2 && property.m2 <= maxM2);
    }

    if (minPrice && maxPrice) {
      filteredProperties = filteredProperties.filter(property => property.fiyat >= minPrice && property.fiyat <= maxPrice);
    }

    setCopyProperties(filteredProperties);
  };

  const handleOdaCheck = (value) => {
    setOdaFilterArray(value);
  };

  const handleTurCheck = (value) => {
    setTurFilterArray(value);
  };

  const handleSehirCheck = (value) => {
    setSehirFilterArray(value);
  };

  const handleOdaNotCheck = (value) => {
    setOdaNotFilterArray(value);
  };

  const handleTurNotCheck = (value) => {
    setTurNotFilterArray(value);
  };

  const handleSehirNotCheck = (value) => {
    setSehirNotFilterArray(value);
  };

  const handleMinM2Change = (value) => {
    setMinM2(value);
  };

  const handleMaxM2Change = (value) => {
    setMaxM2(value);
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
  };

  return (
    <Layout>
      <Sider width='300' style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFFF', overflow: 'auto',
        height: '83vh',
        left: 0,
        top: 0,
        bottom: 0,
      }}>
        <Card title="Mutlaka Olmalı">
          <Card type='inner' title="Oda Sayısı">
            <Checkbox.Group options={emlak_oda_sayisi} onChange={handleOdaCheck} />
          </Card>
          <Card title="Tür" type='inner'>
            <Checkbox.Group options={emlak_tur} onChange={handleTurCheck} />
          </Card>
          <Card title="Şehir" type='inner'>
            <Checkbox.Group options={emlak_sehir} onChange={handleSehirCheck} />
          </Card>
        </Card>
        <Card title="Mutlaka Olmamalı">
          <Card type='inner' title="Oda Sayısı">
            <Checkbox.Group options={emlak_oda_sayisi} onChange={handleOdaNotCheck} />
          </Card>

          <Card type='inner' title="Tür">
            <Checkbox.Group options={emlak_tur} onChange={handleTurNotCheck} />
          </Card>

          <Card type='inner' title="Şehir">
            <Checkbox.Group options={emlak_sehir} onChange={handleSehirNotCheck} />
          </Card>
        </Card>
        <Card title="Olsa da Olur Olmasa da Olur">
          <Card type='inner' title="Oda Sayısı">
            <Checkbox.Group options={emlak_oda_sayisi} onChange={() => { }} />
          </Card>

          <Card type='inner' title="Tür">
            <Checkbox.Group options={emlak_tur} onChange={() => { }} />
          </Card>

          <Card type='inner' title="Şehir">
            <Checkbox.Group options={emlak_sehir} onChange={() => { }} />
          </Card>
        </Card>
        <Card>
        <Card title="m² Aralığı" type="inner">
            <InputNumber min={0} onChange={handleMinM2Change} placeholder="Min m²" style={{ marginBottom: 10, width: '100%' }} />
            <InputNumber min={0} onChange={handleMaxM2Change} placeholder="Max m²" style={{ marginBottom: 10, width: '100%' }} />
          </Card>
          <Card title="Fiyat Aralığı" type="inner">
          <InputNumber min={0} onChange={handleMinPriceChange} placeholder="Min fiyat" style={{ marginBottom: 10, width: '100%' }} />
          <InputNumber min={0} onChange={handleMaxPriceChange} placeholder="Max fiyat" style={{ marginBottom: 10, width: '100%' }} />
        </Card>
        </Card>
        <Button type='primary' style={{ display: "flex", margin: 20, marginLeft: 100 }} onClick={handleFilterButton}>Filtrele</Button>
      </Sider>
      <Content>
        <Button type="primary" onClick={showModal}>
          Yeni Ev Ekle
        </Button>
        <Table dataSource={copyProperties} columns={columns} rowKey="id" />
        <Modal
          title="Yeni Ev Ekle"
          open={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <PropertyForm onAddProperty={handleAddProperty} />
        </Modal>
      </Content>
    </Layout>
  );
};

export default PropertyManagementPage;
