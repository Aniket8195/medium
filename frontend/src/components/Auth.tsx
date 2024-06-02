import { Link , useNavigate} from "react-router-dom";
import { userInput } from "@9518aniket/medium-common1";
import { Button } from "./Button";
import { useState} from "react";
import Axios,{AxiosResponse} from "axios";
import { BACKEND_URL } from "../Config";
import { toast } from 'react-toastify';

export const Auth=({type}:{type:"Signup" | "Signin"})=>{
    const navigate=useNavigate();
    const [userInput,setUserInputs]=useState<userInput>({
        username: "",
        password: "",
        name: ""
    })
    interface AuthResponse {
        success: boolean;
        message: string;
        jwt: string;
    }

    async function submit():Promise<void>{
        if(type==="Signup"){
            try {
                console.log(userInput);
                const AuthResponse= await Axios.post<userInput, AxiosResponse<AuthResponse>>(`${BACKEND_URL}/api/v1/user/signup`,userInput);
                 console.log(AuthResponse.data);
                 //const jwt=AuthResponse.data;
                 const { jwt, message } = AuthResponse.data;
                      if (!jwt) {
                         toast.error(message,{autoClose:20000});
                     } else {
                        toast.success(message,{autoClose:20000});
                       localStorage.setItem("jwt", jwt);
                      navigate("/blogs");
                       }
                // localStorage.setItem("jwt",jwt.message);
                // navigate("/blog")
            } catch (error) {
                console.log(error);
            }
           
        }
        else{
            try {
            const AuthResponse= await Axios.post<userInput, AxiosResponse<AuthResponse>>(`${BACKEND_URL}/api/v1/user/signin`,userInput);
            console.log(AuthResponse.data);
            const { jwt, message } = AuthResponse.data;
            if (!jwt) {
               toast.error(message, { autoClose: 20000000 });
           } else {
              toast.success(message, { autoClose: 20000000 });
             localStorage.setItem("jwt", jwt);
            navigate("/blogs");
             }
            } catch (error) {
                console.log(error);
            }
            
    }
}
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
           <div>
           <div className="px-10">
           <div className="text-3xl font-extrabold">
               Create An Account
        </div>
        <div className="text-slate-500 flex justify-center">
            {type==="Signup"?"Already have an account?":"Don't have an account?"}
            <Link className="pl-2 underline" to={type=='Signin'?'/signup':'/signin' }>{type=='Signin'?'SignUp':'Login' }</Link>
        </div>
           </div>
        <div className="pt-4">
            {type=='Signup' ? <LabledInput type="text" label="UserName" placeholder="Name" onChange={(e)=>{
                 setUserInputs(c=> (
                    {...c,
                        name: e.target.value}
                 ))
            }}/> :null}
        </div>
        <div className="pt-2">
            <LabledInput type="text" label="Email" placeholder="Email" onChange={(e)=>{
                 setUserInputs(c=> (
                    {...c,
                        username: e.target.value}
                 ))
            }}/>
        </div>
        <div className="pt-2">
            <LabledInput type="password" label="Password" placeholder="Password" onChange={(e)=>{
                 setUserInputs(c=> (
                    {...c,
                        password: e.target.value}
                 ))
            }}/>
        </div>
        <div className="pt-4">
            <Button value={type=='Signin'?'Log In' :'Sign Up' } onClick={submit}/>
        </div>
           </div>
        </div>
        
    </div>
}
interface LabledInputProps{
    label:string;
    placeholder:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    type?:string;
}
function LabledInput({label,placeholder,onChange,type }:LabledInputProps){
    return <div>
    <label className="block mb-2 text-sm font-medium text-black ">{label}</label>
    <input type={type || "text"}  onChange={onChange} className=" border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
</div>
}