import React from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { endpoints } from "@services/index";
import * as Models from "../../models";
import { UploadFile } from "antd/lib/upload/interface";
import { API } from '@services/index'

export type Props = {
  onSubmit(values: Models.Resource.FormValues): Promise<any>,
};

function normFile(e: any) {
  const file = e?.file || Array.isArray(e?.fileList) ? e.fileList[0] : null;
  return file?.originFileObj
}

const ResourceForm: React.FC<Props> = ({ onSubmit }) => {
  const [hasPhoto, setHasPhoto] = React.useState(false);
  const [fileLink, setFileLink] = React.useState('');

  async function onFinish(values: Models.Resource.FormValues) {
    return onSubmit({ ...values, image: fileLink })
  }

  const onRemoveHandler = async (uploadFile: UploadFile) => {
    const data = String(uploadFile.response.data);
    await API.deleteImage({ data }).catch(errorHandler);
  };
  const errorHandler = (err: Error) => message.warning(err.message);

  function onChange(value: Models.Resource.FormValues, values: Models.Resource.FormValues) {
    setHasPhoto(values.image instanceof File || !!fileLink)
  }

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
    <Form
      {...{} as any}
      size="large"
      name="resource"
      layout="vertical"
      onValuesChange={onChange}
      onFinish={onFinish}
    >
      <Form.Item
        {...{} as any}
        name="title"
        label="Title"
        rules={[{ required: true }]}
      >
        <Input name="name" />
      </Form.Item>
      <Form.Item
        {...{} as any}
        name="notes"
        label="Notes"
      >
        <Input name="description" />
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
          action={endpoints.imagesUpload()}
          onPreview={onPreviewHandler}
          listType="picture"
          className={classnames('block full-width', { hasPhoto })}
          multiple={false}
          withCredentials={true}
          onChange={info => setFileLink(info?.file?.response?.data)}
          onRemove={onRemoveHandler}
        >
          <Button className="full-width" htmlType="button">
            <UploadOutlined /> Upload
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit" shape="round" size="large">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ResourceForm;
