import { useState } from "react"
import { axiosInstance } from "../axiosConfig";

export default function BlogForm({setIsOpen}){
    const [data, setData] = useState("");

    const addBlogPost = async (e) => {
        e.preventDefault();
        try{
            const bodyData = {
                post: data
            }
            const res = await axiosInstance({
                method: 'post',
                url: '/post',
                headers: {
                  "Content-Type": "application/json"
                },
                data: JSON.stringify(bodyData)
            })
            setData("");
            setIsOpen(false);
            console.log(res);
        }
        catch(error){
            console.log(error.response);
        }
    }

    return(
        <form id="blog-input-form" onSubmit={addBlogPost}>
            <h4>Blog Form</h4>
            <textarea placeholder="body of blog" row={10} col={20} value={data} onChange={(e) => {setData(e.target.value)}} />
            <div>
                <button>Add</button>
                <button onClick={() => {setIsOpen(false)}}>Cancel</button>
            </div>
        </form>
    )   
}