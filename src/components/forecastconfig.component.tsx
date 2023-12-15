import { Button, Modal } from "antd";
import { useState } from "react";
interface MinMaxComponent {
  isModalOpen: boolean;
  handleOk: (minTemp: number, maxTemp: number) => void;
  handleCancel: (value: any) => void;
  showModal: () => void;
}

export const ForecastConfigComponent: React.FC<MinMaxComponent> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  showModal,
}) => {
  const [forecastDays, setForecastDays] = useState<number>(0);
  const [maxTemp, setMaxTemp] = useState<number>(0);

  const onOk = () => {
    handleOk(forecastDays, maxTemp);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={onOk}
        onCancel={handleCancel}
        okButtonProps={{
          className: "bg-blue-500 hover:bg-blue-600 text-white",
        }}
      >
        <form className="max-w-sm mx-auto">
          <div className="flex flex-row justify-between gap-8">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Forecast Days
            </label>
            <input
              type="number"
              id="number-input"
              defaultValue={6}
              max={6}
              min={1}
              value={forecastDays}
              onChange={(e) => setForecastDays(Number(e.target.value))}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ForecastConfigComponent;
