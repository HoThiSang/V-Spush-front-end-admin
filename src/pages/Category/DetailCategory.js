import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosService from "../../services/configAxios";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import "./style.css"

function DetailCategory() {
  const [category, setCategory] = useState({});
  const { id } = useParams();
  const getDetailCategory = async (id) => {
    try {
      const response = await axiosService.get(`categories/${id}`);
      setCategory(response.data.data);
    } catch (error) {
      console.log("Error get detail category", error);
    }
  };
  useEffect(() => {
    getDetailCategory(id);
  }, [id]);

  return (
    <>
      <AdminLayout>
      <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4">
              <span className="text-muted fw-light">Forms /</span> Detail
              category{" "}
            </h4>
            <form>
              <div className="row">
                <div className="col-xl">
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Create new category</h5>
                      <small className="text-muted float-end">l</small>
                    </div>
                    <div className="card-body">
                      <input
                        value={category.category_name}
                        className="form-control"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl">
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Do you want to create new product</h5>
                      <small className="text-muted float-end"></small>
                    </div>
                    <div className="card-body">
                      <Link className="btn btn-primary" to={`/create-product`}>
                        Create new product
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
export default DetailCategory;
