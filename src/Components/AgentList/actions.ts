import API from "../../Shared/API"
import constants from "../../Shared/constants"
import { TAgent } from "../AgentInfo/types"

export const getAgents = async () => {
    return await API.get<TAgent[]>(`${constants.api_base_url}/agents?isPlayableCharacter=true`)
}

export const orderAgents = (agents: TAgent[]): TAgent[] => {
    return agents.sort((a, b) => a.displayName >= b.displayName ? 1 : -1);
}

export const calculateMaxAgents = (containerSize: number) => {
    const agentCardWidth = 108;

    const calculatedAgents = Math.floor(containerSize/agentCardWidth);

    // We must always keep the selected agent to the center, thus we need always an odd quantity of agents
    return calculatedAgents % 2 === 0 ? calculatedAgents - 1 : calculatedAgents;
}