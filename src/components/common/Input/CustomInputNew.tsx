import { Form } from "react-bootstrap";
import ShowIcon from "../../../assets/Images/show.png";
import HideIcon from "../../../assets/Images/hide.png";
import "./InputStyle.scss";

type props = {
  placeholder: string;
  type?: string;
  label: string;
  onChange?: any;
  value?: any;
  required?: boolean;
  readOnly?: boolean;
  errorText?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  eyeIcon?: string;
  autoComplete?: string;
  labelRequired?: boolean;
  maxLimit ?: number;
}
const CustomInput = ({ maxLimit,labelRequired, placeholder, type, label, onChange, value, required, readOnly, errorText, className, disabled, name, autoComplete }: props) => {
  return (
    <Form.Group className={`inputStyle ${className}`}>
      <Form.Label>{label} {labelRequired ? <span className="text-danger">*</span> :null}</Form.Label>
      <input className="form-control" maxLength={maxLimit} name={name} type={type} readOnly={readOnly} placeholder={placeholder} defaultValue={value} onChange={onChange} disabled={disabled}  required={required} autoComplete={autoComplete} />
  
      {/* <Form.Control name={name} type={type} readOnly={readOnly} placeholder={placeholder} value={value} onChange={onChange} required={required} disabled={disabled} /> */}
  
      {errorText && <p className="error-text">{errorText}</p>}
    </Form.Group>
  );
};

export default CustomInput;
