import React from "react";
import { shallow } from "enzyme";
import Carousel from "./carousel";
import { exportAllDeclaration, jsxEmptyExpression } from "@babel/types";

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
    activeIndexList: [0, 1, 2, 3, 4],
    items,
    item: {
      userImageURL: "testImageUrl",
      tags: "alternate tag",
      user: "test user",
      likes: 123
    }
  };
  const component = shallow(<Carousel {...defaultProps} />);

  it("should render as expected", () => {
    component.setState({ items: defaultProps.items });
    expect(component).toMatchSnapshot();
  });

  it("should render as expected when activeIndex length is 1", () => {
    component.setState({ activeIndexList: [0] });
    expect(component).toMatchSnapshot();
  });

  it("should render as expected on componentWillUnmount", () => {
    component.instance().componentWillUnmount();
    expect(component).toMatchSnapshot();
  });

  it("should render images based on window size for mobile", () => {
    global.innerWidth = 400;
    component.instance().resize();
    expect(component).toMatchSnapshot();
  });

  it("should render images based on window size for tablet", () => {
    global.innerWidth = 700;
    component.instance().resize();
    expect(component).toMatchSnapshot();
  });

  it("should render images based on window size for desktop", () => {
    global.innerWidth = 900;
    component.instance().resize();
    expect(component).toMatchSnapshot();
  });

  it("should render next image on click of next button", () => {
    component.setState({ activeIndexList: [0], items });
    component.instance().onNextClick();
    expect(component.state().activeIndexList).toEqual([1]);
  });

  it("should render images in cyclic order on click of next button", () => {
    component.setState({ activeIndexList: [2], items });
    component.instance().onNextClick();
    expect(component.state().activeIndexList).toEqual([0]);
  });

  it("should render previous image on click of previous button", () => {
    component.setState({ activeIndexList: [0], items });
    component.instance().onPrevClick();
    expect(component.state().activeIndexList).toEqual([2]);
  });

  it("should render images in cyclic order on click of previous button", () => {
    component.setState({ activeIndexList: [1], items });
    component.instance().onPrevClick();
    expect(component.state().activeIndexList).toEqual([0]);
  });

  it("should render as expected on componentDidMount", () => {
    const mockSuccessResponse = { hits: items };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
    component.instance().componentDidMount();
    expect(component.state().items.length).toEqual(items.length);
  });
});
