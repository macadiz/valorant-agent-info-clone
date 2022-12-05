import { TAgent } from "../AgentInfo/types";

export type AgentCardProps = {
    agent: TAgent;
    onClick: (agent: TAgent) => void;
    isSelected: boolean;
}