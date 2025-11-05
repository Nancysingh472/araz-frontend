import React from 'react';

const Footer = () => {
  return (
    <footer className="user-footer">
      <div className="container">
        <div className="footer-text py-4 text-center">
          <img
            src="/assets/images/welcome-img.png"
            alt="img"
            width="55"
            className="img-fluid"
          />
          <p> Powered by Idaarah Hasanaat al-Qard al-Hasan al-Burhaniyah</p>
          {/*&copy; {new Date().getFullYear()} Araz Portal*/}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
