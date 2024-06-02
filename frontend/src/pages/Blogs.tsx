import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import {useBlogs } from "../hooks/index";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const  Blogs=()=>{
    const {loading ,blogs}=useBlogs()
    if(loading){
        return <div>
            <AppBar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    
    return <div>
        <div>
            <AppBar/>
        </div>
        <div className="flex justify-center">
                <div className="max-w-xl w-full flex flex-col items-center space-y-4">
                    {blogs.map(blog => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={"2nd Feb 2024"}
                        />
                    ))}
                </div>
            </div>
    </div>
}