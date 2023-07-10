import { FC, useEffect, useState } from "react";
import { AgentInfoProps } from "./types";

import "./agentInfo.css";
import AgentDetails from "./AgentDetails";

const AgentInfo: FC<AgentInfoProps> = ({ agent }) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    setShouldAnimate(false);
  }, [agent]);

  useEffect(() => {
    if (!shouldAnimate) {
      setShouldAnimate(true);
    }
  }, [shouldAnimate]);

  return (
    <>
      <AgentDetails
        name={agent.displayName}
        description={agent.description}
        abilities={agent.abilities}
        role={agent.role}
      />
      {shouldAnimate && (
        <div className="agent-info animate">
          <img
            alt={agent.displayName}
            className="agent-image"
            src={agent.fullPortrait}
            style={{
              height: "100%",
              color: `#${agent.backgroundGradientColors[0]}`,
            }}
          />
        </div>
      )}
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
