import { Container } from "react-bootstrap";
import InternalFooter from "../InternalFooter/InternalFooter";
import AdminHeader from "../AdminHeader/AdminHeader";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.scss";
import { useSelector } from 'react-redux';

type Iprops = {
  headTitle?: string;
  children?: any;
  className?:string
}
const Layout = ({ headTitle, className, children }: Iprops) => {
  const userDetails = useSelector((state: any) => state.user)
  return (
    
      <div className="adminLayout">
        <Sidebar />
      <div className="adminRight_Sec">
          <AdminHeader headTitle={headTitle!} />
          <Container className={`adminInner_wrap ${className}`}>
            {children}
          </Container>
        </div>
        <InternalFooter />
      </div>
    
  );
};

export default Layout;
