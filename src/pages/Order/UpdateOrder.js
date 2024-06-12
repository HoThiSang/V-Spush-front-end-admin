import AdminLayout from "../../layouts/AdminLayout";
import ProductInput from "../../components/ProductInput";
import { useEffect, useState } from "react";
import axiosService from "../../services/configAxios";
import { useParams } from "react-router";
import { Modal } from "antd";

const UpdateOrder = () => {
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const { id } = useParams();

  const getOrderData = async (id) => {
    try {
      const response = await axiosService.get(`/admin-show-detail-order/${id}`);
      setOrder(response.data.data);
      setStatus(response.data.data.order_status);
    } catch (error) {
      alert("Something wrong !");
    }
  };

  useEffect(() => {
    getOrderData(id);
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("order_status", status);
      await axiosService.post(`/admin-update-status-order/${id}`, formData);
      setIsLoading(false);
      setOrder({ ...order, order_status: status });
      setSuccessMessage("Update order status successfully!");
      setIsSuccessModalVisible(true);
    } catch (error) {
      setErrorMessage("Update order status have been wrong !");
      setIsErrorModalVisible(true);
    }
  };

  return (
    <AdminLayout>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Forms/</span>Update status
            order{" "}
          </h4>
          <form onSubmit={handleFormSubmit}>
            <div class="row">
              <div class="col-xl">
                <div class="card mb-4">
                  <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Update order</h5>
                    <small class="text-muted float-end">l</small>
                  </div>
                  <div class="card-body">
                    <ProductInput
                      label="Phone number"
                      value={order.phone_number}
                    />
                    <ProductInput label="Phone number" value={order.address} />
                    <ProductInput
                      label="Payment method"
                      value={order.payment_method}
                    />
                    <ProductInput
                      label="Payment method"
                      value={order.order_status}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl">
                <div className="card mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Update order</h5>
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
                        Order status
                      </label>
                      <div className="">
                        <select
                          name="category_id"
                          id="category_name"
                          className=" form-select"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="">
                            --Choose a status for order--
                          </option>
                          <option name="Ordered">Ordered</option>
                          <option value="Delivering">Delivering</option>
                          <option name="Received">Received</option>
                          <option name="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
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
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
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
    </AdminLayout>
  );
};

export default UpdateOrder;
