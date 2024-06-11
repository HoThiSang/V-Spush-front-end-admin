import axiosService from "../../services/configAxios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import "./style.css";
import Contact from "../../components/Contact";
import AdminLayout from "../../layouts/AdminLayout";

function UpdateContact() {
  const { id } = useParams();
  const [contact, setContact] = useState({});
  const [success, setSuccess] = useState("Let's reply");
  const navigate =useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getContact();
  }, []);

  const getContact = async () => {
    try {
      const res = await axiosService.get(`/admin-view-contact/${id}`);
      setContact(res.data.data);
    } catch (error) {
      console.error("Failed to fetch contact", error);
    }
  };

  const updateContact = async () => {
    try {
      const res = await axiosService.post(
        `/admin-reply-contact/${id}`,
        contact
      );
      setContact(res.data);
      setSuccess("Successfully");
     
    } catch (error) {
      console.error("Failed to update contact", error);
      setSuccess("");
    }
  };

  return (
    <AdminLayout>
    <div className="container">
      <div className="row row-update-contact">
        <div className="col-lg-2"></div>
        <div className="col-lg-8 form-update-contact">
          <form onSubmit={handleSubmit(updateContact)}>
            <Contact name="Name" value={contact.name} title="Update Contact" />
            <Contact name="Email" value={contact.email} />
            <Contact name="Subject" value={contact.subject} />
            <Contact name="Contact Status" value={contact.contact_status} />
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-8">
                <br />
                <label htmlFor="message" className="object-contact">
                  Message Reply
                </label>
                <br />
                <textarea
                  {...register("message", {
                    required: "Message is required",
                    validate: (value) =>
                      value.length > 10 ||
                      "Message must be longer than 6 characters",
                  })}
                  type="text"
                  id="message"
                  placeholder="Enter reply here"
                  onChange={(e) => {
                    setContact({ ...contact, message: e.target.value });
                  }}
                  className="input-update-contact"
                />
              </div>
              <div className="col-lg-2"></div>
            </div>
            <div className="row">
              <div className="col-lg-2">
                <input
                  htmlFor=""
                  className="success-contact"
                  value={success}
                  disabled
                />
              </div>
              <div className="col-lg-8">
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
                <br />
              </div>
              <div className="col-lg-2"></div>
            </div>
            <br />
          </form>
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
    </AdminLayout>
  );
}

export default UpdateContact;
