import { FC, useRef, useState, useEffect, useCallback } from "react";
import AgentCard from "../AgentCard";
import { ViewAgent } from "../AgentInfo/types";
import {
  calculateMaxAgents,
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
        onSelectAgent(getNextAgent(selectedAgent, agents));
        agentsListRef.current?.classList.remove("next");
      }, 70);
    }
  }, [selectedAgent, onSelectAgent, agents, displayAgentsList]);

  const setPreviousAgent = useCallback(() => {
    if (selectedAgent && displayAgentsList.length > 0) {
      agentsListRef.current?.classList.add("prev");
      setTimeout(() => {
        onSelectAgent(getPreviousAgent(selectedAgent, agents));
        agentsListRef.current?.classList.remove("prev");
      }, 70);
    }
  }, [selectedAgent, onSelectAgent, agents, displayAgentsList]);

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
