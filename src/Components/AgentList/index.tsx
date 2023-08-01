import { FC, useRef, useState, useEffect, useCallback } from "react";
import AgentCard from "../AgentCard";
import { ViewAgent } from "../AgentInfo/types";
import {
  calculateAgentClickDirection,
  calculateMaxAgentsData,
  calculateShowingAgentsList,
  getNextAgent,
  getPreviousAgent,
} from "./actions";

import "./agentsList.css";
import { AgentListProps } from "./types";

const AgentList: FC<AgentListProps> = ({
  agents,
  selectedAgent,
  onSelectAgent,
}) => {
  const [maxNumberOfAgents, setMaxNumberOfAgents] = useState(0);

  const [displayAgentsList, setDisplayAgentsList] = useState<ViewAgent[]>([]);

  const agentsListRef = useRef<null | HTMLDivElement>(null);

  const setNextAgent = useCallback(() => {
    if (selectedAgent && displayAgentsList.length > 0) {
      agentsListRef.current?.classList.add("next");
      setTimeout(() => {
        onSelectAgent(getNextAgent(selectedAgent, agents), "left");
        agentsListRef.current?.classList.remove("next");
      }, 70);
    }
  }, [selectedAgent, onSelectAgent, agents, displayAgentsList]);

  const setPreviousAgent = useCallback(() => {
    if (selectedAgent && displayAgentsList.length > 0) {
      agentsListRef.current?.classList.add("prev");
      setTimeout(() => {
        onSelectAgent(getPreviousAgent(selectedAgent, agents), "right");
        agentsListRef.current?.classList.remove("prev");
      }, 70);
    }
  }, [selectedAgent, onSelectAgent, agents, displayAgentsList]);

  useEffect(() => {
    if (agentsListRef.current) {
      const currentAgentList = agentsListRef.current;

      const containerSize = currentAgentList.clientWidth;

      const { calculatedAgents, maxContainerWidth } = calculateMaxAgentsData(
        containerSize ?? 0
      );

      setMaxNumberOfAgents(calculatedAgents);

      currentAgentList.style.maxWidth = `${maxContainerWidth}px`;
    }
  }, [agents, agentsListRef]);

  useEffect(() => {
    if (selectedAgent) {
      setDisplayAgentsList(
        calculateShowingAgentsList(agents, selectedAgent, maxNumberOfAgents)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAgent, maxNumberOfAgents]);

  useEffect(() => {
    const onKeyDownEvent = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft": {
          return setPreviousAgent();
        }
        case "ArrowRight": {
          return setNextAgent();
        }
      }
    };
    window.addEventListener("keydown", onKeyDownEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDownEvent);
    };
  }, [setPreviousAgent, setNextAgent]);

  return (
    <div className="agents-list" ref={agentsListRef}>
      {displayAgentsList.map((agent) => {
        const isSelected = !!selectedAgent && selectedAgent.uuid === agent.uuid;

        const calculatedDirection = calculateAgentClickDirection(
          displayAgentsList,
          agent,
          selectedAgent
        );

        return (
          <AgentCard
            key={agent.uuid}
            agent={agent}
            onClick={(agent) => onSelectAgent(agent, calculatedDirection)}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
};

export default AgentList;
