import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
export const AppBar = () => {

    return <div className="border-b flex justify-between px-10 py-4">
       <Link to={'/blogs'}>
       <div className="font-bold flex flex-col justify-center px-8 py-2.5">
        Medium
       </div>
       </Link>
       <div>
        <Link to={'/publish'}> 
        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium mr-4 rounded-full text-sm px-8 py-2.5 me-2 mb-2">Publish</button>
        </Link>
            <Avatar name="A" size={"big"}/>
       </div>
    </div>
}