import React from "react";

class About extends React.Component {
  render() {
    return (
      <div>
        <div className="main-title">
          <h2>
            Our <span>Contract</span>
          </h2>
        </div>
        <div className="about-con">
          <div className="sta-area">
            <div className="abt-text">
              <p className="large-text">Transparency</p>
              <p className="small-text">
                The contract code is in Ethereum blockchain, available for
                anyone in the world.
                <br />
                <link rel="small-text" href="" />
              </p>
            </div>
          </div>
          <div className="sta-area">
            <div className="abt-text">
              <p className="large-text">Factory</p>
              <p className="small-text">
                Our contracts are deploy throw a contract Factory, this means we
                can not change the contract that will be deployed.
              </p>
            </div>
          </div>
          <div className="sta-area">
            <div className="abt-text">
              <p className="large-text">Your Will</p>
              <p className="small-text">
                You are the only owner of your Will you can set it up as you
                want and as many times as you like.
              </p>
            </div>
          </div>
          <div className="sta-area">
            <div className="abt-text">
              <p className="large-text">Anonymus</p>
              <p className="small-text">
                You only need the addresses of the ones involved in your
                contract. No names, no geographic locations, no banks.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default About;
