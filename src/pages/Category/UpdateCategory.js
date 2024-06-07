import { useEffect, useState } from "react"
import { useParams } from "react-router"
import axiosService from "../../services/configAxios";

function UpdateCategory(){
    const [name,setCategory]=useState({})
    const {id} = useParams();
    const getDetailCategory= async () => {
        try {
            const response=await axiosService.get(`/categories/${id}`);
            setCategory(response.data);
            
        } catch (error) {
            console.log("Error get detail category", error);
        }
    };
    useEffect(()=>{
        getDetailCategory();
    },[]);
    const updateCategory= async(e) =>{
        e.preventDefault();
        try {
            const response=await axiosService.put(`/categories-update/${id}`,{name})
            setCategory(response.data)
            
        } catch (error) {
            
        }
    }
     return (
        <>

        </>
    )
}