import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import axiosService from "../../services/configAxios";
import { Link } from "react-router-dom";
import './style.css'

const Product = () => {
  const [products, setProducts] = useState([]);
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenedMenuIndex(index === openedMenuIndex ? null : index);
  };

  const getProductData = async () => {
    try {
      const response = await axiosService.get("/admin-product");
      setProducts(response.data.data);
    } catch (error) {
      alert("Something wrong !");
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleDeleteProduct = () => {

  };

  return (
    <AdminLayout>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="card">
            <h5 className="card-header">Products</h5>
            <div className="d-flex justify-content">
              <Link to={""} className="btn btn-primary btn-create-new" id="">
                Create new
              </Link>
            </div>
            <div className="table-responsive text-nowrap">
              <table className="table">
                <thead>
                  <tr>
                    <th  scope="col">Image</th>
                    <th  scope="col">Product Name</th>
                    <th  scope="col">Price</th>
                    <th  scope="col">Discount </th>
                    <th  scope="col">Quantity</th>
                    <th  scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="table">
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <img className="image-product" src={product.image_url} alt={product.image_name} />
                      </td>
                      <td>{product.product_name}</td>
                      <td>{product.price}</td>
                      <td>{product.discount}</td>
                      <td>{product.quantity}</td>
                      <td><div className="dropdown">
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
                            to={`/`}
                          >
                            <i className="fa-solid fa-pen"></i> Edit
                          </Link>

                          <button
                            className="btn"
                            onClick={() => handleDeleteProduct()}
                          >
                            <i className="fa-solid fa-trash"></i>
                            Delete
                          </button>
                        </div>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Product;
