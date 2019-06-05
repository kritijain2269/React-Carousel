import React, { Component, Fragment, createRef } from "react";
import "./carousel.scss";
import Card from "./card/card";
import arrow from "../assets/image/arrow.svg";
import { getImages } from "./service";
import { desktop, tablet, mobile } from "../assets/config/config";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      activeIndexList: desktop,
      windowWidth: window.innerWidth
    };
    this.elementRef = createRef();
  }

  componentDidMount() {
    getImages().then(data => {
      this.setState({
        items: data.hits.filter(item => item.userImageURL !== "")
      });
      window.addEventListener("resize", this.resize);
      this.resize();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    if (window.innerWidth <= 425) {
      this.setState({ activeIndexList: mobile });
    } else if (window.innerWidth > 425 && window.innerWidth <= 768) {
      this.setState({ activeIndexList: tablet });
    } else {
      this.setState({ activeIndexList: desktop });
    }
  };

  onPrevClick = () => {
    const { activeIndexList, items } = this.state;
    const newActiveIndexList = activeIndexList.map(x =>
      x === 0 ? items.length - 1 : x - 1
    );
    this.setState({ activeIndexList: newActiveIndexList });
    this.elementRef.current.firstChild.focus();
  };

  onNextClick = () => {
    const { activeIndexList, items } = this.state;
    const newActiveIndexList = activeIndexList.map(x =>
      x === items.length - 1 ? 0 : x + 1
    );
    this.setState({ activeIndexList: newActiveIndexList });
    this.elementRef.current.lastChild.focus();
  };

  onKeyDown = event => {
    if (event.key === "Enter") {
      if (event.target.id === "prev-btn") {
        this.onPrevClick();
      } else if (event.target.id === "next-btn") {
        this.onNextClick();
      }
    }
  };

  render() {
    const { items, activeIndexList } = this.state;
    
    return (
      <div className="carousel">
        <ul className="slides"  ref={this.elementRef}>
          {items.length > 0 &&
            activeIndexList.map((activeIndex, index) => {
              return (
                <li className="slides-list" key={index} tabIndex="0">
                  <Card item={items[activeIndex]}/>
                </li>
              );
            })}
          {activeIndexList.length === 1 && (
            <div className="carousel-controls">
              <div
                id="prev-btn"
                role="button"
                tabIndex="0"
                className="control control-left"
                onClick={this.onPrevClick}
                onKeyDown={this.onKeyDown}
              >
                <img
                  src={arrow}
                  className="arrow arrow-left"
                  alt="carousel arrow left"
                />
              </div>
              <div
                id="next-btn"
                role="button"
                tabIndex="0"
                className="control control-right"
                onClick={this.onNextClick}
                onKeyDown={this.onKeyDown}
              >
                <img
                  src={arrow}
                  className="arrow arrow-right"
                  alt="carousel arrow right"
                />
              </div>
            </div>
          )}
        </ul>

        {activeIndexList.length !== 1 && (
          <Fragment>
            <button className="button-prev" onClick={this.onPrevClick}>
              Prev
            </button>
            <button className="button-next" onClick={this.onNextClick}>
              Next
            </button>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Carousel;
