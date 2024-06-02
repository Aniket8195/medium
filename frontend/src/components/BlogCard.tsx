import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}



export const BlogCard = (
    {id,authorName, title, content, publishedDate}: BlogCardProps
) => {
    return <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 pb-4 pl-2 pr-2 pt-2 cursor-pointer">
       <div className="flex">
        <div className="flex justify-center flex-col text-sm">
        <Avatar name={authorName} size={"small"}/>
        </div>
        <div className="font-extralight pl-2">
        {authorName}    
        </div>
         <div className=" font-thin text-slate-400 pl-2">
         {publishedDate}
         </div>
       </div>
       <div className="text-xl font-semibold pt-2">
        {title}
       </div>
       <div className="text-md font-thin">
        {content.slice(0,100)+"..."}
       </div>
       <div className="font-thin text-slate-400 pt-4">
        {`${Math.ceil(content.length/100)} minutes read`}
       </div>
       
    </div>
    </Link>
}


export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}