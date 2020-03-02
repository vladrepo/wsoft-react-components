import React, { Component, createRef } from "react";
import "./carousel.css";

export default class Carousel extends Component {
  state = {
    currentId: 0,
    centerPos: 0
  };

  mainRef = createRef();

  componentDidMount() {
    window.addEventListener("resize", this.slideTo(0));
  }

  slideTo(id) {
    this.setState({ currentId: id }, () => {
      let centerPos =
        this.mainRef.current.offsetWidth / 2 -
        this.getWidthOfItems(id) -
        this.getDeltaXOfSelected(id);
      this.setState({ centerPos: centerPos });
    });
  }

  getWidthOfItems(id) {
    const width = [...this.mainRef.current.children[1].children]
      .slice(0, id)
      .reduce((sum, i) => sum + i.offsetWidth, 0);
    return width;
  }

  getDeltaXOfSelected() {
    return (
      this.mainRef.current.children[1].children[this.state.currentId]
        .offsetWidth / 2
    );
  }

  handleWheelEvent = e => {
    e.persist();
    const { currentId } = this.state;
    const nextIndex = e.deltaY > 0 ? currentId + 1 : currentId - 1;
    if (nextIndex >= 0 && nextIndex < this.props.array.length) {
      this.setState({ currentId: nextIndex }, () => {
        this.slideTo(nextIndex);
      });
    }
  };

  handleTouchEvent = (i, event) => {
    this.setState({ currentIndex: i }, () => {
      this.slideTo(i);
    });
  };

  render() {
    const { currentId, centerPos } = this.state;
    const { array, title } = this.props;

    const styleSelectedItem = id => {
      return currentId === id ? "selected" : "item";
    };

    const getIndex = item => {
      return array.indexOf(item);
    };

    const stylePositionCarousel = {
      transform: `translate(${centerPos}px)`
    };

    return (
      <div ref={this.mainRef}>
        <header className="header">{title}</header>
        <div
          style={stylePositionCarousel}
          className="carousel"
          onWheel={e => this.handleWheelEvent(e)}
        >
          {array.map(item => (
            <div
              key={item}
              className={styleSelectedItem(getIndex(item))}
              onClick={() => this.slideTo(getIndex(item))}
              onTouchMove={event =>
                this.handleTouchEvent(getIndex(item), event)
              }
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
