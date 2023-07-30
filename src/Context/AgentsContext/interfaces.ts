import { Dispatch, SetStateAction } from "react";
import { ViewAgent } from "../../Components/AgentInfo/types";

export interface AgentsContextState {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  selectionDirection: string;
  agents: ViewAgent[];
  setAgents: Dispatch<SetStateAction<ViewAgent[]>>;
  selectedAgent: ViewAgent | null;
  onSelectAgent: (
    agent: ViewAgent,
    selectionDirection: "left" | "right"
  ) => void;
}
