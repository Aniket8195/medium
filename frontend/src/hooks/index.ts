import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Config"
import axios from "axios";


export interface Blog {
    "content": string;
    "title": string;
    "id": string;
    "author": {
        "name": string
    }
}

export const useBlog=({id}:{id:string})=>{
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    console.log("useBlog",id)
    console.log(id)
    useEffect(()=>{
        const jwt=localStorage.getItem("jwt")
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }).then(response =>{
            console.log(response.data)
                 setBlog(response.data.post)
                    setLoading(false)
        }).catch(error => {
            console.log(error)
        })
    },[id])  


    return {blog, loading}

}
export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const jwt=localStorage.getItem("jwt")
       axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
        headers: {
            'Authorization': `Bearer ${jwt}` 
          }
       }).then(response =>{
              setBlogs(response.data.posts)
              setLoading(false)
         
       })
    },[])

    return { blogs, loading}
}