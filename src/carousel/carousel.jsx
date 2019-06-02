import React, { Component, Fragment } from "react";
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
  };

  onNextClick = () => {
    const { activeIndexList, items } = this.state;
    const newActiveIndexList = activeIndexList.map(x =>
      x === items.length - 1 ? 0 : x + 1
    );
    this.setState({ activeIndexList: newActiveIndexList });
  };

  render() {
    const { items, activeIndexList } = this.state;

    return (
      <div className="carousel">
        <ul className="slides">
          {items.length > 0 &&
            activeIndexList.map((activeIndex, index) => {
              return (
                <li key={index} tabIndex="0">
                  <Card item={items[activeIndex]} />
                </li>
              );
            })}
          {activeIndexList.length === 1 && (
            <div className="carousel-controls">
              <div className="control control-left" onClick={this.onPrevClick}>
                <img
                  src={arrow}
                  className="arrow arrow-left"
                  alt="carousel arrow left"
                />
              </div>
              <div className="control control-right" onClick={this.onNextClick}>
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
