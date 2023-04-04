import "./CommonHeading.scss";

const CommonHeading = ({ title, subTitle, className }: any) => {
  return (
    <div className={`comn-heading ${className}`}>
      <h2 className="centerLine text-center">{title}</h2>
      {/* <span className="comn-heading__subtxt">{subTitle}</span> */}
    </div>
  );
};

export default CommonHeading;
