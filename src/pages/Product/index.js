import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import axiosService from "../../services/configAxios";
import { Pagination, Modal, Button } from "antd";
import { Link } from "react-router-dom";
import "./style.css";

const numEachPage = 5;

const Product = () => {
  const [products, setProducts] = useState([]);
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);
  const [page, setPage] = useState({ minValue: 0, maxValue: numEachPage });
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const toggleMenu = (index) => {
    setOpenedMenuIndex(index === openedMenuIndex ? null : index);
  };

  const getProductData = async () => {
    try {
      const response = await axiosService.get("/admin-product", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    });
      const responseData = response.data;
      const updatedProducts = {};
      responseData.data.forEach((product) => {
        if (!updatedProducts[product.id]) {
          updatedProducts[product.id] = {
            ...product,
            image_url: product.image_url,
          };
        }
      });
      setProducts(Object.values(updatedProducts));
    } catch (error) {
      console.error("Error fetching product data", error);
      alert("Something went wrong!");
    }
  };
  useEffect(() => {
    getProductData();
  }, []);
  const handleDeleteProduct = async () => {
    try {
      await axiosService.delete(`/admin-product-delete/${selectedProductId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== selectedProductId)
      );
      setIsConfirmModalVisible(false);
      setSuccessMessage('Deleted product successfully!');
      setIsSuccessModalVisible(true);
    } catch (error) {
      setIsConfirmModalVisible(false);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setIsErrorModalVisible(true);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
        setIsErrorModalVisible(true);
      }
    }
  };
  
  const showConfirmModal = (id) => {
    setSelectedProductId(id);
    setIsConfirmModalVisible(true);
  };

  const handleCancel = () => {
    setIsConfirmModalVisible(false);
  };

  const handleChange = (value) => {
    setPage({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage,
    });
  };

  const startIndex = page.minValue;
  const endIndex = page.maxValue;

  return (
    <AdminLayout>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="card">
            <h5 className="card-header">Products</h5>
            <div className="d-flex justify-content">
              <Link
                to={"/create-product"}
                className="btn btn-primary btn-create-new"
              >
                Create new
              </Link>
            </div>
            <div className="table-responsive text-nowrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="table">
                  {products
                    .slice(startIndex, endIndex)
                    .map((product, index) => (
                      <tr key={product.id}>
                        <td>
                          <img
                            className="image-product"
                            src={product.image_url}
                            alt={product.image_name}
                          />
                        </td>
                        <td>{product.product_name}</td>
                        <td>{product.price}</td>
                        <td>{product.discount}</td>
                        <td>{product.quantity}</td>
                        <td>
                          <div className="dropdown">
                            <button
                              type="button"
                              className={`btn p-10 dropdown-toggle hide-arrow ${
                                index === openedMenuIndex ? "show" : ""
                              }`}
                              data-bs-toggle="dropdown"
                              onClick={() => toggleMenu(index)}
                            >
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>

                            <div
                              className={`dropdown-menu ${
                                index === openedMenuIndex ? "show" : ""
                              }`}
                            >
                              <Link
                                className="dropdown-item"
                                to={`/update-product/${product.id}`}
                              >
                                <i className="fa-solid fa-pen"></i> Edit
                              </Link>
                              <button
                                className="dropdown-item"
                                onClick={() => showConfirmModal(product.id)}
                              >
                                <i className="fa-solid fa-trash"></i> Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination
              defaultCurrent={1}
              defaultPageSize={numEachPage}
              onChange={handleChange}
              total={products.length}
              className="product-pagination"
            />
          </div>
        </div>
      </div>
      <Modal
        title="Confirm Deletion"
        visible={isConfirmModalVisible}
        onOk={handleDeleteProduct}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
      <Modal
        title="Success"
        visible={isSuccessModalVisible}
        onOk={() => setIsSuccessModalVisible(false)}
        onCancel={() => setIsSuccessModalVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setIsSuccessModalVisible(false)}>
            OK
          </Button>,
        ]}
      >
        <p>{successMessage}</p>
      </Modal>
      <Modal
        title="Error"
        visible={isErrorModalVisible}
        onOk={() => setIsErrorModalVisible(false)}
        onCancel={() => setIsErrorModalVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setIsErrorModalVisible(false)}>
            OK
          </Button>,
        ]}
      >
        <p>{errorMessage}</p>
      </Modal>
    </AdminLayout>
  );
};

export default Product;
