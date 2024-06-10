const ProductInput = (props) => {
  const { label, icon,  name, value , onChange} = props;
  return (
    <div className="mb-3">
      <label className="form-label" for={name}>
        {label}
      </label>
      <div className="input-group input-group-merge">
        <span id={name} className="input-group-text">
          <i className={icon}></i>
        </span>
        <input
          // type={type}
          className="form-control"
          value={value}
          onChange={onChange}
          aria-describedby="basic-icon-default-fullname2"
        />
      </div>
     
    </div>
  );
};


export default ProductInput;
