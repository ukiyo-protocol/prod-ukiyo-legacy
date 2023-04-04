import { Form } from "react-bootstrap";
import "./InputCustom.scss";

const InputCustom = (props) => {
  const exceptThisSymbols = ["e", "E", "+", "-"];

  const onKeyDown = (e) => {
    if (props.disableDecimal) {
      exceptThisSymbols.push(".");
    }
    return props.type === "number"
      ? exceptThisSymbols.includes(e.key) && e.preventDefault()
      : null;
  };
  return (
    <>
      <Form.Group
        className={`customInput ${props.className}`}
        controlId={props.controlId}
      >
        <Form.Control
          disabled={props.disabled}
          type={props.type}
          id={props.id}
          name={props.name}
          value={props.value}
          onKeyDown={onKeyDown}
          placeholder={props.placeholder}
          onBlur={props.onBlur}
          onChange={props.onChange}
          maxLength={props.maxLength ? props.maxLength : ""}
          required={props.required}
          min={props.min}
          max={props.max}
          isInvalid={props.isInvalid}
          onPaste={props.onChange}
          onWheel={props.onWheel}
          step={props.step}
          autoComplete={props.autoComplete ? props.autoComplete : "off"}
          pattern="\S(.*\S)?"
          title={props.title ? props.title : "Blank space are not allowed"}
          onInvalid={props.onInvalid}
          onInput={props.onInput}
        />
        {props.children}
        {props.smallText ? (
          <Form.Text id="" muted className="small-text-form">
            {props.smallText}
          </Form.Text>
        ) : (
          ""
        )}
      </Form.Group>
    </>
  );
};
export default InputCustom;
