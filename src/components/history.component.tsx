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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                {item.city_name}
              </h2>
              <div>
                <span style={{ marginRight: "10px" }}>
                  Visited Date: {item.createdAt}
                </span>{" "}
                <button
                  onClick={() => onDelete(item._id)}
                  className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="14"
                    viewBox="0 0 448 512"
                  >
                    <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                  </svg>
                </button>
              </div>
            </div>

            <Row gutter={16}>
              {item.body.map((record: any, idx: any) => (
                <Col key={idx} span={4}>
                  <div className="weather-grid-item">
                    <div className="weather-grid-header">
                      <span>{record?.key}</span>
                    </div>

                    <div className="weather-grid-content">
                      <p>
                        <strong>Temperature:</strong>{" "}
                        {kelvinToCelsius(record.main.temp)}
                      </p>
                      <p>
                        <strong>Humidity:</strong> {record.main.humidity}%
                      </p>
                      <p>
                        <strong>Weather:</strong>
                        {record.weather
                          .map((w: any) => w.description)
                          .join(", ")}
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
                    </div>
                  </div>
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
