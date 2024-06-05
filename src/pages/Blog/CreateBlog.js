import React, { useState, useEffect } from "react";
import { Flex, Input, Button, Modal } from "antd";
import axiosService from "../../services/configAxios";
import { useNavigate } from "react-router";
import './style.css'
const { TextArea } = Input;

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("title : ", title);
    console.log("content : ", content);
    try {
      const response = await axiosService.post("/admin-create-post", {
        title,
        content
      });
      setTitle('');
      setContent('');
      setSuccessMessage('Blog created successfully!');
      setIsSuccessModalVisible(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setIsErrorModalVisible(true);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
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
        <form onSubmit={handleFormSubmit}>
          <div class="row">
            <div class="col-xl">
              <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="mb-0">Add new blog</h5>
                  <small class="text-muted float-end">l</small>
                </div>
                <div class="card-body">
                  <Flex vertical gap={32}>
                    <TextArea
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
                      value={imageFile}
                    />
                    <button className="btn btn-outline-primary" type="submit">
                      Submit
                    </button>
                  </Flex>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Modal  className="error"
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