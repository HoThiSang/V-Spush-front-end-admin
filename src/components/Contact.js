function Contact(props) {
  const { title, name, value } = props;
  return (
    <div className="row">
      <div className="col-lg-2">
        <h3 className="update-contact">{title}</h3>
      </div>
      <div className="col-lg-8">
        <label htmlFor="name" className="object-contact">
          {name}
        </label>
        <br />
        <input
          type="text"
          name=""
          id="message"
          value={value}
          className="input-update-contact"
        />
      </div>
      <div className="col-lg-2"></div>
    </div>
  );
}

export default Contact;
