import { Button, TextInput } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "react-feather";
import { useLocation } from "react-router-dom";
import { useStores } from "../../../Logic/Providers/StoresProviders";

function SearchBar() {
  const [search, setSearch] = useState("");
  const { networkStore } = useStores();
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes("inputFocus=true") && inputRef.current) {
      inputRef.current.focus();
    }
  }, [location.search]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (search !== "") networkStore.GetSearches(search);
      }}
      className="flex rounded-[7px] border border-solid border-gray-200 transition-all 
    focus-within:border-solid focus-within:border-gray-400 focus-within:text-gray-700"
    >
      <TextInput
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search username"
        type={"search"}
        variant="unstyled"
        className="w-full"
        icon={<Search className="text-inherit" size={18} />}
      />
      <Button type="submit" variant="white" className="bg-transparent">
        Search
      </Button>
    </form>
  );
}

export default SearchBar;
