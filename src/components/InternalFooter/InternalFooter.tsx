import "./InternalFooter.scss";

const InternalFooter = () => {
  return (
    <>
      <footer className="internal-footer d-flex justify-content-center">
        <p>Copyright &#169; {new Date().getFullYear()} ukiyo. All rights reserved.</p>
        {/* <div className="internal-footer__links">
          <a href="#">Privacy Policy</a>
          <span>&#8211;</span>
          <a href="#">Terms & Conditions</a>
          <span>&#8211;</span>
          <a href="#">Contact Us</a>
        </div> */}
      </footer>
    </>
  );
};

export default InternalFooter;
