import React from "react";
import { Button, Steps } from "antd";

export type Props = {};

let interval: any;

const Processing: React.FC<Props> = () => {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    interval = setInterval(() => setCurrent(c => c + 1), 500);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (current >= 4) clearInterval(interval);
  }, [current]);

  return (
    <section className="processing flex flex-column flex-1 flex-justify-between">
      <Steps direction="vertical" current={current}>
        <Steps.Step
          title="Image Upload"
          description="Uploading to your Google Drive"
        />
        <Steps.Step
          title="Text Detection"
          description="Image is scanned for text"
        />
        <Steps.Step
          title="Audio Generation"
          description="Generate audio file from text"
        />
        <Steps.Step
          title="Audio Uploading"
          description="Upload generated file to your Google Drive"
        />
      </Steps>

      <div className="text-center">
        <Button
          type="primary"
          size="large"
          shape="round"
          loading={true}
          style={{ padding: "0 100px" }}
        >
          Process
        </Button>
        <br className="big" />
        <br className="small" />
      </div>
    </section>
  );
};

export default Processing;
