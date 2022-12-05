import { FC } from "react";
import { AgentInfoProps } from "./types";

import "./agentInfo.css";

const AgentInfo: FC<AgentInfoProps> = ({ agent }) => {
  return (
    <div
      className="agent-info"
      style={{
        backgroundImage: `url('${agent.fullPortrait}')`,
      }}
    />
  );
};

export default AgentInfo;
