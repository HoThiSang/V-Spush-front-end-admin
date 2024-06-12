import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosService from "../../services/configAxios";
import { useNavigate } from "react-router";
import AdminLayout from "../../layouts/AdminLayout";
import "./style.css";
import { Link } from "react-router-dom";

function CreateCategory() {
  const [category_name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const createCategory = async () => {
    setIsLoading(true);
    try {
       await axiosService.post(`/categories-create`, {
        category_name
      });
      setIsLoading(false);
      navigate("/categories");
    } catch (error) {
      console.log("Error create category", error);
    }
  };
  const getName = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <AdminLayout>
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4">
              <span className="text-muted fw-light">Forms /</span> Create new
              category{" "}
            </h4>
            <form onSubmit={handleSubmit(createCategory)}>
              <div className="row">
                <div className="col-xl">
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Create new category</h5>
                      <small className="text-muted float-end">l</small>
                    </div>
                    <div className="card-body">
                      <input
                        {...register("message", {
                          required: "Message is required",
                          validate: (value) =>
                            value.length > 10 ||
                            "Message must be longer than 6 characters"
                        })}
                        value={category_name}
                        type="text"
                        id="message"
                        placeholder="Enter category here"
                        onChange={getName}
                        className="form-control"
                      />
                      {errors.message && (
                        <p className="error-input">{errors.message.message}</p>
                      )}
                    </div>
                    
                  </div>
                  <Link className="btn btn-primary" style={{ marginRight: '10px' }} to={`/categories`}>Back</Link>
                  <button
                      className="btn btn-primary"
                      type="button"
                      disabled={isLoading}
                      onClick={createCategory}
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
export default CreateCategory;
