import React, { useState } from "react";
import Logo from "../../img/logo.png";
import { UilSearch } from "@iconscout/react-unicons";
import { Select } from "@mantine/core";
import { useSelector } from "react-redux";

const UserSearch = ({ setAddChat }) => {
  const { users, loading, error } = useSelector((state) => state.chatReducer);

  const dropdownData =
    !error &&
    !loading &&
    users?.map((user) => {
      return { label: `${user.firstName} ${user.lastName}`, value: user._id };
    });

  const [searchValue, onSearchChange] = useState("");
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" />
      <div className="Search">
        <Select
          placeholder="Search User"
          searchable
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onChange={(e) => setAddChat(e)}
          rightSection={
            <div className="s-icon">
              <UilSearch />
            </div>
          }
          rightSectionWidth={30}
          nothingFound="No options"
          maxDropdownHeight={280}
          data={dropdownData.length > 0 ? dropdownData : []}
        />
      </div>
    </div>
  );
};

export default UserSearch;
