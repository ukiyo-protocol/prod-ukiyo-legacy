import Pagination from 'react-bootstrap/Pagination';
import React, { useState } from 'react';
import "./Pagination.scss";

type props = {
  totalPages: number,
  callback: any,
}

const Paginate = (props: props) => {
  const [page, setPage] = useState<number>(1);

  // let totalPages: number = Math.ceil(props?.totalCount / props?.limit);
  // let active = 1;
  let items: any = [];
  for (let number: number = 1; number <= props?.totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === page} onClick={() => {
        setPage(number);
        props.callback(number)
      }} >
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <>
      {/* <div className='page_nation pb-3'> */}
        <Pagination className="page_nation justify-content-center my-3" >{items}</Pagination>
      {/* </div> */}
    </>
  );
}
export default Paginate;

