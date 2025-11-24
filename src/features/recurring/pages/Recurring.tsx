import React, { useState } from "react";
import { useGetActiveRecurringsQuery } from "../api";
import Content from "@/layout/Content";
import RecurringDesktop from "../ui/RecurringDesktop";
import RecurringMobile from "../ui/RecurringMobile";
import SearchBar from "@/components/SearchBar";
import useDebounce from "@/hooks/useDebounce";
import { Transaction } from "@/features/transaction/api/type";

const Recurring = () => {
  const { data: recurrings } = useGetActiveRecurringsQuery();
  const recurringsData = recurrings?.data || [];

  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);

  // removing useMemo as React Compiler implemented
  const filteredData = () => {
    const term = debounceSearch.toLowerCase();
    return recurringsData?.filter((recurring: Transaction) => {
      const matchQuery = term
        ? recurring.detail.toLowerCase().includes(term) ||
          recurring.category.toLowerCase().includes(term)
        : true;
      return matchQuery;
    });
  };

  return (
    <Content title="Recurring">
      <SearchBar
        placeholder="Search for Recurrings, e.g,: category and details"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        name="search"
      />
      <RecurringDesktop data={filteredData()} />
      <RecurringMobile data={filteredData()} />
    </Content>
  );
};

export default Recurring;
