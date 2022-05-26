import React from "react";

class Contact extends React.Component {
  render() {
    return (
      <div>
        <div className="main-title">
          <h2>
            Contact<span> Me</span>
          </h2>
          <div className="contact-content-con">
            <div className="contact">
              <h4>Contact me here</h4>
              <p>
                Hey there! My name is Agustin Bravo I'm an Argentinian Solidity
                developer. You can reach me in any of the links in below.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="icon">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Location</span>
                  </div>
                  <p>: Córdoba, Argentina</p>
                </div>
                <div className="contact-item">
                  <div className="icon">
                    <i className="fas fa-envelope"></i>
                    <span>Email</span>
                  </div>
                  <p>
                    <span>: agus.brav@gmail.com</span>
                  </p>
                </div>
                <div className="contact-item">
                  <div className="icon">
                    <i className="fas fa-mobile-alt"></i>
                    <span>Mobile Number</span>
                  </div>
                  <p>
                    <span>: +54 351 5932279</span>
                  </p>
                </div>
                <div className="contact-item">
                  <div className="icon">
                    <i className="fas fa-globe-africa"></i>
                    <span>Languages</span>
                  </div>
                  <p>
                    <span>: English - Spanish</span>
                  </p>
                </div>
              </div>
              <div className="contact-icons">
                <a href="https://www.facebook.com/agus.brav/" target={"_blank"}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com/Agustin73520622" target={"_blank"}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://github.com/agusbrav" target={"_blank"}>
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}
export default Contact;
