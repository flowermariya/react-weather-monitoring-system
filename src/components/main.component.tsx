import React from "react";

import { Button, AutoComplete } from "antd";

interface MainPageProps {
  autoCompleteOptions: { value: string; label: any }[];
  onSelectCity: (value: any) => void;
  onSearchCity: (value: any) => void;
}

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

      <Button href="/history" className="your-custom-class">
        View Map
      </Button>
      <Button href="/history" className="your-custom-class">
        View History
      </Button>
    </div>
  );
};

export default MainPage;
