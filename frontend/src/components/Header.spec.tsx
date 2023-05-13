import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";

import Adapter from 'enzyme-adapter-react-16';
import Header from "./Header";

Enzyme.configure({ adapter: new Adapter() });

describe("Header component", () => {
  it("renders without crashing", () => {
    shallow(<Header />);
  });

  it("renders title prop correctly", () => {
    const title = "Test Title";
    const wrapper = shallow(<Header title={title} />);
    expect(wrapper.find("h1").text()).toEqual(title);
  });

  it("renders children correctly", () => {
    const wrapper = shallow(
      <Header>
        <div className="test-child">Test child element</div>
      </Header>
    );
    expect(wrapper.find(".test-child").text()).toEqual("Test child element");
  });

  it("renders className prop correctly", () => {
    const className = "test-class";
    const wrapper = shallow(<Header className={className} />);
    expect(wrapper.find(".test-class")).toHaveLength(1);
  });
});