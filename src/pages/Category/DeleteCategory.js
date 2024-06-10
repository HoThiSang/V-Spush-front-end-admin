import { useNavigate, useParams } from "react-router";
import axiosService from "../../services/configAxios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Contact from "../../components/Contact";
import AdminLayout from "../../layouts/AdminLayout";
const DeleteCategory = () => {
  const [category, setCategory] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const getDetailCategory = async () => {
    try {
      const response = await axiosService.get(`/categories/${id}`);
      setCategory(response.data.data);
    } catch (error) {
      console.log("Error get detail category", error);
    }
  };
  useEffect(() => {
    getDetailCategory();
  }, []);

  const deleteCategory = async () => {
    try {
      const response = await axiosService.delete(`/categories-delete/${id}`);
      navigate("/categories");
      console.log("Delete Category successfully");
    } catch (error) {
      console.log("Erroe delete category", error);
    }
  };
  return (
    <>
      <AdminLayout>
        <div className="container">
          <div className="row row-update-contact">
            <div className="col-lg-2"></div>
            <div className="col-lg-8 form-update-contact">
              <Contact title="Delete Category" name="ID" value={category.id} />
              <Contact name="Category Name" value={category.category_name} />
              <Link to="/categories">Turn Back</Link>
              <button onClick={deleteCategory}>Delete</button>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
        <div className="col-lg-2"></div>
      </AdminLayout>
    </>
  );
};
export default DeleteCategory;
