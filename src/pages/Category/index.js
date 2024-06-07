import { useEffect, useState} from "react";
import axiosService from "../../services/configAxios";
import { Link } from "react-router-dom";
function ShowCategory() {
  const [categories, setCategory] = useState([]);
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenedMenuIndex(index === openedMenuIndex ? null : index);
  };
  const getCategory = async () => {
    try {
      const response = await axiosService.get("/categories");
      setCategory(response.data.data);
    } catch (error) {
      console.log("Error get all category", error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="card">
            <h5 className="card-header">Category</h5>
            <div className="table-responsive text-nowrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {categories.map((category, index) => (
                    <tr key={category.index}>
                      <td>
                        <strong>{category.id}</strong>
                      </td>
                      <td>{category.category_name}</td>
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
                              to={`/detail-category/${category.id}`}
                              className="dropdown-item"
                            >
                              <i className="fa-solid fa-asterisk"></i> Detail
                            </Link>
                            <Link
                              to={`/update-category/${category.id}`}
                              className="dropdown-item"
                            >
                              <i className="fa-solid fa-pen"></i> Update
                            </Link>
                            <Link
                              to={`/detail-category/${category.id}`}
                              className="dropdown-item"
                            >
                              <i className="fa-solid fa-trash"></i> Delete
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowCategory;
