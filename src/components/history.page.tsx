import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Card, Row, Col, Button } from "antd";
import { kelvinToCelsius } from "../utils/convertToFarenHeat";
import { DeleteOutlined } from "@ant-design/icons";

function HistoryPage() {
  const [locationHistory, setLocationHistory] = useState<any[]>([]);

  const getLocationHistory = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/location/getAll`);
      setLocationHistory(res.data);
    } catch (error) {
      console.error("Error fetching location history:", error);
    }
  };

  const onDelete = async (locationId: string) => {
    console.log("locationId", locationId);

    if (!locationId) {
      return;
    }

    await axios.delete(
      `http://localhost:3001/location/deleteHistory?locationId=${locationId}`
    );
  };

  useEffect(() => {
    getLocationHistory();
  }, []);

  return (
    <div
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/streetlights-cloudy-day_23-2148098648.jpg?w=1060&t=st=1702548430~exp=1702549030~hmac=8916f9f0a36ae429b545e7ce39c888089c45777387b766e06b91cf37aff30682')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <br />
      <List
        itemLayout="vertical"
        dataSource={locationHistory}
        renderItem={(item) => (
          <div>
            <h2 className="text-lg font-bold text-white mb-4">
              {item.city_name}
            </h2>
            <Button onClick={() => onDelete(item._id)}>
              <DeleteOutlined style={{ fontSize: "16px", color: "#FF0000" }} />
            </Button>
            <Row gutter={16}>
              {item.body.map((record: any, idx: any) => (
                <Col key={idx} span={4}>
                  <Card
                    bordered={false}
                    style={{ backgroundColor: "#e7e5e4" }}
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>{record?.key}</span>
                      </div>
                    }
                  >
                    <p>
                      <strong>Temperature:</strong> {record.main.temp}K
                    </p>
                    <p>
                      <strong>Humidity:</strong> {record.main.humidity}%
                    </p>
                    <p>
                      <strong>Weather:</strong>
                      {record.weather.map((w: any) => w.description).join(", ")}
                    </p>
                    <p>
                      <strong>Wind Speed:</strong> {record?.wind?.speed}
                    </p>
                    <p>
                      <strong> Feels Like:</strong>
                      {kelvinToCelsius(record?.main?.feels_like)}
                    </p>
                    <p>
                      <strong> Max Temperature:</strong>
                      {kelvinToCelsius(record?.main?.temp_max)}
                    </p>
                    <p>
                      <strong> Min Temperature:</strong>
                      {kelvinToCelsius(record?.main?.temp_min)}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
            <br />
          </div>
        )}
      />
    </div>
  );
}

export default HistoryPage;