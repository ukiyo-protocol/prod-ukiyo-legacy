import Select from "react-select";

import DatePickerCustom from "../DatePickerCustom/DatePickerCustom";
import filterIcon from "../../../assets/Images/filterIcon.svg";
import serachIcon from "../../../assets/Images/serachIcon.svg";
import "./Filter.scss";
import { useState } from "react";
import ButtonCustom from "../ButtonNew/ButtonCustomNew";

const Filter = ({ isSearchable, callback, isKycView = false, dateResetCallback }: any) => {
  const [claimStatus, setClaimedStatus] = useState();

  const [isReset, setIsReset] = useState(false);
  const defaultOptions = [
    { value: null, label: "All" },
    { value: 1, label: "Claimed" },
    { value: 0, label: "Unclaimed" },
  ];
  //kyc filter select options
  const kycOptions = [
    { value: null, label: "All Status" },
    { value: 0, label: "Not Submitted" },
    // { value: 1, label: "Submitted" },
    { value: 2, label: "Approved" },
    { value: 3, label: "Rejected" },
    { value: 4, label: "Pending" },
  ];

  const options = isKycView ? kycOptions : defaultOptions;



  const dateHandler = (type: string, data: any) => {
    callback(type, data);
    setIsReset(false);
  }


  const claimStatusFilterHandler = (selectedOption: any) => {
    setClaimedStatus(selectedOption);
    callback('claim', selectedOption.value)
  };
  //handler to reset start date and end date
  const handlerToResetDateFilter = () => {
    dateResetCallback();
    setIsReset(true);

  }
  return (
    <div className="filter d-flex justify-content-between align-items-end align-items-md-center">
      <div className="d-flex flex-column flex-md-row align-items-md-center">
        <p className="d-inline-block me-md-3 mb-4 mb-md-0 ">
          <img src={filterIcon} alt="filter-icon" className="me-3" />
          Filter :
        </p>
        <div className="filter__fields d-flex flex-wrap me-md-3">
          {isSearchable && (
            <div className="filter__search">
              <img
                src={serachIcon}
                alt="icon"
                className="filter__search__icon"
              />
              <input placeholder="Enter Email Id" />
            </div>
          )}
          <DatePickerCustom type="start" callback={dateHandler} reset={isReset} />
          <DatePickerCustom type="end" callback={dateHandler} reset={isReset} />
          <ButtonCustom className="btn-style red-btn" title={"Reset"} onClick={() => { handlerToResetDateFilter() }} />
        </div>
      </div>
      <Select
        options={options}
        value={claimStatus}
        onChange={claimStatusFilterHandler}
        isSearchable={false}
        placeholder="All"
        className="react-select-custom react-select-custom--filter"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default Filter;
