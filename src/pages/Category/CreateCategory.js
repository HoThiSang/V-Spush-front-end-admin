import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosService from "../../services/configAxios";
import { useNavigate } from "react-router";
import AdminLayout from "../../layouts/AdminLayout";
import Contact from "../../components/Contact";
function CreateCategory() {
  const [category_name, setName] = useState("");
  const [success, setSuccess] = useState("Let's create");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const createCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosService.post(`/categories-create`, {
        category_name,
      });
      setSuccess("Create category successfully");
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
                <Contact
                  name ="Category name"
                  value={category_name}
                  title="Create Category"
                  onChange={getName}
                  {...register("message", {
                    required: "Message is required",
                    validate: (value) =>
                      value.length > 10 ||
                      "Message must be longer than 10 characters",
                  })}
                />
<br />
                {errors.message && (
                  <p className="error-input">{errors.message.message}</p>
                )}
                <button type="submit">Create</button>
              </form>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
export default CreateCategory;
