import React from "react";
import { mount } from "enzyme";
import Enzyme from "enzyme";
import { NavLink, MemoryRouter } from "react-router-dom";
import { Menu } from "antd";
import Footer from "./Footer";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("Footer", () => {
  it("should render a footer element", () => {
    const wrapper = mount(<Footer />, { wrappingComponent: MemoryRouter });
    expect(wrapper.find("footer")).toHaveLength(1);
  });

  it("should render three menu items", () => {
    const wrapper = mount(
      <Footer />,
      { wrappingComponent: MemoryRouter }
    );
    expect(wrapper.find(Menu.Item)).toHaveLength(3);
  });

  it("should render NavLink components with the correct props", () => {
    const wrapper = mount(
      <Footer />,
      { wrappingComponent: MemoryRouter }
    );
    const navLinks = wrapper.find(NavLink);
    expect(navLinks).toHaveLength(3);
    expect(navLinks.at(0).prop("exact")).toBe(true);
    expect(navLinks.at(0).prop("to")).toBe("/resources");
    expect(navLinks.at(1).prop("exact")).toBe(true);
    expect(navLinks.at(1).prop("to")).toBe("/resources/add");
    expect(navLinks.at(2).prop("to")).toBe("/settings");
  });
});