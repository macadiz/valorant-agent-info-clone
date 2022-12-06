import { FC, useRef, useState, useEffect } from "react";
import AgentCard from "../AgentCard";
import { TAgent } from "../AgentInfo/types";
import { calculateMaxAgents, calculateShowingAgentsList } from "./actions";

import "./agentsList.css";
import { AgentListProps } from "./types";

const AgentList: FC<AgentListProps> = ({
  agents,
  selectedAgent,
  onSelectAgent,
}) => {
  const [maxNumberOfAgents, setMaxNumberOfAgents] = useState(0);

  const [displayAgentsList, setDisplayAgentsList] = useState<TAgent[]>([]);

  const agentsListRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (agentsListRef.current) {
      const containerSize = agentsListRef.current.parentElement?.clientWidth;

      const calculatedMaxAgents = calculateMaxAgents(containerSize ?? 0);

      setMaxNumberOfAgents(calculatedMaxAgents);
    }
  }, [agents, agentsListRef]);

  useEffect(() => {
    if (selectedAgent) {
      setDisplayAgentsList(
        calculateShowingAgentsList(agents, selectedAgent, maxNumberOfAgents)
      );
    }
  }, [agents, maxNumberOfAgents, selectedAgent]);

  return (
    <div className="agents-list" ref={agentsListRef}>
      {displayAgentsList.map((agent) => {
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
