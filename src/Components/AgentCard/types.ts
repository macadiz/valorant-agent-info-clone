import { ViewAgent } from "../AgentInfo/types";

export type AgentCardProps = {
  agent: ViewAgent;
  onClick: (agent: ViewAgent) => void;
  isSelected: boolean;
};
