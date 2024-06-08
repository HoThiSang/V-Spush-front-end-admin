import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import axiosService from "../../services/configAxios";
import { useNavigate } from "react-router";
function CreateCategory(){
    const [category_name,setName]=useState('');
    const navigate=useNavigate();
    const createCategory =async (e) =>{
        e.preventDefault();
        try {
            const response=await axiosService.post(`/categories-create`,{category_name});
            navigate('/categories')
        } catch (error) {
            console.log("Error create category", error);
        }
    };
    const getName=(e)=>{
        setName(e.target.value)
        console.log(e.target.value)
    }
    return(
        <>
            <form onSubmit={createCategory}>
                <input type="text" name="" id="" value={category_name} onChange={getName} />
                <button type="submit">Create</button>
            </form>
        </>
    )
    
};
export default CreateCategory;