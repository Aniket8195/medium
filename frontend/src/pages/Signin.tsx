import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";
import { ToastContainer } from "react-toastify";

export const Signin=()=> {
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type="Signin">
            </Auth>
            <div className="fixed bottom-0 right-0">
          <ToastContainer />
          </div>
        </div>
        <div>
            <Quote>
            </Quote>
        </div>
    </div>
}