import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import App from "./App";
import "aos/dist/aos.css";
import "./assets/fonts/fonts.css";
import LoaderComponent from "./components/common/LoaderCompoent/LoaderCompoent";
import "./index.scss";
import { persistor, reduxStore } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
// import { useEffect } from "react";
import Aos from "aos";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={reduxStore}>
    <PersistGate loading={null} persistor={persistor}>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontSize: '15px',
            zIndex: 100000,
          },
        }}
      />
      <LoaderComponent />
      <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
