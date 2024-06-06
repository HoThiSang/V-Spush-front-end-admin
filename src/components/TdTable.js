function TdTable(props) {
  const {id, name, address, phone_number, total_price, order_status , payment_method} = props
  return (
    <tr key={id}>
      <td>
        <strong>{id}</strong>
      </td>
      <td>{name}</td>
      <td>{address.slice(0, 20)}</td>
      <td>{phone_number}</td>
      <td>{payment_method}</td>
      <td>{total_price}</td>
      <td>{order_status}</td>
      <td>
        <div className="dropdown">
          <button
            type="button"
            className="btn p-10 dropdown-toggle hide-arrow"
            data-bs-toggle="dropdown"
          >
            <i
              className="fa-solid fa-ellipsis-vertical"
            ></i>
          </button>
          <div className="dropdown-menu">
            <a
              className="dropdown-item"
              href="#!"
            >
              <i className="fa-solid fa-pen"></i> Edit
            </a>
            <a
              className="dropdown-item"
              href="#!"
            >
              <i className="fa-solid fa-trash" ></i>
              Delete
            </a>
          </div>
        </div>
      </td>
    </tr>
  );
}
export default TdTable