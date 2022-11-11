import React from "react";
import { Button, Slider } from "antd";
import { SliderValue } from "antd/lib/slider";
import {
  CaretRightOutlined,
  PauseOutlined,
  UndoOutlined,
  RedoOutlined
} from "@ant-design/icons";

export type BigPanelProps = {
  isPlaying: boolean;
  current: number;
  duration: number;
  onTogglePlay(isPlay: boolean): void;
  onChangeTime(time: SliderValue): void;
};

const BigPanel: React.FC<BigPanelProps> = ({
  current,
  duration,
  isPlaying,
  onTogglePlay,
  onChangeTime
}) => {
  function getTime(time: number) {
    return new Date(time * 1000).toISOString().substr(11, 8);
  }

  return (
    <div className="big-panel full-width">
      <hr className="bg-gray" />
      <br className="medium" />
      <br className="small" />

      <div className="flex flex-column flex-align-center container">
        <div className="full-width container">
          <Slider
            min={0}
            max={duration}
            step={0.01}
            onChange={onChangeTime}
            value={typeof current === "number" ? current : 0}
          />
          <div className="flex flex-justify-between">
            <span>{getTime(current)}</span>
            <span>{getTime(duration)}</span>
          </div>
        </div>

        <div className="flex flex-justify-center">
          <Button
            type="link"
            size="large"
            style={{ height: 50 }}
            className="flex flex-align-center flex-justify-center"
            onClick={onChangeTime.bind(null, Math.max(0, current - 10))}
          >
            <div
              className="color-gray h1 overflow-hidden flex flex-justify-center flex-align-center"
            >
              <UndoOutlined style={{ fontSize: '20px' }} />
            </div>
          </Button>
          <Button
            type="link"
            size="large"
            style={{ height: 50 }}
            className="flex flex-align-center flex-justify-center"
            onClick={onTogglePlay.bind(null, !isPlaying)}
          >
            <span
              className="color-gray block h1 overflow-hidden"
              style={{ lineHeight: 1, width: 36, height: 36 }}
            >
              {isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
            </span>
          </Button>
          <Button
            type="link"
            size="large"
            style={{ height: 50 }}
            className="flex flex-align-center flex-justify-center"
            onClick={onChangeTime.bind(null, Math.min(current + 10, duration))}
          >
            <div
              className="color-gray h1 overflow-hidden flex flex-justify-center flex-align-center"
            >
              <RedoOutlined style={{ fontSize: '20px' }} />
            </div>
          </Button>
        </div>
      </div>

      <br className="medium" />
      <br className="small" />
    </div>
  );
};

export default BigPanel;
