import { FC } from "react";
import AgentCard from "../AgentCard";

import "./agentsList.css";
import { AgentListProps } from "./types";

const AgentList: FC<AgentListProps> = ({
  agents,
  selectedAgent,
  onSelectAgent,
}) => {
  return (
    <>
      <div className="agents-list">
        {agents.map((agent) => {
          const isSelected =
            !!selectedAgent && selectedAgent.uuid === agent.uuid;
          return (
            <AgentCard
              key={agent.uuid}
              agent={agent}
              onClick={onSelectAgent}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    </>
  );
};

export default AgentList;
