import "./ButtonStyle.scss";

const ButtonCustom = (props: any) => {
  return (
    <>
      <button
        onClick={props?.onClick}
        type={props?.type}
        className={`btn-style ${props.className}`}
        disabled={props.disabled}
      >
        {props.title}{" "}
        {props.btnIcon && (
          <img src={props.btnIcon} alt="icon" className="ms-3" />
        )}
      </button>
    </>
  );
};

export default ButtonCustom;
