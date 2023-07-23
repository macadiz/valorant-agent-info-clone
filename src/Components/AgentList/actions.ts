import API from "../../Shared/API";
import constants from "../../Shared/constants";
import { TAgent, ViewAgent } from "../AgentInfo/types";

export const getAgents = async () => {
  return await API.get<TAgent[]>(
    `${constants.api_base_url}/agents?isPlayableCharacter=true`
  );
};

export const orderAgents = (agents: TAgent[]): TAgent[] => {
  return agents.sort((a, b) => (a.displayName >= b.displayName ? 1 : -1));
};

export const calculateMaxAgentsData = (containerSize: number) => {
  const agentCardWidth = 108;

  const maxAgentsInContainer = Math.floor(containerSize / agentCardWidth);

  // We add 2 agents additional so we can "scroll" animate the change
  let calculatedAgents = maxAgentsInContainer;

  if (maxAgentsInContainer % 2 > 0) {
    calculatedAgents += 2;
  } else {
    calculatedAgents += 1;
  }

  // We must always keep the selected agent to the center, thus we need always an odd quantity of agents
  return {
    calculatedAgents,
    maxContainerWidth:
      (maxAgentsInContainer % 2 === 0
        ? maxAgentsInContainer - 1
        : maxAgentsInContainer) * agentCardWidth,
  };
};

export const calculateShowingAgentsList = (
  agents: ViewAgent[],
  selectedAgent: ViewAgent,
  maxAgents: number
) => {
  const numberOfAgentsExcludingSelected = maxAgents - 1;

  const currentAgentIndex = agents.findIndex(
    (agent) => agent.uuid === selectedAgent.uuid
  );

  const numberOfAgentsBySide = numberOfAgentsExcludingSelected / 2;

  const leftList = [];
  const rightList = [];

  for (let i = 0; i < 2; i++) {
    let auxCounter = 0;
    for (let j = 0; j < numberOfAgentsBySide; j++) {
      let newAgentIndex;
      let newAgent;
      if (i === 0) {
        newAgentIndex = currentAgentIndex - (j + 1);
        if (newAgentIndex < 0) {
          const reversedList = [...agents].reverse();
          newAgent = reversedList[auxCounter];
          auxCounter++;
        } else {
          newAgent = agents[newAgentIndex];
        }
        leftList.push(newAgent);
      } else {
        newAgentIndex = currentAgentIndex + (j + 1);
        if (newAgentIndex >= agents.length) {
          newAgent = agents[auxCounter];
          auxCounter++;
        } else {
          newAgent = agents[newAgentIndex];
        }
        rightList.push(newAgent);
      }
    }
  }

  return [...leftList.reverse(), selectedAgent, ...rightList];
};

export const getNextAgent = (selectedAgent: ViewAgent, agents: ViewAgent[]) => {
  const currentAgentIndex = agents.findIndex(
    (agent) => agent.uuid === selectedAgent.uuid
  );
  if (currentAgentIndex === agents.length - 1) {
    return agents[0];
  } else {
    return agents[currentAgentIndex + 1];
  }
};

export const getPreviousAgent = (
  selectedAgent: ViewAgent,
  agents: ViewAgent[]
) => {
  const currentAgentIndex = agents.findIndex(
    (agent) => agent.uuid === selectedAgent.uuid
  );

  if (currentAgentIndex === 0) {
    return agents[agents.length - 1];
  } else {
    return agents[currentAgentIndex - 1];
  }
};
