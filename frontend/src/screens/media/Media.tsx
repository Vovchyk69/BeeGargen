import React from "react";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { Avatar, Button, message } from "antd";
import { useDispatch } from "react-redux";
import {
  EditOutlined,
  LeftOutlined,
  PlayCircleFilled,
  DeleteOutlined
} from "@ant-design/icons";
import { delMedia, playAudio, setAudio, getMedia } from '@redux/actions'
import { Catch } from '@services/index'
import Header from "@components/Header";
import * as Models from "../../models";
import moment from 'moment';
import "./Media.less";

type Media = {
  id: string;
  img: string;
  date: string;
  audio: string;
  title: string;
  content: string;
};

type Props = RouteComponentProps<{ id: string }> & {
  details: Media;
};

type MediaResponse = Models.App.AsyncReturnType<ReturnType<typeof getMedia>>

const Media: React.FC<Props> = ({ match: { params: { id } }, ...props }) => {
  const dispatch = useDispatch();

  const [media, setMedia] = React.useState<MediaResponse>()
  const [resource, setResource] = React.useState<Models.Resource.Data>()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const m = await Catch<MediaResponse>(dispatch.bind(null, getMedia(id)))
      setMedia(m);
      setResource(m?.resource as Models.Resource.Data);
      setLoading(false);
    })();
  }, [dispatch, id]);

  async function onDeleteMedia() {
    await Catch<MediaResponse>(dispatch.bind(null, delMedia(id)))
    message.success('Media was successfully deleted!');
    props.history.push(`/resources/${resource?._id}`);
  }

  function onPlay() {
    dispatch(setAudio({
      src: media?.imageAudioURL!,
      img: media?.imageLinkURL,
      title: media?.imageText
    }));
    dispatch(playAudio());
  }

  function onOpenImage() {
    window.open(media?.imageLinkURL);
  }

  function onEdit() {
  }

  return (
    <section className="resources page">
      <Header className="container">
        <Link
          to={`/resources/${resource?._id}`}
          className="flex flex-align-center color-primary"
        >
          <LeftOutlined />
        </Link>
      </Header>

      <div className="scroll-box container" style={{ opacity: loading ? .5 : 1 }}>
        <br className="medium" />
        <br className="tiny" />

        <div className="flex">
          <div className="flex flex-1 overflow-hidden">
            <Avatar
              className="flex-none"
              size={40}
              shape="square"
              src={resource?.image}
            />
            <s />
            <s />
            <div className="flex-1 overflow-hidden">
              <h3
                style={{ fontSize: 18, fontWeight: "normal" }}
                className="text-ellipsis"
              >
                {resource?.title}
              </h3>
              <br className="tiny" />
              <span className="font-w-700 color-light-gray">
                {moment(new Date(resource?.timestamps?.createdAt || 0)).format('MMMM D').toString()}
              </span>
            </div>
          </div>
          <Button type="ghost" shape="round" icon={<DeleteOutlined />} onClick={onDeleteMedia} size={'middle'} danger>
            Delete
            </Button>
        </div>

        <br className="medium" />
        <br className="small" />

        <div className="flex flex-align-center flex-justify-between">
          <Button type="link" size="small" onClick={onOpenImage}>
            Open source image
          </Button>
        </div>

        <br className="medium" />
        <br className="tiny" />

        <div>
          <Button
            type="primary"
            size="middle"
            shape="round"
            className="h5 color-white text-bold"
            onClick={onPlay}
          >
            <PlayCircleFilled />
            <s />
            <s />
            <s />
            Play audio
          </Button>
        </div>

        <br className="medium" />
        <br className="small" />

        <h2 className="flex flex-justify-between flex-align-center color-gray font-w-400">
          <span>Generated Text</span>

          {/* <Button
            type="link"
            size="large"
            onClick={onEdit}
            style={{ padding: 0 }}
          >
            <span className="h2 color-gray">
              <EditOutlined />
            </span>
          </Button> */}
        </h2>

        <br className="small" />

        <p className="media__text" >{media?.imageText}</p>

        <br className="big" />
      </div>
    </section>
  );
};

export default withRouter(Media);
