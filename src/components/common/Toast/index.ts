import toast from "react-hot-toast";

let options: any = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

class Toaster {
  success = (message: string) => {
    toast.success(message, options);
  };

  error = (message: string) => {
    toast.error(message, options);
  };
}

export default new Toaster();
