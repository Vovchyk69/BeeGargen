import React from "react";
import {
  LeftOutlined,
  BookOutlined,
  PlayCircleFilled,
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar, List, message, Spin, Button, Modal, Upload } from "antd";
import Header from "@components/Header";
import { setAudio, playAudio, getResource } from '@redux/actions'
import { API, Catch } from '@services/index'
import * as Models from '../../models'
import moment from 'moment';
import './Resource.less'

type Props = RouteComponentProps<{ id: string }> & {};
type ListResponse = {
  id: string;
  img: string;
  date: string;
  audio: string;
  content: string;
  title: string;
  duration: number;
};
type ResourceResponse = Models.App.AsyncReturnType<ReturnType<typeof getResource>>

const fetchData = async (id): Promise<ListResponse[]> => {
  const data = await API.getMediaResources(id);

  return data?.map((r: typeof data[number]) => ({
    id: r._id,
    img: r.imageLinkURL,
    date: r.timestamps?.createdAt,
    audio: r.imageAudioURL,
    content: r.imageText,
    title: r.imageText,
    duration: Math.floor(r.audioDuration / 60000)
  })) || []
};

const Resource: React.FC<Props> = ({ match: { params: { id } }, ...props }) => {
  const dispatch = useDispatch();

  const [showDeleteModal, setDeleteModalState] = React.useState(false);
  const [data, setData] = React.useState<ListResponse[]>([]);
  const [resource, setResource] = React.useState<ResourceResponse>();
  const [loading, setLoading] = React.useState(false);

  const errorHandler = (err: Error) => message.warning(err.message);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchData(id).then(res => setData(res)).catch(errorHandler);
      const r = await Catch<ResourceResponse>(dispatch.bind(null, getResource(id)))
      setResource(r)
      setLoading(false);
    })();
  }, [dispatch, id]);

  const onResourceDeleteHandler = async () => {
    await API.deleteResource(resource?._id as string);
    message.success('Resource and it`s media were deleted!');
    props.history.push('/resources');
  }
  const onResourceUpdateHandler = async () => {
    props.history.push(`/resources/${resource?._id}/edit`);
  }

  const onMediaAddHandler = async ({ onSuccess, onError, file }) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('resource', resource?._id as string);
    return await API.createMedia(formData).then((data) => {
      message.success('New media is processing, it will appear in the list when it`s done!')
      return onSuccess;
    }).catch(onError);
  }


  async function onPlay(item: ListResponse) {
    dispatch(
      setAudio({
        src: item.audio!,
        img: resource?.image,
        title: item.title
      })
    );
    dispatch(playAudio());
  }

  return (
    <section className="resource page">
      <Header className="container">
        <Link to="/resources" className="flex flex-align-center color-primary">
          <LeftOutlined />
          <s />
          <span className="h3">Resources</span>
        </Link>
      </Header>

      <br className="medium" />

      <section className="container">
        <div className="flex flex-justify-between resources__description">
          <div>
            <div className="flex flex-align-start ">
              <h2 className="flex-1">{resource?.title}</h2>
            </div>
            <br className="small" />
            <h5 className="color-light-gray font-w-700">Created on {
              moment(new Date(resource?.timestamps?.createdAt || 0)).format('MMMM D').toString()
            }</h5>
            <br className="small" />
            <p
              className="text-ellipsis-multiline"
              style={{ "--max-lines": 3 } as any}
            >{resource?.notes}</p>
          </div>
          <div className="flex-none">
            <Avatar
              shape="square"
              size={85}
              icon={<BookOutlined />}
              src={resource?.image}
            />
          </div>
        </div>
        <div className="resources__action_buttons_container">
          <Button type="ghost" shape="round" icon={<DeleteOutlined />} onClick={() => setDeleteModalState(true)} size={'middle'} danger>
            Delete
            </Button>
          <Button type="dashed" shape="round" icon={<EditOutlined />} onClick={onResourceUpdateHandler} size={'middle'}>
            Edit
          </Button>
        </div>
        <div className="flex flex-justify-between">
          <h2 className="color-gray">Available audios</h2>
          <Upload
            customRequest={onMediaAddHandler}
            multiple={false}
            withCredentials={true}
            showUploadList={false}
          >
            <Button type="primary" shape="round" icon={<FileAddOutlined />}>
              Media
          </Button>

          </Upload>
        </div>
        <br className="small" />
      </section>
      <hr className="bg-gray" />

      <div className="scroll-box">
        <br className="small" />
        {
          loading ?
            <div className="flex flex-justify-center" style={{ padding: 20 }}>
              <Spin />
            </div>
            :
            <List
              dataSource={data}
              renderItem={item => (
                <List.Item key={item.id}>
                  <div className="flex flex-column flex-1 container">
                    <p className="h5 color-light-gray font-w-700 bold">
                      {moment(new Date(item.date)).format('MMMM D, dddd HH:mm').toString()}
                    </p>
                    <br className="small" />
                    <p
                      className="flex-1 text-ellipsis-multiline"
                      style={{ "--max-lines": 5 } as any}
                    >
                      {item.content}
                    </p>
                    <br className="medium" />
                    <div className="flex flex-justify-between flex-align-center">
                      <Button
                        type="primary"
                        size="middle"
                        shape="round"
                        className="h5 color-white text-bold"
                        onClick={onPlay.bind(null, item)}
                      >
                        <PlayCircleFilled />
                        {
                          isNaN(item.duration) ? 'Unknown time' : `${item.duration} minutes`
                        }

                      </Button>
                      <Link
                        to={`/media/${item.id}`}
                        className="h5 color-light-gray font-w-700"
                      >
                        More
                    </Link>
                    </div>
                  </div>
                </List.Item>
              )}
            >
            </List>
        }
        <br className="small" />
      </div>
      <Modal
        title="Delete Resource"
        visible={showDeleteModal}
        onOk={onResourceDeleteHandler}
        onCancel={() => setDeleteModalState(false)}
      >
        <div className='flex flex-justify-center flex-column flex-align-center' >
          <ExclamationCircleOutlined style={{ fontSize: '32px', color: 'red' }} />
          <br />
          <p>
            Do you realy want to delete this resource?
          </p>
          <p>
            All it`s media files would be also deleted!
          </p>
        </div>
      </Modal>
    </section>
  );
};

export default withRouter(Resource);
