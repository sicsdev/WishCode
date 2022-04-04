import React from "react";
import InputText from "../Inputs/InputText";

const SearchBar = (props) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="input-form">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              value={props.searchValue}
              onChange={(e) => {
                props.setSearchValue(e.target.value);
                props.searchHandler(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
