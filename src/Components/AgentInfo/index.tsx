import { FC, useEffect, useState } from "react";
import { AgentInfoProps } from "./types";

import "./agentInfo.css";
import AgentDetails from "./AgentDetails";
import { useAgents } from "../../Context/AgentsContext";

const AgentInfo: FC<AgentInfoProps> = ({ agent }) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const { selectionDirection } = useAgents();

  useEffect(() => {
    setShouldAnimate(false);
  }, [agent, selectionDirection]);

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
        <div className={`agent-info animate-${selectionDirection}`}>
          <img
            alt={agent.displayName}
            className={`agent-image-${selectionDirection}`}
            src={URL.createObjectURL(agent.portraitBlob)}
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
          backgroundImage: `url('${URL.createObjectURL(
            agent.backgroundBlob
          )}')`,
        }}
      />
    </>
  );
};

export default AgentInfo;
