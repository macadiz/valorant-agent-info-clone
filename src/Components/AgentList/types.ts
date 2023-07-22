import { ViewAgent } from "../AgentInfo/types";

export type AgentListProps = {
  agents: ViewAgent[];
  selectedAgent: ViewAgent | null;
  onSelectAgent: (agent: ViewAgent) => void;
};
