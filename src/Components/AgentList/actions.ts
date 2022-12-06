import API from "../../Shared/API";
import constants from "../../Shared/constants";
import { TAgent } from "../AgentInfo/types";

export const getAgents = async () => {
  return await API.get<TAgent[]>(
    `${constants.api_base_url}/agents?isPlayableCharacter=true`
  );
};

export const orderAgents = (agents: TAgent[]): TAgent[] => {
  return agents.sort((a, b) => (a.displayName >= b.displayName ? 1 : -1));
};

export const calculateMaxAgents = (containerSize: number) => {
  const agentCardWidth = 108;

  const calculatedAgents = Math.floor(containerSize / agentCardWidth);

  // We must always keep the selected agent to the center, thus we need always an odd quantity of agents
  return calculatedAgents % 2 === 0 ? calculatedAgents - 1 : calculatedAgents;
};

export const calculateShowingAgentsList = (
  agents: TAgent[],
  selectedAgent: TAgent,
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
        console.log(newAgentIndex);
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
