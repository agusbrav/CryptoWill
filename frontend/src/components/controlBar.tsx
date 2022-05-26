import React from "react";
import "../styles/styles.css";
import About from "./aboutComp";
import Contact from "./contactComp";
import Home from "./homeComp";

function NavBar() {
  function transitionPage(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const sections = document.querySelectorAll(".section");
    const sectBtn = document.querySelectorAll(".control");
    const allSections = document.querySelectorAll(".main-content");
    const sectBtns = document.querySelectorAll(".control");
    let value = Number((e.target as HTMLElement).id);
    let currentBtn = document.querySelectorAll(".active-btn");
    if (currentBtn.length > 0)
      currentBtn[0].className = currentBtn[0].className.replace(
        " active-btn",
        ""
      );
    sectBtns[value].className += " active-btn";

    const id = (e.target as HTMLElement).dataset.id;
    if (id) {
      sections.forEach((section) => {
        section.classList.remove("active");
      });

      const element = document.getElementById(id);
      (element as HTMLElement).classList.add("active");
      console.log(element);
    }
  }

  return (
    <div className="main-content">
      <Home></Home>
      <main>
        <section className="section sec2 about" id="about">
          <About></About>
        </section>
        <section className="section sec3 start" id="start">
          <div className="main-title">
            <h2>
              Create Your<span> Will</span>
            </h2>
          </div>
        </section>
        <section className="section sec4 will" id="will">
          <div className="main-title">
            <h2>
              Setup your <span>Will</span>
            </h2>
          </div>
        </section>
        <section className="section sec5 contact" id="contact">
          <Contact></Contact>
        </section>
      </main>
      <div className="controls">
        <div className="hide"></div>
        <div
          className="control hovertext control-1 active-btn"
          onClick={transitionPage}
          data-hover="Home"
          id="0"
          data-id="home"
        >
          <i className="fas fa-gavel"></i>
        </div>
        <div
          className="control hovertext control-2"
          onClick={transitionPage}
          data-hover="About"
          id="1"
          data-id="about"
        >
          <i className="fas fa-landmark"></i>
        </div>
        <div
          className="control hovertext control-3"
          onClick={transitionPage}
          data-hover="Start"
          id="2"
          data-id="start"
        >
          <i className="fas fa-file-signature"></i>
        </div>
        <div
          className="control hovertext control-4"
          onClick={transitionPage}
          data-hover="Will"
          id="3"
          data-id="will"
        >
          <i className="fas fa-book"></i>
        </div>
        <div
          className="control hovertext control-5"
          onClick={transitionPage}
          data-hover="Contact"
          id="4"
          data-id="contact"
        >
          <i className="fas fa-user-tie"></i>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
