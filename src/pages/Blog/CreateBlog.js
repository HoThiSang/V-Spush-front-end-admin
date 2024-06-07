import React, { useState } from "react";
import { Flex, Input, Modal } from "antd";
import axiosService from "../../services/configAxios";
import "./style.css";
import { useForm } from "react-hook-form";
const { TextArea } = Input;

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setImageFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("title : ", title);
    console.log("content : ", content);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image_url", imageFile);
    try {
      const response = await axiosService.post("/admin-create-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setTitle("");
      setContent("");
      setImageFile(null);
      setSuccessMessage("Blog created successfully!");
      setIsSuccessModalVisible(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
        setIsErrorModalVisible(true);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
        setIsErrorModalVisible(true);
      }
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Forms/</span> Create new blog{" "}
        </h4>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div class="row">
            <div class="col-xl">
              <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="mb-0">Add new blog</h5>
                  <small class="text-muted float-end">l</small>
                </div>
                <div class="card-body">
                  <Flex vertical gap={32}>
                  {errors.title && <span className="error">{errors.title.message}</span>}
                    <TextArea
                      {...register("title", {
                        required: "Title is required",
                        maxLength: {
                          value: 100,
                          message: "Title must be less than 100 characters"
                        }
                      })}
                      showCount
                      maxLength={100}
                      placeholder="Enter blog title"
                      onChange={handleChangeTitle}
                      value={title}
                    />
                    <TextArea
                      showCount
                      maxLength={500}
                      placeholder="Enter blog content"
                      style={{ height: 120, resize: "none" }}
                      onChange={handleChangeContent}
                      value={content}
                    />
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                    <img src={image} alt="" className="image-fluid" />
                    <button className="btn btn-outline-primary" type="submit">
                      Submit
                    </button>
                  </Flex>
                </div>
              </div>
            </div>
          </div>
        </form>
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
    </div>
  );
};

export default CreateBlog;
