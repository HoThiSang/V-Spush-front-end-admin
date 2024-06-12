import { useEffect, useState } from "react";
import ProductInput from "../../components/ProductInput";
import AdminLayout from "../../layouts/AdminLayout";
import { Input } from "antd";
import { useParams } from "react-router";
import axiosService from "../../services/configAxios";
import { Link } from "react-router-dom";
const { TextArea } = Input;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState([]);
  const [producName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState("");
  const [categoryName, setCategoryName] = useState(0);
  const [ingredient, setIngredient] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const getproductData = async (id) => {
    try {
      const response = await axiosService.get(`/admin-product-detail/${id}`);
      setImage(response.data.imageData);
      setCategories(response.data.categoriesData);
      setProductName(response.data.productData.product_name);
      setBrand(response.data.productData.brand);
      setCategoryName(response.data.categoryData.category_name);
      setQuantity(response.data.productData.quantity);
      setIngredient(response.data.productData.ingredient);
      setDescription(response.data.productData.description);
      setPrice(response.data.productData.price);
      setDiscount(response.data.productData.discount);
    } catch (error) {
      alert("Something wrong when get data");
    }
  };

  useEffect(() => {
    getproductData(id);
  }, [id]);

  const handleImageUpload = (e) => {
    try {
      setPictures([...pictures, ...e.target.files]);
      let data = [];
      for (let i = 0; i < pictures.length; i++) {
        data.append(i);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
      setIsLoading(true)
    const formData = new FormData();

    formData.append("discount", discount);

    if (!ingredient) {
      alert("The ingredient field is required.");
      return;
    }
    formData.append("ingredient", ingredient);

    for (let i = 0; i < pictures.length; i++) {
      if (
        ![
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/gif",
          "image/webp"
        ].includes(pictures[i].type)
      ) {
        alert(
          `The image_url.${i} field must be a file of type: jpeg, png, jpg, gif, webp.`
        );
        return;
      }
      formData.append(`image_url[${i}]`, pictures[i]);
    }

    formData.append("product_name", producName);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("category_id", categoryId);
    formData.append("ingredient", ingredient);

    try {
        await axiosService.post(
        `/admin-product-update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      alert("Update product successfully!");
      setIsLoading(false)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        for (const key in errors) {
          alert(`${key}: ${errors[key][0]}`);
        }
      } else {
        alert("Update product wrong!");
      }
    }
  };
  return (
    <AdminLayout>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Forms/</span> Update product
          </h4>
          <form onSubmit={handleSubmitForm}>
            <div className="row">
              <div className="col-xl">
                <div className="card mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Update products</h5>
                    <small className="text-muted float-end">l</small>
                  </div>
                  <div className="card-body">
                    <ProductInput
                      label="Product name"
                      icon="fa-brands fa-product-hunt"
                      type="text"
                      name="product_name"
                      value={producName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                    <ProductInput
                      label="Brand"
                      icon="fa-solid fa-copyright"
                      name="brand"
                      onChange={(e) => setBrand(e.target.value)}
                      value={brand}
                    />
                    <ProductInput
                      label="Quantity"
                      icon="fa-solid fa-q"
                      name="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <ProductInput
                      label="Discount"
                      icon="fa-solid fa-q"
                      name="discount"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                    <ProductInput
                      label="Price"
                      icon="fa-solid fa-barcode"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <ProductInput
                      label="Category"
                      icon="fa-solid fa-list"
                      name="category"
                      value={categoryName}
                      onChange={(e) => setCategories(e.target.value)}
                    />
                    <TextArea
                      showCount
                      maxLength={1000}
                      placeholder="Ingredient for your product"
                      style={{ height: 120, resize: "none" }}
                      value={ingredient}
                      onChange={(e) => setIngredient(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl">
                <div className="card mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Update product</h5>
                    <small className="text-muted float-end">
                      Merged input group
                    </small>
                  </div>

                  <div className="card-body">
                    <div className="mb-3">
                      <label
                        className="form-label"
                        for="basic-icon-default-company"
                      >
                        Category name
                      </label>
                      <div className="">
                        <select
                          name="category_id"
                          id="category_name"
                          className=" form-select"
                          onChange={(e) => setCategoryId(e.target.value)}
                        >
                          <option value="">
                            --Choose a category for product--
                          </option>
                          {categories.map((category) => (
                            <option
                              key={category.id}
                              name="category_id"
                              value={category.id}
                            >
                              {category.category_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <TextArea
                      showCount
                      maxLength={2000}
                      placeholder="Description for your product"
                      style={{ height: 200, resize: "none" }}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <p></p>
                    <div className="mb-3 mt-6">
                      <input
                        type="file"
                        className="form-control"
                        id="images"
                        name="images[]"
                        multiple
                        onChange={handleImageUpload}
                      />
                      <small className="text-muted">
                        Select one or more images to upload (max: 4MB per image)
                      </small>
                    </div>
                  </div>
                </div>
                <Link to={'/products'}>
                <button  className="btn btn-outline-primary back">
                  Back
                </button>
                </Link>
                <button
                      className="btn btn-primary"
                      type="button"
                      disabled={isLoading}
                      onClick={handleSubmitForm}
                    >
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Delete"
                      )}
                    </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateProduct;
