import React from "react";
import { List, message, Avatar, Spin } from "antd";
import { Link } from "react-router-dom";
import { BookOutlined } from "@ant-design/icons";
import { API } from '../../services'
import InfiniteScroll from "react-infinite-scroller";
import Header from "@components/Header";
import "./Resources.less";

type Props = {};
type ListResponse = {
  id: string;
  img: string;
  audio: string;
  title: string;
  content: string;
  media?: number;
}[];

const Resources: React.FC<Props> = () => {
  const [data, setData] = React.useState<ListResponse>([]);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const errorHandler = (err: Error) => message.warning(err.message);

  const fetchData = async (): Promise<ListResponse> => {
    const data = await API.getResources();
    return data?.map((r: typeof data[number]) => ({
      id: r._id,
      img: r.image,
      audio: r._id,
      title: r.title,
      content: r.notes,
      media: r.media,
    })) || []
  };

  const handleInfiniteOnLoad = async () => {
    if (data.length) {
      message.warning("Infinite List loaded all");
      setHasMore(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    await fetchData()
      .then(res => {
        const newData = data.concat(res);
        setData(newData);
      })
      .catch(errorHandler);
    setLoading(false);
  };

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchData()
        .then(res => setData(res))
        .catch(errorHandler);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="resources page">
      <Header title="Resources" className="container" />

      <div className="scroll-box container">
        <br className="small" />

        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={false}
        >
          <List
            dataSource={data}
            renderItem={item => (
              <List.Item key={item.id}>
                <Link
                  to={`/resources/${item.id}`}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size={120}
                        icon={<BookOutlined />}
                        src={item.img}
                      />
                    }
                    title={<p className="h5 text-bold">{item.title}</p>}
                    description={
                      <div className="flex flex-column flex-1">
                        <p className="flex-1">{item.content}</p>
                        <div className="h5 color-primary text-bold">
                          {item.media} photo{item.media === 1 ? "" : "s"}
                        </div>
                      </div>
                    }
                  />
                </Link>
              </List.Item>
            )}
          >
            {loading && hasMore && (
              <div className="flex flex-justify-center" style={{ padding: 20 }}>
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>

        <br className="small" />
      </div>
    </section>
  );
};

export default Resources;
