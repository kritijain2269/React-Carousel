import React from "react";
import { shallow } from "enzyme";
import Card from "./card";

it("renders without crashing", () => {
  const defaultProps = {
    item: {
      userImageURL: "testImageUrl",
      tags: "alternate tag",
      user: "test user",
      likes: 123
    }
  };
  shallow(<Card {...defaultProps} />);
});
