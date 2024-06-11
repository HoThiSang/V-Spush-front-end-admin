import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosService from "../../services/configAxios";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import Contact from "../../components/Contact";
import "./style.css"

function DetailCategory() {
  const [category, setCategory] = useState({});
  const { id } = useParams();
  const getDetailCategory = async () => {
    try {
      const response = await axiosService.get(`categories/${id}`);
      setCategory(response.data.data);
    } catch (error) {
      console.log("Error get detail category", error);
    }
  };
  useEffect(() => {
    getDetailCategory();
  }, []);

  return (
    <>
      <AdminLayout>
        <div className="container">
          <div className="row row-update-contact">
            <div className="col-lg-2"></div>
            <div className="col-lg-8 form-update-contact">
              <Contact title="Detail Contact" name="ID" value={category.id} />
              <Contact name="Category Name" value={category.category_name} />
              <br/>
              <Link to="/categories" className="btn btn-primary btn-create-new btn-detail-category">Turn Back</Link>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
        <div className="col-lg-2"></div>
      </AdminLayout>
    </>
  );
}
export default DetailCategory;
