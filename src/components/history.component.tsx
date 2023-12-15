import { useEffect, useState } from "react";
import { List, Card, Row, Col, Button } from "antd";
import { kelvinToCelsius } from "../utils/convertToFarenHeat";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

function HistoryPage() {
  const [locationHistory, setLocationHistory] = useState<any[]>([]);

  const getLocationHistory = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAll`
      );
      setLocationHistory(res.data);
    } catch (error) {
      console.error("Error fetching location history:", error);
    }
  };

  useEffect(() => {
    getLocationHistory();
  }, []);

  const onDelete = async (locationId: string) => {
    console.log("locationId", locationId);

    if (!locationId) {
      return;
    }

    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/deleteHistory?locationId=${locationId}`
    );
    getLocationHistory();
  };

  return (
    <div className="homepage">
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
                      <strong>Temperature:</strong>{" "}
                      {kelvinToCelsius(record.main.temp)}
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
