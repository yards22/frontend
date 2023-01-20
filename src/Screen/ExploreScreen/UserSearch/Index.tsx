import React from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

function UserSearchIndex() {
  return (
    <div className="flex w-full flex-col">
      <SearchBar />
      <SearchResult />
    </div>
  );
}

export default UserSearchIndex;
