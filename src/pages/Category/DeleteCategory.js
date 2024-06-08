import { useNavigate, useParams } from "react-router";
import axiosService from "../../services/configAxios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DeleteCategory =()=>{
    const [category,setCategory]=useState({});
    const {id} =useParams();
    const navigate=useNavigate();
    const getDetailCategory=async ()=>{
        try {
            const response=await axiosService.get(`/categories/${id}`);
            setCategory(response.data.data);
            
        } catch (error) {
      console.log("Error get detail category", error);
            
        }
    };
    useEffect(()=>{
        getDetailCategory();
    },[]);

    const deleteCategory = async()=>{
        try {
            const response= await axiosService.delete(`/categories-delete/${id}`);
            navigate('/categories')
            console.log("Delete Category successfully")   
        } catch (error) {
            console.log("Erroe delete category",error)
        }
    };
    return(
    <div className="container">
      <div className="row row-update-contact">
        <div className="col-lg-2"></div>
        <div className="col-lg-8 form-update-contact">
          <div className="row">
            <div className="col-lg-2">
              <h3 className="update-contact">Detail Contact</h3>
            </div>
            <div className="col-lg-8">
              <label htmlFor="name" className="object-contact">
                ID
              </label>
              <br />
              <input
                type="text"
                name=""
                id=""
                value={category.id}
                className="input-update-contact"
              />
            </div>
            <div className="col-lg-2"></div>
          </div>
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <br />
              <label htmlFor="email" className="object-contact">
                Name
              </label>
              <br />
              <input
                type="text"
                name=""
                id=""
                value={category.category_name}
                className="input-update-contact"
              />
              <Link to="/categories">Turn Back</Link>
              <button onClick={deleteCategory}>Delete</button>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
    );
}
export  default DeleteCategory;