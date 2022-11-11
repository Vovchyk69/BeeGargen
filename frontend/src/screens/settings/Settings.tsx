import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Menu } from "antd";
import { API } from "@services/index";
import Header from "@components/Header";

type Props = RouteComponentProps & {};

const Settings: React.FC<Props> = ({ history }) => {
  async function handleClick({ key }: { key: string }) {
    switch (key) {
      case "logout":
        try {
          await API.logout();
          history.push("/login");
        } catch (err) {
          console.error(err);
        }
    }
  }

  return (
    <section className="resources page">
      <Header title="Settings" className="container" />

      <div className="scroll-box">
        <br className="medium" />
        <br className="tiny" />

        <Menu onClick={handleClick}>
          <Menu.Item key="logout">
            <span className="h3 font-w-600">Logout from Google</span>
          </Menu.Item>
        </Menu>

        <br className="big" />
      </div>
    </section>
  );
};

export default withRouter(Settings);
