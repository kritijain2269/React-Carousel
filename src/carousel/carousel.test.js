import React from "react";
import { shallow, mount } from "enzyme";
import Carousel from "./carousel";

describe("renders without crashing", () => {
  const items = [
    {
      largeImageURL:
        "https://pixabay.com/get/55e0d2444350a414f6da8c7dda793e781039dee3564c704c70267ed49e4fc75b_1280.jpg",
      webformatHeight: 360,
      webformatWidth: 640,
      likes: 1926,
      imageWidth: 3840,
      id: 3077928,
      user_id: 2946451,
      views: 1074298,
      comments: 178,
      pageURL:
        "https://pixabay.com/photos/fantasy-beautiful-dawn-sunset-sky-3077928/",
      imageHeight: 2160,
      webformatURL:
        "https://pixabay.com/get/55e0d2444350a414f6da8c7dda793e781039dee3564c704c70267ed49e4fc75b_640.jpg",
      type: "photo",
      previewHeight: 84,
      tags: "fantasy, beautiful, dawn",
      downloads: 516211,
      user: "peter_pyw",
      favorites: 1632,
      imageSize: 1925809,
      previewWidth: 150,
      userImageURL:
        "https://cdn.pixabay.com/user/2018/01/12/08-06-25-409_250x250.jpg",
      previewURL:
        "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_150.jpg"
    },
    {
      largeImageURL:
        "https://pixabay.com/get/55e0d2444350a414f6da8c7dda793e781039dee3564c704c70267ed49e4fc75b_1280.jpg",
      webformatHeight: 360,
      webformatWidth: 640,
      likes: 1926,
      imageWidth: 3840,
      id: 3077928,
      user_id: 2946451,
      views: 1074298,
      comments: 178,
      pageURL:
        "https://pixabay.com/photos/fantasy-beautiful-dawn-sunset-sky-3077928/",
      imageHeight: 2160,
      webformatURL:
        "https://pixabay.com/get/55e0d2444350a414f6da8c7dda793e781039dee3564c704c70267ed49e4fc75b_640.jpg",
      type: "photo",
      previewHeight: 84,
      tags: "fantasy, beautiful, dawn",
      downloads: 516211,
      user: "peter_pyw",
      favorites: 1632,
      imageSize: 1925809,
      previewWidth: 150,
      userImageURL:
        "https://cdn.pixabay.com/user/2018/01/12/08-06-25-409_250x250.jpg",
      previewURL:
        "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_150.jpg"
    },
    {
      largeImageURL:
        "https://pixabay.com/get/55e0d2444350a414f6da8c7dda793e781039dee3564c704c70267ed49e4fc75b_1280.jpg",
      webformatHeight: 360,
      webformatWidth: 640,
      likes: 1926,
      imageWidth: 3840,
      id: 3077928,
      user_id: 2946451,
      views: 1074298,
      comments: 178,
      pageURL:
        "https://pixabay.com/photos/fantasy-beautiful-dawn-sunset-sky-3077928/",
      imageHeight: 2160,
      webformatURL:
        "https://pixabay.com/get/55e0d2444350a414f6da8c7dda793e781039dee3564c704c70267ed49e4fc75b_640.jpg",
      type: "photo",
      previewHeight: 84,
      tags: "fantasy, beautiful, dawn",
      downloads: 516211,
      user: "peter_pyw",
      favorites: 1632,
      imageSize: 1925809,
      previewWidth: 150,
      userImageURL: "",
      previewURL:
        "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_150.jpg"
    }
  ];
  const defaultProps = {
    onKeyDown: jest.fn(),
    onPrevClick: jest.fn(),
    onNextClick: jest.fn(),
    activeIndexList: [0, 1, 2, 3, 4],
    items,
    item: {
      userImageURL: "testImageUrl",
      tags: "alternate tag",
      user: "test user",
      likes: 123
    }
  };
  const shallowComponent = shallow(<Carousel {...defaultProps} />);
  const mountComponent = mount(<Carousel {...defaultProps} />);

  it("should render as expected", () => {
    shallowComponent.setState({ items: defaultProps.items });
    expect(shallowComponent).toMatchSnapshot();
  });

  it("should render as expected when activeIndex length is 1", () => {
    shallowComponent.setState({ activeIndexList: [0] });
    expect(shallowComponent).toMatchSnapshot();
  });

  it("should render as expected on componentWillUnmount", () => {
    shallowComponent.instance().componentWillUnmount();
    expect(shallowComponent).toMatchSnapshot();
  });

  it("should render images based on window size for mobile", () => {
    global.innerWidth = 400;
    shallowComponent.instance().resize();
    expect(shallowComponent).toMatchSnapshot();
  });

  it("should render images based on window size for tablet", () => {
    global.innerWidth = 700;
    shallowComponent.instance().resize();
    expect(shallowComponent).toMatchSnapshot();
  });

  it("should render images based on window size for desktop", () => {
    global.innerWidth = 900;
    shallowComponent.instance().resize();
    expect(shallowComponent).toMatchSnapshot();
  });

  it("should render next image on click of next button", () => {
    mountComponent.setState({ activeIndexList: [0], items });
    mountComponent.instance().onNextClick();
    expect(mountComponent.state().activeIndexList).toEqual([1]);
  });

  it("should render images in cyclic order on click of next button", () => {
    mountComponent.setState({ activeIndexList: [2], items });
    mountComponent.instance().onNextClick();
    expect(mountComponent.state().activeIndexList).toEqual([0]);
  });

  it("should render previous image on click of previous button", () => {
    mountComponent.setState({ activeIndexList: [0], items });
    mountComponent.instance().onPrevClick();
    expect(mountComponent.state().activeIndexList).toEqual([2]);
  });

  it("should render images in cyclic order on click of previous button", () => {
    mountComponent.setState({ activeIndexList: [1], items });
    mountComponent.instance().onPrevClick();
    expect(mountComponent.state().activeIndexList).toEqual([0]);
  });

  // it("should call onKeyDown when Enter is pressed on previous button", () => {
  //   mountComponent.setState({ activeIndexList: [0], items });
  //   mountComponent.find('#prev-btn').simulate('keyDown', { key: 'Enter', target: { id: 'prev-btn' } })
  //   expect(defaultProps.onKeyDown).toHaveBeenCalled();
  // });

  // it("should call onKeyDown when Enter is pressed on next button", () => {
  //   mountComponent.setState({ activeIndexList: [0], items });
  //   mountComponent.find('#next-btn').simulate('keyDown', { key: 'Enter', target: { id: 'next-btn' } })
  //   expect(defaultProps.onKeyDown).toHaveBeenCalled();
  // });

  it("should call onKeyDown when Enter is pressed on next arrow button", () => {
    mountComponent.setState({ activeIndexList: [0], items });
    mountComponent.instance().onKeyDown({ key: 'Enter', target: { id: 'next-btn' } });
    expect(mountComponent.state().activeIndexList).toEqual([1]);
  });

  it("should call onKeyDown when Enter is pressed on previous arrow button", () => {
    mountComponent.setState({ activeIndexList: [1], items });
    mountComponent.instance().onKeyDown({ key: 'Enter', target: { id: 'prev-btn' } });
    expect(mountComponent.state().activeIndexList).toEqual([0]);
  });

  it("should not change card when enter is pressed on any other button apart from next-btn or prev-btn", () => {
    mountComponent.setState({ activeIndexList: [1], items });
    mountComponent.instance().onKeyDown({ key: 'Enter', target: { id: 'test-btn' } });
    expect(mountComponent.state().activeIndexList).toEqual([1]);
  });

  it("should not change card when any other key apart from Enter key is pressed", () => {
    mountComponent.setState({ activeIndexList: [1], items });
    mountComponent.instance().onKeyDown({ key: 'Space', target: { id: 'next-btn' } });
    expect(mountComponent.state().activeIndexList).toEqual([1]);
  });

  it("should render as expected on componentDidMount", () => {
    const mockSuccessResponse = { hits: items };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
    shallowComponent.instance().componentDidMount();
    expect(shallowComponent.state().items.length).toEqual(items.length);
  });
});
