import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import axiosService from "../../services/configAxios";
import AdminLayout from "../../layouts/AdminLayout";
import { useForm } from "react-hook-form";

function UpdateCategory(){
    const [category,setCategory]=useState({});
    const navigate=useNavigate()
    const {id} = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const getDetailCategory= async () => {
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

    const updateCategory= async() =>{
        try {
            const response=await axiosService.put(`/categories-update/${id}`,category)
            // setCategory(response.data);
            navigate('/categories');
           
        } catch (error) {
           
        }
    }
     return (
        <>
        <AdminLayout>
        <div className="container">
      <div className="row row-update-contact">
        <div className="col-lg-2"></div>
        <div className="col-lg-8 form-update-contact">
          <form onSubmit={handleSubmit(updateCategory)}>
            <div className="row">
              <div className="col-lg-2">
              <h3 className="update-contact">Update Category</h3>
              </div>
              <div className="col-lg-8">
                <br />
                <label htmlFor="message" className="object-contact">
                 Category Name
                </label>
                <br />
                <input
                  {...register("message", {
                    required: "Message is required",
                    validate: (value) =>
                      value.length > 4 ||
                      "Message must be longer than 10 characters",
                  })}
                  type="text"
                  id="message"
                  value={category.category_name}
                  onChange={(e) => {
                    setCategory({ ...category, category_name: e.target.value });
                  }}
                  className="input-update-contact"
                />
              </div>
              <div className="col-lg-2"></div>
            </div>
            <br />
                {errors.message && (
                  <p className="error-input">{errors.message.message}</p>
                )}
                <button
                  type="submit"
                  className="btn btn-outline-primary input-update-contact"
                >
                  Update
                </button>
          </form>
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
        </AdminLayout>
        </>
    )
}

export default UpdateCategory