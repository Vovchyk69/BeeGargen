import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card } from "antd";
// import { fetchList } from "@redux/actions";
import { GITHUB_LINK } from "@constants/general";
import "./Home.less";

type Props = {};

const Home: React.FC<Props> = () => {
  const [, setFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await setFetching(true);

      try {
        // await dispatch(fetchList());
      } catch (error) {
        // console.log(error)
      }

      setFetching(false);
    })();
  }, [dispatch]);

  return (
    <>
      <div className="home">
        <Card
          className="home__card"
          title={"title"}
          extra={
            <a
              className="home__link"
              href={GITHUB_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              asd
            </a>
          }
        >
          asd
        </Card>
      </div>
    </>
  );
};

export default Home;
