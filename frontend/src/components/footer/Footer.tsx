import React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { Menu } from "antd";
import classnames from "classnames";
import {
  SettingFilled,
  ProfileOutlined,
  MedicineBoxOutlined
} from "@ant-design/icons";

type Props = RouteComponentProps & {
  className?: string;
};

type MenuItem = {
  href: string;
  icon: string;
  title: string;
};

const Footer: React.FC<Props> = ({ className, match, location }) => {
  return location.pathname === "/login" ? null : (
    <footer className={classnames("footer", className)}>
      <hr className="bg-gray" />

      <Menu mode="horizontal">
        <Menu.Item key="resources">
          <NavLink exact={true} to="/resources">
            <ProfileOutlined />
            <span>Resources</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="add">
          <NavLink exact={true} to="/resources/add">
            <MedicineBoxOutlined />
            <span>Add</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="settings">
          <NavLink to="/settings">
            <SettingFilled />
            <span>Settings</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </footer>
  );
};

export default withRouter(Footer);
