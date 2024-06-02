import { useBlog } from "../hooks/index";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { AppBar } from "../components/AppBar";
import { FullBlog } from "../components/FullBlog";
import { useParams } from "react-router-dom";

export const Blog=()=> {
    const { id } = useParams<{ id: string }>();

    const { loading, blog } = useBlog({ id: id! });


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
    if (!blog) {
        return (
            <div>
                <AppBar />
                <div className="flex justify-center">
                    <p>Blog not found.</p>
                </div>
            </div>
        );
    }
    return <div>
        <div>
            <AppBar/>
        </div>
        <FullBlog blog={blog}/>
    </div>
}