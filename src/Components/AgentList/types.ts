import { TAgent } from "../AgentInfo/types"

export type AgentListProps = {
    agents: TAgent[];
    selectedAgent: TAgent | null;
    onSelectAgent: (agent: TAgent) => void; 
}