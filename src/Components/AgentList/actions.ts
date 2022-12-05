import API from "../../Shared/API"
import constants from "../../Shared/constants"
import { TAgent } from "../AgentInfo/types"

export const getAgents = async () => {
    return await API.get<TAgent[]>(`${constants.api_base_url}/agents?isPlayableCharacter=true`)
}

export const orderAgents = (agents: TAgent[]): TAgent[] => {
    return agents.sort((a, b) => a.displayName >= b.displayName ? 1 : -1);
}