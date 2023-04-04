import "./ButtonStyle.scss";
const ButtonCustom = ({ type, title, className, onClick, disabled }: any) => {
  return (
    <button className={`btnStyle ${className}`} type={type ? type : 'button'} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default ButtonCustom;
