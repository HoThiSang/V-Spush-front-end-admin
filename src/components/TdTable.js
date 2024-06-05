function TdTable({ props }) {
  return (
    <tr>
      <td>
        <strong>{props.id}</strong>
      </td>
      <td>{props.item1}</td>
      <td>{props.item2}</td>
      <td>{props.item3}</td>
      <td>{props.item4}</td>
      <td>{props.item5}</td>
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