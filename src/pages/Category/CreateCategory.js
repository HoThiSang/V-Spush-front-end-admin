import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosService from "../../services/configAxios";
import { useNavigate } from "react-router";
import AdminLayout from "../../layouts/AdminLayout";
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
  const getName=(e)=>{
    setName(e.target.value)
    console.log(e.target.value)
}

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
                  <br />
                  <label htmlFor="message" className="object-contact">
                    Message Reply
                  </label>
                  <br />
                  <input
                    {...register("message", {
                      required: "Message is required",
                      validate: (value) =>
                        value.length > 10 ||
                        "Message must be longer than 10 characters",
                    })}
                    type="text"
                    id="message"
                    placeholder="Enter category here"
                    onChange={getName}
                    className="input-update-contact"
                  />
                </div>
                <br />
                {errors.message && (
                  <p className="error-input">{errors.message.message}</p>
                )}

                <button
                  type="submit"
                  className="btn btn-outline-primary input-update-contact"
                >
                  Submit
                </button>
                
                <div className="col-lg-2"></div>
              </div>
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
