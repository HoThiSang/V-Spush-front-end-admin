const Footer = () => {
  return (
    <footer className="content-footer footer bg-footer-theme">
      <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
        <div className="mb-2 mb-md-0">
          <script>document.write{ new Date().getFullYear()};</script>Make made with
          ❤️ by   
          <a
            href="#!"
            target="_blank"
            className="footer-link fw-bolder"
            rel="noreferrer"
          >
            V_SPlush
          </a>
        </div>
        <div>
          <a
            href="#!"
            className="footer-link me-4"
            target="_blank"
            rel="noreferrer"
          >
            About us
          </a>
          <a
            href="#!"
            target="_blank"
            className="footer-link me-4"
            rel="noreferrer"
          >
            More 
          </a>

          <a
            href="#!"
            target="_blank"
            className="footer-link me-4"
            rel="noreferrer"
          >
          </a>

          <a
            href="#!"
            target="_blank"
            className="footer-link me-4"
            rel="noreferrer"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
};

export  default Footer
