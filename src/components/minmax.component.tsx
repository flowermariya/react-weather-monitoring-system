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
      <button
        onClick={showModal}
        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="14"
          viewBox="0 0 448 512"
        >
          <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
        </svg>
      </button>

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
