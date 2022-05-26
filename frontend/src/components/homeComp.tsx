import React from "react";
import cw2 from "../assets/images/cw2.png";

class Home extends React.Component {
  render() {
    return (
      <div>
        <header className="section sec1 home active" id="home">
          <div className="header-content">
            <div className="left-header">
              <div className="shape"></div>
              <div className="image">
                <img src={cw2} alt="" />
              </div>
            </div>
            <div className="right-header">
              <h1 className="name">
                A true inmutable <span> Crypto Will </span>
              </h1>
              <p>
                The main idea of Crypyo Will its to bring possibities to anyone
                You can achieve savings and set a Will in case anything happens
                to you So your loves one can enjoy what you achieved and without
                the need of legall contenders{" "}
                <span>Just full blockchain security.</span>
              </p>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
export default Home;
