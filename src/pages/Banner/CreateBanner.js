import React, { useState, useEffect } from "react";
import axiosService from "../../services/configAxios";
import { useNavigate } from "react-router-dom";
import { Flex, Input, Button, Modal } from "antd";
import './style.css';
import AdminLayout from "../../layouts/AdminLayout";
const { TextArea } = Input;

const CreateBanner = () => {
    const [title, setTitle] = useState("");
    const [sub_title, setSubTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [subTitleError, setSubTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [imageError, setImageError] = useState('');
    const navigate = useNavigate();

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
        setTitleError('');
    };

    const handleChangeSubTitle = (e) => {
        setSubTitle(e.target.value);
        setSubTitleError('');
    };

    const handleChangeContent = (e) => {
        setContent(e.target.value);
        setContentError('');
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImageError('');
    };

    const validateForm = () => {
        let isValid = true;
        if (!title) {
            setTitleError('Title is required.');
            isValid = false;
        }
        if (!sub_title) {
            setSubTitleError('Sub title is required.');
            isValid = false;
        }
        if (!content) {
            setContentError('Content is required.');
            isValid = false;
        }
        if (!imageFile) {
            setImageError('Image is required.');
            isValid = false;
        } else if (imageFile && !imageFile.type.startsWith('image/')) {
            setImageError('Only image files are allowed.');
            isValid = false;
        }
        return isValid;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('sub_title', sub_title);
        formData.append('content', content);
        if (imageFile) {
            formData.append('image_url', imageFile);
        }

        try {
            const response = await axiosService.post("/admin-create-banner", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTitle('');
            setSubTitle('');
            setContent('');
            setImageFile(null);
            setIsSuccessModalVisible(true);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
            setIsErrorModalVisible(true);
        }
    };

    useEffect(() => {
        if (isSuccessModalVisible) {
            navigate("/banner");
        }
    }, [isSuccessModalVisible, navigate]);

    return (
        <AdminLayout>
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                    <span className="text-muted fw-light">Forms/</span> Create new Banner{" "}
                </h4>
                <form onSubmit={handleFormSubmit}>
                    <div className="row">
                        <div className="col-xl">
                            <div className="card mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Add new banner</h5>
                                    <small className="text-muted float-end">l</small>
                                </div>
                                <div className="card-body">
                                    <Flex vertical gap={32}>
                                        <div>
                                            <TextArea
                                                showCount
                                                maxLength={100}
                                                placeholder="Enter banner title"
                                                onChange={handleChangeTitle}
                                                value={title}
                                            />
                                            {titleError && <div className="error-message">{titleError}</div>}
                                        </div>
                                        <div>
                                            <TextArea
                                                showCount
                                                maxLength={500}
                                                placeholder="Enter banner content"
                                                style={{ height: 120, resize: "none" }}
                                                onChange={handleChangeContent}
                                                value={content}
                                            />
                                            {contentError && <div className="error-message">{contentError}</div>}
                                        </div>
                                        <div>
                                            <TextArea
                                                showCount
                                                maxLength={500}
                                                placeholder="Enter banner sub title"
                                                style={{ height: 120, resize: "none" }}
                                                onChange={handleChangeSubTitle}
                                                value={sub_title}
                                            />
                                            {subTitleError && <div className="error-message">{subTitleError}</div>}
                                        </div>
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                            {imageError && <div className="error-message">{imageError}</div>}
                                        </div>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Flex>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <Modal className="error"
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
                </Modal>
            </div>
            </div>
        </AdminLayout>
    );
};

export default CreateBanner;
