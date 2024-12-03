export const Search = () => {
  return (
    <div className="navbar-nav align-items-center">
      <div className="nav-item d-flex align-items-center">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          className="form-control border-0 shadow-none"
          placeholder="Search..."
          aria-label="Search..."
        />
      </div>
    </div>
  );
};
