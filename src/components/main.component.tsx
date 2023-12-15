import React from "react";
import { AutoComplete } from "antd";
import { MainPageProps } from "../utils/interfaces/mainpage.interface";
import { Link } from "react-router-dom";

const MainPage: React.FC<MainPageProps> = ({
  autoCompleteOptions,
  onSelectCity,
  onSearchCity,
}) => {
  return (
    <div className="flex items-center justify-between">
      <AutoComplete
        options={autoCompleteOptions}
        style={{ width: 400 }}
        onSelect={onSelectCity}
        onSearch={onSearchCity}
        placeholder="Search city"
      />
      <div className="button-container">
        <Link to="/mapView">
          <button
            type="button"
            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
          >
            <path
              fill-rule="evenodd"
              d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
              clip-rule="evenodd"
            />
            Map View
          </button>
        </Link>
        <Link to="/history">
          <button
            type="button"
            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
          >
            <path
              fill-rule="evenodd"
              d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
              clip-rule="evenodd"
            />
            View History
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
