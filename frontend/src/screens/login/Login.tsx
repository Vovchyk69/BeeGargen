import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import queryString from "query-string";
import _ from "lodash";
import { Button } from "antd";
import bg from "./login_bg.jpg";

type Props = RouteComponentProps & {};

const Login: React.FC<Props> = ({ location }) => {
  const queries = queryString.parse(location.search);

  return !_.isEmpty(queries) ? null : (
    <section
      className="login page bg-cover scroll-box"
      style={{ backgroundImage: `url("${bg}")` }}
    >
      <br className="big" />
      <br className="big" />
      <br className="medium" />

      <h1 className="text-center" style={{ fontSize: 44 }}>
        Heard
      </h1>

      <br className="big" />
      <br className="big" />
      <br className="big" />

      <p className="text-center">
        <span style={{ maxWidth: "70%" }} className="inline-block">
          Upload photos of your book and listen it anytime, everywhere!
        </span>
      </p>

      <br className="big" />
      <br className="big" />
      <br className="big" />
      <br className="big" />

      <div className="text-center">
        <p style={{ width: 250 }} className="inline-block">
          <Button
            type="primary"
            shape="round"
            size="large"
            className="full-width"
            href="http://localhost:3001/api/auth/login"
          >
            <label className="h3 color-white full-height text-center inline-flex flex-align-center">
              Log in wih Google
            </label>
          </Button>
        </p>
      </div>

      <br className="big" />
      <br className="big" />
    </section>
  );
};

export default withRouter(Login);
