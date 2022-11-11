import React from "react";
import { message, Spin } from "antd";
import { useDispatch } from "react-redux";
import { getResource } from "@redux/actions";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Header from "@components/Header";
import * as Models from "../../models";
import "./EditResource.less";
import { API } from '@services/index'
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined, LeftOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { UploadFile } from "antd/lib/upload/interface";

function normFile(e: any) {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
}

type Props = RouteComponentProps<{ id: string }> & {};
type ResourceResponse = Models.App.AsyncReturnType<ReturnType<typeof getResource>>

const EditResource: React.FC<Props> = ({ match: { params: { id } }, ...props }) => {
  const dispatch = useDispatch();
  const [processing, setProcessing] = React.useState(false);
  const [hasPhoto, setHasPhoto] = React.useState(false);
  const [resource, setResource] = React.useState<ResourceResponse>();

  React.useEffect(() => {
    (async () => {
      setProcessing(true);
      const r = await API.getResource(id);
      setResource(r)
      setProcessing(false);
      setHasPhoto(true);
    })();
  }, [dispatch, id]);

  const errorHandler = (err: Error) => message.warning(err.message);

  async function onSubmit(values: Models.Resource.FormValues) {
    let { image } = values;
    if (image instanceof Array) {
      image = values.image[0].response
    }
    await API.updateResource({ _id: resource?._id, ...values, image });
    message.success('Resource successfully updated!')
    props.history.push(`/resources/${resource?._id}`);
  }

  const fileList = [{
    uid: '1',
    name: 'title',
    url: resource?.image || '',
    thumbUrl: resource?.image || '',
    size: 1241234
  }]

  async function onFinish(values: Models.Resource.FormValues) {
    return onSubmit(values)
  }

  function onChange(value: Models.Resource.FormValues, values: Models.Resource.FormValues) {
    setHasPhoto(!!values.image?.length)
  }

  const customRequest = async ({ onSuccess, onError, file }) => {
    const data = new FormData()
    data.append('file', file)
    await API.uploadImage(data).then(onSuccess).catch(onError);
  };

  const onRemoveHandler = async (uploadFile: UploadFile) => {
    let data = String(uploadFile.url);
    if (hasPhoto) {
      data = String(uploadFile.thumbUrl)
    }
    await API.deleteImage({ data }).catch(errorHandler);
    setHasPhoto(false)
  };

  const onPreviewHandler = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <section className="add-resource page">
      <Header className="container">
        <Link to={`/resources/${resource?._id}`} className="flex flex-align-center color-primary">
          <LeftOutlined />
          <s />
          <span className="h3">{resource?.title}</span>
        </Link>
      </Header>

      <div className="scroll-box container flex-1 flex flex-column">
        <div className="container flex-1 flex flex-column">
          <br className="medium" />
          <br className="tiny" />

          <h2>Edit</h2>
          <br className="medium" />

          {processing ? <Spin /> :

            <Form
              {...{} as any}
              size="large"
              name="resource"
              layout="vertical"
              initialValues={{ title: resource?.title, notes: resource?.notes, image: resource?.image }}
              onValuesChange={onChange}
              onFinish={onFinish}
            >
              <Form.Item
                {...{} as any}
                name="title"
                label="Title"
                rules={[{ required: true }]}
              >
                <Input name="title" />
              </Form.Item>
              <Form.Item
                {...{} as any}
                name="notes"
                label="Notes"
              >
                <Input name="notes" />
              </Form.Item>

              <Form.Item
                {...{} as any}
                name="image"
                label="Image"
                valuePropName="filelist"
                extra="Select title image"
                rules={[{ required: true }]}
                getValueFromEvent={normFile}
              >
                <Upload
                  customRequest={customRequest}
                  name="photo"
                  listType="picture"
                  defaultFileList={fileList as UploadFile[]}
                  className={classnames('block full-width', { hasPhoto })}
                  onPreview={onPreviewHandler}
                  onRemove={onRemoveHandler}
                  multiple={false}
                >
                  {!hasPhoto ? <Button className="full-width">
                    <UploadOutlined /> Upload
                  </Button> : null}
                </Upload>
              </Form.Item>

              <Form.Item className="text-right">
                <Button type="primary" htmlType="submit" shape="round" size="large">
                  Save
                </Button>
              </Form.Item>
            </Form>
          }
        </div>
      </div>
    </section>
  );
};

export default withRouter(EditResource);
