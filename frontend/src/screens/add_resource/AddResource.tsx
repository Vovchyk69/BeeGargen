import React from "react";
import { message } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { API } from '@services/index'
import Header from "@components/Header";
import * as Models from "../../models";
import { Form } from ".";
import "./AddResource.less";

type Props = RouteComponentProps<{}>;

const AddResource: React.FC<Props> = (props) => {

  async function onSubmit(values: Models.Resource.FormValues) {
    const resource = await API.createResource(values);
    message.success('Resource was successfully added!')
    props.history.push(`/resources/${resource._id}`);
  }

  return (
    <section className="add-resource page">
      <Header title="New" className="container" />

      <div className="scroll-box container flex-1 flex flex-column">
        <div className="container flex-1 flex flex-column">
          <br className="medium" />
          <br className="tiny" />

          <h2>Resources</h2>
          <br className="medium" />

          <Form onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
};

export default AddResource;
