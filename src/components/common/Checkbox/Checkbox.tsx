import { Form } from "react-bootstrap";
import "./CheckboxStyle.scss";

const Checkbox = ({ label, controlid , onChange, value}: any) => {
  return (
    <Form.Group className="checkbox_Style" controlId={controlid}>
      <Form.Check type="checkbox" label={label} onChange={onChange} value={value} />
    </Form.Group>
  );
};

export default Checkbox;
