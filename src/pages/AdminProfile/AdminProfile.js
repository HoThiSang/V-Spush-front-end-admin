import React, { useState } from "react";
import axiosService from "../../services/configAxios";
import { Link } from "react-router-dom";
import './AdminProfile.css';
import { Modal } from "antd";

function AdminProfile() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : {};
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    date_of_birth: user.date_of_birth || "",
    address: user.address || "",
    phone: user.phone || "",
    id: user.id || "",
    role_id: user.role_id || "",
    image_url: user.image_url || "https://down-vn.img.susercontent.com/file/cdf9af013aa652eb0596cb252b1101d4_tn",
  });

  const [uploadedImage, setUploadedImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      setFormData({ ...formData, image_url: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id) {
      console.error("User ID is missing. Cannot update information.");
      return;
    }
    try {
      const updateData = new FormData();
      updateData.append("name", formData.name);
      updateData.append("email", formData.email);
      updateData.append("date_of_birth", formData.date_of_birth);
      updateData.append("address", formData.address);
      updateData.append("phone", formData.phone);
      updateData.append("id", formData.id);
      updateData.append("role_id", formData.role_id);

      if (uploadedImage) {
        updateData.append("image_url", uploadedImage);
      }

      const profileResponse = await axiosService.post(`/user/updateInformation/${formData.id}`, updateData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (profileResponse.status === 200) {
        const updatedUser = profileResponse.data.user;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setSuccessMessage("Updated information successfully!");
        setIsSuccessModalVisible(true);
        setValidationErrors({});
      } else {
        console.error("Failed to update user profile");
        setErrorMessage("Failed to update user profile");
        setIsErrorModalVisible(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.errors) {
        setValidationErrors(error.response.data.errors);
        setErrorMessage("Validation failed. Please check the fields and try again.");
      } else {
        console.error("An error occurred while updating user profile:", error);
        setErrorMessage("An error occurred. Please try again later.");
      }
      setIsErrorModalVisible(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      date_of_birth: user.date_of_birth || "",
      address: user.address || "",
      phone: user.phone || "",
      id: user.id || "",
      role_id: user.role_id || "",
      image_url: user.image_url || "https://down-vn.img.susercontent.com/file/cdf9af013aa652eb0596cb252b1101d4_tn",
    });
    setUploadedImage(null);
    setValidationErrors({});
  };

  return (
    <div className="container-fluid profile-container">
      <div className="row">
        <div className="col-md-2 sidebar">
          <div className="side-menu text-center">
            <div className="user-icon">
              <img
                src={formData.image_url}
                alt="user-avatar"
                className="d-block rounded-circle mx-auto"
                height="100px"
                width="100px"
              />
            </div>
            <p className="mt-2">{formData.name}</p>
          </div>
        </div>

        <div className="col-md-10 main-content">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Profile</h2>
            <Link to="/categories" className="btn btn-outline-primary">
              Back
            </Link>
          </div>
          <div id="personal-info" className="section">
            <div className="card mb-4">
              <div className="card-body d-flex align-items-center gap-4">
                <img
                  src={formData.image_url}
                  alt="user-avatar"
                  className="d-block rounded-circle"
                  height="150px"
                  width="150px"
                />
                <div className="button-wrapper">
                  <label htmlFor="upload" className="btn btn-primary me-2 mb-4">
                    <span>Upload new photo</span>
                    <input
                      type="file"
                      id="upload"
                      className="account-file-input"
                      hidden
                      accept="image/png, image/jpeg"
                      onChange={handleImageChange}
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-secondary mb-4"
                    onClick={handleReset}
                  >
                    <span>Reset</span>
                  </button>
                  <p className="text-muted mb-0">
                    Allowed JPG, GIF or PNG. Max size of 800K
                  </p>
                </div>
              </div>
            </div>
            <div className="card-body">
              <form id="formAccountSettings" onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={formData.id} />
                <input type="hidden" name="role_id" value={formData.role_id} />
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {validationErrors.name && (
                      <div className="text-danger">{validationErrors.name[0]}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {validationErrors.email && (
                      <div className="text-danger">{validationErrors.email[0]}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="date_of_birth" className="form-label">
                      Date of birth
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      name="date_of_birth"
                      id="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                    />
                    {validationErrors.date_of_birth && (
                      <div className="text-danger">{validationErrors.date_of_birth[0]}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    {validationErrors.address && (
                      <div className="text-danger">{validationErrors.address[0]}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Phone number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {validationErrors.phone && (
                      <div className="text-danger">{validationErrors.phone[0]}</div>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
  );
}

export default AdminProfile;
