import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { useState } from "react";

const initialFiltered = {
  detail: "",
};
const SearchBudget = () => {
  const [filtered, setFiltered] = useState(initialFiltered);

  const handleFilterChange = (name: string, value: string) => {
    setFiltered((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Input
        className="search-field"
        type="text"
        name="detail"
        placeholder="Search Budget Category"
        value={filtered.detail}
        onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
      />

      <Button
        title="Reset"
        type="button"
        className="secondary-button"
        onClick={() => setFiltered(initialFiltered)}
      />
    </div>
  );
};

export default SearchBudget;
