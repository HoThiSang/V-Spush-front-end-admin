import { useEffect, useState } from "react";
import ProductInput from "../../components/ProductInput";
import AdminLayout from "../../layouts/AdminLayout";
import { Input } from "antd";
import { useParams } from "react-router";
import axiosService from "../../services/configAxios";
const { TextArea } = Input;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState([]);
  const [producName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [categoryName, setCategoryName] = useState(0);
  const [ingredient, setIngredient] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      alert("Something wrong when get data");
    }
  };

  useEffect(() => {
    getproductData(id);
  }, [id]);

  const handleImageUpload = (e) => {
    try {
      setLoading(true);
      const tempArr = [];

      for (const file of e.target.files) {
        console.log("file >>> ", file);

        tempArr.push({
          data: file,
          url: URL.createObjectURL(file)
        });
      }

      setPictures(tempArr);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitForm = async(e) => {
    e.preventDefault();
    console.log("product name : ", producName);
    console.log("product price : ", price);
    console.log("product category : ", categoryName);
    console.log("product brand : ", brand);
    console.log("product category id : ", categoryId);
    console.log("product image : ", pictures);
    const formData = new FormData();
    formData.append("product_name", producName);
    const response =  await axiosService.post(`/admin-product-update/${id}`, )
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
                      onchange={(e) => setProductName(e.target.value)}
                    />
                    <ProductInput
                      label="Brand"
                      icon="fa-solid fa-copyright"
                      type="text"
                      name="brand"
                      onchange={(e) => setBrand(e.target.value)}
                      value={brand}
                    />
                    <ProductInput
                      label="Quantity"
                      icon="fa-solid fa-q"
                      type="number"
                      name="quantity"
                      value={quantity}
                      onchange={(e) => setQuantity(e.target.value)}
                    />
                    <ProductInput
                      label="Price"
                      icon="fa-solid fa-barcode"
                      type="text"
                      name="price"
                      value={price}
                      onchange={(e) => setPrice(e.target.value)}
                    />
                    <ProductInput
                      label="Category"
                      icon=""
                      type="text"
                      name=""
                      value={categoryName}
                    />
                    <TextArea
                      type="text"
                      showCount
                      maxLength={1000}
                      placeholder="Ingredient for your product"
                      style={{ height: 120, resize: "none" }}
                      value={ingredient}
                      onchange={(e) => setIngredient(e.target.value)}
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
                <button type="submit" className="btn btn-outline-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          {pictures.map((picture, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <img
                src={picture.url}
                alt={`Uploaded  ${index + 1}`}
                className="img-fluid"
              />
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateProduct;
