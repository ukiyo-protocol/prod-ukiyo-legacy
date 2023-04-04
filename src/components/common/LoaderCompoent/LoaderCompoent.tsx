
import { Spinner } from 'react-bootstrap'
import { useSelector } from "react-redux";
import { Bars, ColorRing } from  'react-loader-spinner'
import "./style.scss"


function LoaderComponent() {
  const loader = useSelector((state: any) => state.loader.isLoading);
  return (
    <>
      
     
      {loader ?
<>
          <div className="loader-backdrop">
            <ColorRing
              height="80"
              width="80"
              // color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass="common_loader"
              visible={true}
            />
            </div>
</>

        : null}
  

</>
  );
}

export default LoaderComponent;
