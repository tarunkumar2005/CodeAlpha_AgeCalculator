import React, { useState } from 'react';
import { Layout, Form, Button, DatePicker, Typography, Spin, Divider } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;

const AgeCalculator = () => {
  const [age, setAge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [peopleCount, setPeopleCount] = useState(1000); // Starting count from 1000

  const calculateAge = (date) => {
    setLoading(true);
    setTimeout(() => {
      const birthDate = new Date(date);
      const today = new Date();

      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

      if (days < 0) {
        months--;
        const tempDate = new Date(today.getFullYear(), today.getMonth(), 0);
        days += tempDate.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      setAge({ years, months, days });
      setLoading(false);
      if (age) {
        setPeopleCount((prevCount) => prevCount + 1); // Increment count on successful calculation
      }
    }, 1500);
  };

  return (
    <Layout className="h-screen flex items-center justify-center bg-gradient-to-b from-purple-700 to-indigo-900">
      <Content className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2} className="text-3xl font-bold text-indigo-600 mb-2">Age Calculator</Title>
          <Text className="text-gray-600">Calculate your age in years, months, and days</Text>
        </div>
        <Divider />
        <Form layout="vertical" onFinish={(values) => calculateAge(values.birthDate)}>
          <Form.Item
            label="Date of Birth"
            name="birthDate"
            rules={[{ required: true, message: 'Please select your date of birth!' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {loading ? <Spin /> : 'Calculate Age'}
            </Button>
          </Form.Item>
        </Form>
        {age && !loading && (
          <div className="mt-6 text-center">
            <Title level={4} className="text-lg font-semibold text-indigo-600">
              Your Age is:
            </Title>
            <Title level={5} className="text-2xl font-bold text-gray-700">
              {age.years > 0 && <span>{age.years} years </span>}
              {age.months > 0 && <span>{age.months} months </span>}
              {age.days > 0 && <span>{age.days} days</span>}
            </Title>
          </div>
        )}
        {loading && (
          <div className="mt-6 flex justify-center items-center">
            <Spin size="large" />
          </div>
        )}
        <div className="mt-8 text-center text-gray-500">
          <Text>Age calculated for {peopleCount}+ people from this web app.</Text>
        </div>
      </Content>
    </Layout>
  );
};

export default AgeCalculator;