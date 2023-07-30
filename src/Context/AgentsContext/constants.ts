import { AgentsContextState } from "./interfaces";

export const initialAgentContextState: AgentsContextState = {
  isLoading: false,
  selectionDirection: "right",
  setIsLoading: () => {},
  agents: [],
  onSelectAgent: () => {},
  selectedAgent: null,
  setAgents: () => {},
};
