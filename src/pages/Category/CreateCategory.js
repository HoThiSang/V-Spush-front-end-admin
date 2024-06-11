import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosService from "../../services/configAxios";
import { useNavigate } from "react-router";
import AdminLayout from "../../layouts/AdminLayout";
import "./style.css";
import { Link } from "react-router-dom";
function CreateCategory() {
  const [category_name, setName] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const createCategory = async () => {
    try {
      const response = await axiosService.post(`/categories-create`, {
        category_name,
      });
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
        <div className="container">
          <div className="row row-update-contact">
            <div className="col-lg-2"></div>
            <div className="col-lg-8 form-update-contact">
              <form onSubmit={handleSubmit(createCategory)}>
                <div className="row">
                  <div className="col-lg-2"></div>
                  <div className="col-lg-8">
                    <h3 className="update-contact">Create Category</h3>
                    <label htmlFor="message" className="object-contact">
                      Message Reply
                    </label>
                    <br />
                    <input
                      {...register("message", {
                        required: "Message is required",
                        validate: (value) =>
                          value.length > 10 ||
                          "Message must be longer than 6 characters",
                      })}
                      type="text"
                      id="message"
                      placeholder="Enter category here"
                      onChange={getName}
                      className="input-update-contact"
                    />
                {errors.message && (
                  <p className="error-input">{errors.message.message}</p>
                )}
                  </div>

                  <div className="col-lg-2"></div>
                </div>
                <br/>
                <br />
                <Link to="/categories" className="btn btn-primary btn-create-new btn-detail-category">Turn Back</Link>

                <button
                  type="submit"
                  className="btn btn-primary btn-create-new"
                >
                  Create
                </button>
              </form>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
export default CreateCategory;
