import React, { useState, useEffect } from "react";
import axiosService from "../../services/configAxios";
import { useParams } from "react-router";
import { Flex, Input, Modal } from "antd";
import AdminLayout from "../../layouts/AdminLayout";
import "./style.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const { TextArea } = Input;

const UpdateBanner = () => {
    const [banner, setBanner] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const navigate = useNavigate(); // Sử dụng hook useNavigate

    const { id } = useParams();

    const getBannerData = async (id) => {
        try {
            const response = await axiosService.get(`/admin-show-banner/${id}`);
            setBanner(response.data.data);
            setTitle(response.data.data.title);
            setSubTitle(response.data.data.sub_title);
            setContent(response.data.data.content);
            setImage(response.data.data.image_url);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
                setIsErrorModalVisible(true);
            } else {
                setErrorMessage("An error occurred. Please try again later.");
                setIsErrorModalVisible(true);
            }
        }
    };

    useEffect(() => {
        getBannerData(id);
    }, [id]);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeContent = (e) => {
        setContent(e.target.value);
    };

    const handleChangeSubTitle = (e) => {
        setSubTitle(e.target.value);
    };

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setImageFile(e.target.files[0]);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("sub_title", subTitle);
        formData.append("content", content);
        if (imageFile) {
            formData.append("image_url", imageFile);
        }

        try {
            await axiosService.post(`/admin-update-banner/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setSuccessMessage('Banner updated successfully!');
            setIsSuccessModalVisible(true);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
                setIsErrorModalVisible(true);
            } else {
                setErrorMessage("An error occurred. Please try again later.");
                setIsErrorModalVisible(true);
            }
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
                        <span className="text-muted fw-light">Forms/</span>Update Banner
                    </h4>
                    <form onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="col-xl">
                                <div className="card mb-4">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0">Update Banner</h5>
                                        <small className="text-muted float-end">l</small>
                                    </div>
                                    <div className="card-body">
                                        <Flex vertical gap={32}>
                                            <TextArea
                                                showCount
                                                maxLength={100}
                                                placeholder="Enter banner title"
                                                onChange={handleChangeTitle}
                                                value={title}
                                            />
                                            <TextArea
                                                showCount
                                                maxLength={500}
                                                placeholder="Enter banner content"
                                                onChange={handleChangeContent}
                                                value={content}
                                            />
                                            <TextArea
                                                showCount
                                                maxLength={5000}
                                                placeholder="Enter banner sub-title"
                                                style={{ height: 140, resize: "none" }}
                                                onChange={handleChangeSubTitle}
                                                value={subTitle}
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                            <img
                                                src={image ? image : banner.image_url}
                                                alt={banner.image_name}
                                                className="img-fluid custom-image"
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
                    <Modal
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
        </AdminLayout>
    );
};

export default UpdateBanner;
