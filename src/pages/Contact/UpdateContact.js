import axiosService from "../../services/configAxios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import "./style.css";
import AdminLayout from "../../layouts/AdminLayout";
import ProductInput from "../../components/ProductInput";
import { Modal } from "antd";

function UpdateContact() {
  const { id } = useParams();
  const [contact, setContact] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

 
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    getContact(id);
  }, [id]);

  const getContact = async (id) => {
    try {
      const res = await axiosService.get(`/admin-view-contact/${id}`);
      setContact(res.data.data);
    } catch (error) {
      console.error("Failed to fetch contact", error);
    }
  };

  const updateContact = async () => {
    setIsLoading(true)
    try {
      const res = await axiosService.post(
        `/admin-reply-contact/${id}`,
        contact
      );
      setIsLoading(false)
      setContact(res.data);
      setSuccessMessage("Reply email is successfully!");
      setIsSuccessModalVisible(true);
    } catch (error) {
      setErrorMessage("Failed to update contact !");
      setIsErrorModalVisible(true);
     
    }
  };

  return (
    <AdminLayout>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Forms /</span> Reply email{" "}
          </h4>
          <form onSubmit={handleSubmit(updateContact)}>

            <div className="row">
              <div className="col-xl">
                <div className="card mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Create new category</h5>
                    <small className="text-muted float-end">l</small>
                  </div>
                  <div className="card-body">
                    <ProductInput label="Subject" value={contact.subject} />
                    <ProductInput label="Name" value={contact.name} />
                    <ProductInput label="Email" value={contact.email} />
                    <ProductInput
                      label="Email"
                      value={contact.contact_status}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl">
                <div className="card mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Let's reply your customer ! </h5>
                    <small className="text-muted float-end"></small>
                  </div>
                  <div className="card-body">
                    <textarea
                      {...register("message", {
                        required: "Message is required",
                        validate: (value) =>
                          value.length > 10 ||
                          "Message must be longer than 6 characters"
                      })}
                      type="text"
                      id="message"
                      className="form-control mb-3"
                      placeholder="Enter reply here"
                      onChange={(e) => {
                        setContact({ ...contact, message: e.target.value });
                      }}
                    />
                    <button
                      className="btn btn-primary "
                      type="button"
                      disabled={isLoading}
                      onClick={updateContact}
                    >
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Reply email"
                      )}
                    </button>
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
  );
}

export default UpdateContact;
