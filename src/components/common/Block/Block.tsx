import React from "react";

const Block = (props: any) => {
  return (
    <>
      <div className={`block_sec ${props.className}`}>
        <span>
          <img src={props.img} alt="" />
        </span>
        <p>{props.date}</p>
        <h2>{props.title}</h2>
        <h4>{props.subtitle}</h4>
      </div>
    </>
  );
};

export default Block;
