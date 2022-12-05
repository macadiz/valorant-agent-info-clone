import { FC, useRef, useState, useEffect } from "react";
import AgentCard from "../AgentCard";
import { calculateMaxAgents } from "./actions";

import "./agentsList.css";
import { AgentListProps } from "./types";

const AgentList: FC<AgentListProps> = ({
  agents,
  selectedAgent,
  onSelectAgent,
}) => {
  const [maxNumberOfAgents, setMaxNumberOfAgents] = useState(0);
  const agentsListRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (agentsListRef.current) {
      const containerSize = agentsListRef.current.parentElement?.clientWidth;

      const calculatedMaxAgents = calculateMaxAgents(containerSize ?? 0);

      console.log(containerSize, calculatedMaxAgents);

      setMaxNumberOfAgents(calculatedMaxAgents);
    }
  }, [agents, agentsListRef]);

  return (
    <div className="agents-list" ref={agentsListRef}>
      {agents.slice(0, maxNumberOfAgents).map((agent) => {
        const isSelected = !!selectedAgent && selectedAgent.uuid === agent.uuid;
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
  );
};

export default AgentList;
