import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <Link to="/" className="m-3 mb-md-0 text-muted text-decoration-none lh-1 fs-3">
          GoFood
        </Link>
        <span className="m-3 mb-md-0 text-muted">© 2023 Satyam Raj</span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li>
          <a className='m-3 fs-3 ' href="https://www.linkedin.com/in/satyamraj1643/" rel="noreferrer" target="_blank" style={{ marginRight: '15px', fontSize: '24px', color: 'inherit' }}>
            <i className="bi bi-linkedin"></i>
          </a>
        </li>
        <li>
          <a className='m-3 fs-3'  href="https://github.com/satyamraj1643" rel="noreferrer" target="_blank" style={{ marginRight: '15px', fontSize: '24px', color: 'inherit' }}>
            <i className="bi bi-github"></i>
          </a>
        </li>
        <li>
          <a className='m-3 fs-3' href="https://www.instagram.com/satyam_jha1532/" rel="noreferrer" target="_blank" style={{ fontSize: '24px', color: 'inherit' }}>
            <i className="bi bi-instagram"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
