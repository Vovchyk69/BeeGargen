import React, { Suspense } from "react";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import { getUser } from "../redux/actions";

const NotFound = React.lazy(() => import("../screens/NotFound"));
const Login = React.lazy(() => import("../screens/login/Login"));
const Settings = React.lazy(() => import("../screens/settings/Settings"));
const Resource = React.lazy(() => import("../screens/resource/Resource"));
const Resources = React.lazy(() => import("../screens/resources/Resources"));
const AddResource = React.lazy(() =>
  import("../screens/add_resource/AddResource")
);
const EditResource = React.lazy(() =>
  import("../screens/edit_resource/EditResource")
);
const Media = React.lazy(() => import("../screens/media/Media"));

export const publicPaths: RouteProps[] = [
  { path: "/", exact: true, render: () => <Redirect to="/resources" /> },
  { path: "/login", exact: true, component: Login },
  { path: "/settings", exact: true, component: Settings },
  { path: "/resources", exact: true, component: Resources },
  { path: "/resources/add", exact: true, component: AddResource },
  { path: "/resources/:id/edit", exact: true, component: EditResource },
  { path: "/resources/:id", exact: true, component: Resource },
  { path: "/media/:id", exact: true, component: Media },
  // { path: "/media/add", exact: true, component:  },
  { component: NotFound },
];

export const publicRoutes = publicPaths.map((props, i) => (
  <Route key={i} {...props} />
));

const Routes: React.FC<{}> = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    try {
      dispatch(getUser());
    } catch (err) {
      /* handled by action */
    }
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="full-width page" style={{ padding: 105 }}>
          <Spin />
        </div>
      }
    >
      <Switch>
        {publicRoutes}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Suspense>
  );
};

export default Routes;
