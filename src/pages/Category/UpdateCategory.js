import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosService from "../../services/configAxios";
import AdminLayout from "../../layouts/AdminLayout";
import { useForm } from "react-hook-form";
import "./style.css";
import { Link } from "react-router-dom";
import {  Modal } from "antd";

function UpdateCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const getDetailCategory = async (id) => {
    try {
      const response = await axiosService.get(`/categories/${id}`);
      setCategoryName(response.data.data.category_name)
    } catch (error) {
      console.log("Error get detail category", error);
    }
  };
  useEffect(() => {
    getDetailCategory(id);
  }, [id]);

  const updateCategory = async () => {
    setIsLoading(true);
    try {
      await axiosService.put(`/categories-update/${id}`,{category_name: categoryName});
      setIsLoading(false);
      setSuccessMessage("Update category successfully!");
      setIsSuccessModalVisible(true);
      // navigate("/categories");
    } catch (error) {
      setErrorMessage("Update category failure !");
      setIsErrorModalVisible(true);
    }
  };
  return (
    <>
      <AdminLayout>
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4">
              <span className="text-muted fw-light">Forms /</span> Update
              category{" "}
            </h4>
            <form onSubmit={handleSubmit(updateCategory)}>
              <div className="row">
                <div className="col-xl">
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Update category</h5>
                      <small className="text-muted float-end">l</small>
                    </div>
                    <div className="card-body">
                      <input
                        {...register("message", {
                          required: "Message is required",
                          validate: (value) =>
                            value.length > 4 ||
                            "Message must be longer than 10 characters"
                        })}
                        type="text"
                        id="message"
                        value={categoryName}
                        onChange={(e) => {
                          setCategoryName(e.target.value);
                        }}
                        className="form-control"
                      />
                      {errors.message && (
                        <p className="error-input">{errors.message.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Link
                      className="btn btn-primary"
                      style={{ marginRight: "10px" }}
                      to={`/categories`}
                    >
                      Back
                    </Link>
                    <button
                      className="btn btn-primary"
                      type="button"
                      disabled={isLoading}
                      onClick={updateCategory}
                    >
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
                <div className="col-xl">
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        Do you want to create new product for category
                      </h5>
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
          <Modal
          className="error"
          title="Error"
          open={isErrorModalVisible}
          onOk={() => setIsErrorModalVisible(false)}
          onCancel={() => setIsErrorModalVisible(false)}
        >
          <p>{errorMessage}</p>
        </Modal>
        <Modal
          title="Success"
          open={isSuccessModalVisible}
          onOk={() => setIsSuccessModalVisible(false)}
          onCancel={() => setIsSuccessModalVisible(false)}
        >
          <p>{successMessage}</p>
        </Modal>
        </div>
      </AdminLayout>
    </>
  );
}

export default UpdateCategory;
