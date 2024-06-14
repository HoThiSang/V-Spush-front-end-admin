import { useEffect, useState } from "react";
import axiosService from "../../services/configAxios";
import { useParams } from "react-router";
import { Flex, Input, Modal } from "antd";
import AdminLayout from "../../layouts/AdminLayout";
const { TextArea } = Input;

const UpdateBlog = () => {
  const [blog, setBlog] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null)

    const {id} = useParams();
    console.log(id)
    const getBlogData = async (id) => {
    try {
      const response = await axiosService.get(`/admin-show-post/${id}`);
      setBlog(response.data.data)
      setTitle(response.data.data.title);
      setContent(response.data.data.content);
      setImage(response.data.data.image_url);
    } catch (error) {
      if ( error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setIsErrorModalVisible(true);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
        setIsErrorModalVisible(true);
      }
    }
  };

  useEffect(()=> {
    getBlogData(id);
  }, [id])


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
    setIsLoading(true)
    try {
       await axiosService.post(`/admin-update-post/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
       setSuccessMessage('Blog updated successfully!');
      setIsSuccessModalVisible(true);
      setIsLoading(false)
    } catch (error) {
        if ( error.response && error.response.data && error.response.data.message) {
            setErrorMessage(error.response.data.message);
            setIsErrorModalVisible(true);
          } else {
            setErrorMessage("An error occurred. Please try again later.");
            setIsErrorModalVisible(true);
          }
    }
  };
  return (
    <AdminLayout>
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Forms/</span>Update blog{" "}
        </h4>
        <form onSubmit={handleFormSubmit}>
          <div class="row">
            <div class="col-xl">
              <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="mb-0">Update blog</h5>
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
                      maxLength={5000}
                      placeholder="Enter blog content"
                      style={{ height: 140, resize: "none" }}
                      onChange={handleChangeContent}
                      value={content}
                    />
                    <input
                      type="file"
                      multiple="multiple"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />

                    <img  src={image ? image: blog.image_url } alt={blog.image_name}  className="image-fluid"/>
                    <button
                      className="btn btn-primary"
                      type="button"
                      disabled={isLoading}
                      onClick={handleFormSubmit}
                    >
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Update"
                      )}
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
    </AdminLayout>
  );
};

export default UpdateBlog;
