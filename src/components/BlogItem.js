import { Link } from "react-router-dom";

const BlogItem = (props) => {
  const {
    index,
    id,
    title,
    content,
    image_url,
    image_name,
    openedMenuIndex,
    toggleMenu,
    handleDeleteBlog
  } = props;
  return (
    <tr key={id}>
      <td>
        <strong>{id}</strong>
      </td>
      <td>
        <img src={image_url} alt={image_name} style={{ maxWidth: "200px" }} />
      </td>
      <td>{title.slice(0, 35)}</td>
      <td>{content.slice(0, 40)}</td>
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
            <Link className="dropdown-item" to={`/update-blog/${id}`}>
              <i className="fa-solid fa-pen"></i> Edit
            </Link>

            <button className="btn" onClick={() => handleDeleteBlog(id)}>
              <i className="fa-solid fa-trash"></i>
              Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default BlogItem;
