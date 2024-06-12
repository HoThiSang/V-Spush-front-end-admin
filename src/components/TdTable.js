import { Link } from "react-router-dom";

function TdTable(props) {
  const {
    id,
    name,
    address,
    phone_number,
    total_price,
    order_status,
    payment_method,
    index,
    openedMenuIndex,
    toggleMenu
  } = props;
  return (
    <tr key={id}>
      <td>
        <strong>{id}</strong>
      </td>
     
      <td>{address.slice(0, 20)}</td>
      <td>{phone_number}</td>
      <td>{payment_method}</td>
      <td>{total_price}</td>
      <td>
        {order_status === "Ordered" && (
          <span className="badge bg-primary">Ordered</span>
        )}
        {order_status === "Delivering" && (
          <span className="badge bg-warning">Delivering</span>
        )}
        {order_status === "Received" && (
          <span className="badge bg-success">Received</span>
        )}
        {order_status === "Cancelled" && (
          <span className="badge bg-danger">Cancelled</span>
        )}
      </td>
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
            <Link className="dropdown-item" to={`/update-order/${id}`}>
              <i className="fa-solid fa-pen"></i> Update
            </Link>

            <button className="btn">
              <i className="fa-solid fa-trash"></i>
              Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}
export default TdTable;
