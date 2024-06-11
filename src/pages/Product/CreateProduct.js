import React, { useState, useEffect } from "react";
import { Flex, Input, Select, Modal } from "antd";
import axiosService from "../../services/configAxios";
import "./style.css";
import { useForm } from "react-hook-form";
import AdminLayout from "../../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [branch, setBranch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [productNameError, setProductNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [ingredientsError, setIngredientsError] = useState("");
  const [branchError, setBranchError] = useState("");
  const [imageError, setImageError] = useState("");
  const [categoryIdError, setCategoryIdError] = useState("");
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosService.get("/categories");
        const categoryNames = response.data.data.map((category) => ({
          id: category.id,
          name: category.category_name,
        }));
        setCategoryOptions(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChangeCategory = (value) => {
    setCategoryId(value);
    setCategoryIdError("");
  };
  const handleImageUpload = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImageFiles(selectedFiles);
      setImageError("");
      const imagePreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImages(imagePreviews);
    }
  };
  const validateForm = () => {
    let isValid = true;
    if (!productName) {
      setProductNameError("Product name is required.");
      isValid = false;
    }
    if (!description) {
      setDescriptionError("Description is required.");
      isValid = false;
    }
    if (!price) {
      setPriceError("Price is required.");
      isValid = false;
    } else if (isNaN(price) || parseFloat(price) <= 0) {
      setPriceError("Price must be a number greater than 0.");
      isValid = false;
    }
    if (!discount) {
      setDiscountError("Discount is required.");
      isValid = false;
    } else if (isNaN(discount) || parseFloat(discount) <= 0) {
      setDiscountError("Discount must be a number greater than 0.");
      isValid = false;
    }
    if (!quantity) {
      setQuantityError("Quantity is required.");
      isValid = false;
    } else if (isNaN(quantity) || parseInt(quantity) <= 0) {
      setQuantityError("Quantity must be a number greater than 0.");
      isValid = false;
    }
    if (!ingredients) {
      setIngredientsError("Ingredients are required.");
      isValid = false;
    }
    if (!branch) {
      setBranchError("Branch is required.");
      isValid = false;
    }
    if (!categoryId) {
      setCategoryIdError("Category is required.");
      isValid = false;
    }
    return isValid;
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("quantity", quantity);
    formData.append("ingredient", ingredients);
    formData.append("brand", branch);
    formData.append("category_id", categoryId);
    imageFiles.forEach((file, index) => {
      formData.append(`image_url[${index}]`, file);
    });

    try {
      const response = await axiosService.post("/admin-add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProductName("");
      setDescription("");
      setPrice("");
      setDiscount("");
      setQuantity("");
      setIngredients("");
      setBranch("");
      setCategoryId("");
      setImageFiles([]);
      setImages([]);
      setSuccessMessage("Product created successfully!");
      setIsSuccessModalVisible(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
      setIsErrorModalVisible(true);
    }
  };
  return (
    <AdminLayout>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Forms/</span> Create new
            product{" "}
          </h4>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="row">
              <div className="col-xl">
                <div className="card mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Add new product</h5>
                  </div>
                  <div className="card-body">
                    <Flex vertical gap={32}>
                      <Input
                        placeholder="Enter product name"
                        onChange={(e) => setProductName(e.target.value)}
                        value={productName}
                      />
                      {productNameError && (
                        <div className="error-message">{productNameError}</div>
                      )}
                      <TextArea
                        placeholder="Enter product description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      />
                      {descriptionError && (
                        <div className="error-message">{descriptionError}</div>
                      )}
                      <Input
                        placeholder="Enter product price"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                      {priceError && (
                        <div className="error-message">{priceError}</div>
                      )}
                      <Input
                        placeholder="Enter product discount"
                        onChange={(e) => setDiscount(e.target.value)}
                        value={discount}
                      />
                      {discountError && (
                        <span className="error-message">{discountError}</span>
                      )}
                      <Input
                        placeholder="Enter product quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                      />
                      {quantityError && (
                        <span className="error-message">{quantityError}</span>
                      )}
                      <TextArea
                        placeholder="Enter product ingredients"
                        style={{ height: 120, resize: "none" }}
                        onChange={(e) => setIngredients(e.target.value)}
                        value={ingredients}
                      />
                      {ingredientsError && (
                        <span className="error-message">{ingredientsError}</span>
                      )}
                      <Input
                        placeholder="Enter product brand"
                        onChange={(e) => setBranch(e.target.value)}
                        value={branch}
                      />
                      {branchError && (
                        <span className="error-message">{branchError}</span>
                      )}
                      <Select
                        placeholder="Select category"
                        onChange={handleChangeCategory}
                        value={categoryId}
                      >
                        {categoryOptions.map((category) => (
                          <Option key={category.id} value={category.id}>
                            {category.name}
                          </Option>
                        ))}
                      </Select>
                      {categoryIdError && (
                        <div className="error-message">{categoryIdError}</div>
                      )}
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                        multiple
                      />
                      {imageError && (
                        <div className="error-message">{imageError}</div>
                      )}
                      <div className="image-preview-container">
                        {images.map((image, index) => (
                          <img
                            src={image}
                            alt={`Preview ${index}`}
                            key={index}
                            className="image-preview"
                          />
                        ))}
                      </div>
                      <button className="btn btn-outline-primary" type="submit">
                        Submit
                      </button>
                    </Flex>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal
        title="Success"
        visible={isSuccessModalVisible}
        onOk={() => {
          setIsSuccessModalVisible(false);
          navigate("/products");
        }}
        onCancel={() => setIsSuccessModalVisible(false)}
      >
        <p>{successMessage}</p>
      </Modal>
      <Modal
        title="Error"
        visible={isErrorModalVisible}
        onOk={() => setIsErrorModalVisible(false)}
        onCancel={() => setIsErrorModalVisible(false)}
      >
        <p>{errorMessage}</p>
      </Modal>
    </AdminLayout>
  );
};

export default CreateProduct;
