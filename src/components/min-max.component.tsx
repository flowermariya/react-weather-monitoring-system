import { Button, Modal } from "antd";
import { useState } from "react";
interface MinMaxComponent {
  isModalOpen: boolean;
  handleOk: (minTemp: number, maxTemp: number) => void;
  handleCancel: (value: any) => void;
  showModal: () => void;
}

export const MinMaxComponent: React.FC<MinMaxComponent> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  showModal,
}) => {
  const [minTemp, setMinTemp] = useState<number>(0);
  const [maxTemp, setMaxTemp] = useState<number>(0);

  const onOk = () => {
    handleOk(minTemp, maxTemp);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal open={isModalOpen} onOk={onOk} onCancel={handleCancel}>
        <form className="max-w-sm mx-auto">
          <div className="flex flex-row justify-between gap-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Minimum Temperature:
            </label>
            <input
              type="number"
              id="number-input"
              value={minTemp}
              onChange={(e) => setMinTemp(Number(e.target.value))}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="90210"
              required
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Maximum Temperature:
            </label>
            <input
              type="number"
              id="number-input"
              onChange={(e) => setMaxTemp(Number(e.target.value))}
              value={maxTemp}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="90210"
              required
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MinMaxComponent;
