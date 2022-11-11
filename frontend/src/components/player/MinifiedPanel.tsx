import React from "react";
import { Avatar, Button } from "antd";
import {
  CaretRightOutlined,
  PauseOutlined,
  DownOutlined
} from "@ant-design/icons";

export type MinifiedPanelProps = {
  src?: string;
  text?: string;
  isPlaying: boolean;
  isExpanded?: boolean;
  onTogglePlay(isPlay: boolean): void;
};

const MinifiedPanel: React.FC<MinifiedPanelProps> = ({
  src,
  text,
  isPlaying,
  isExpanded,
  onTogglePlay
}) => {
  function onClick(e: any) {
    e.stopPropagation();
    onTogglePlay(!isPlaying);
  }

  return (
    <div className="mini-panel full-width">
      <hr className="bg-gray" />
      <br className="tiny" />
      <br className="tiny" />

      <div className="flex flex-align-center container">
        <Avatar shape="square" size={34} src={src} />

        <s />
        <s />

        <h3 className="text-ellipsis flex-1">{text || "[no title]"}</h3>

        <s />
        <s />

        {isExpanded ? (
          <div
            className="flex flex-align-center flex-justify-center"
            style={{ width: 32, height: 32 }}
          >
            <DownOutlined />
          </div>
        ) : (
          <Button type="primary" size="middle" shape="circle" onClick={onClick}>
            {isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
          </Button>
        )}
      </div>

      <br className="tiny" />
      <br className="tiny" />
    </div>
  );
};

export default MinifiedPanel;
