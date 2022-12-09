import { FC } from "react";
import { AgentInfoProps } from "./types";

import "./agentInfo.css";
import AgentDetails from "./AgentDetails";

const AgentInfo: FC<AgentInfoProps> = ({ agent }) => {
  return (
    <>
      <AgentDetails
        name={agent.displayName}
        description={agent.description}
        abilities={agent.abilities}
        role={agent.role}
      />
      <div
        className="agent-info"
        style={{
          backgroundImage: `url('${agent.fullPortrait}')`,
        }}
      />
      <div
        className="agent-info-agent-name-background"
        style={{
          backgroundImage: `url('${agent.background}')`,
        }}
      />
    </>
  );
};

export default AgentInfo;
