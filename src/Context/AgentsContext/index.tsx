import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { initialAgentContextState } from "./constants";
import { ViewAgent } from "../../Components/AgentInfo/types";
import { getAgents, orderAgents } from "../../Components/AgentList/actions";
import { loadXHR } from "../../Shared/API";

const AgentsContext = createContext(initialAgentContextState);

export const AgentsContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [agents, setAgents] = useState<ViewAgent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<ViewAgent | null>(null);
  const [selectionDirection, setSelectionDirection] = useState<
    "left" | "right"
  >("right");

  useEffect(() => {
    setIsLoading(true);
    getAgents().then((agents) => {
      Promise.all(
        orderAgents(agents).map(async (agent): Promise<ViewAgent> => {
          return {
            ...agent,
            portraitBlob: await loadXHR(agent.fullPortrait),
            backgroundBlob: await loadXHR(agent.background),
          };
        })
      ).then((agents) => {
        setAgents(agents);
        setSelectedAgent(agents[0]);
        setIsLoading(false);
      });
    });
  }, []);

  const onSelectAgent = (
    agent: ViewAgent,
    selectionDirection: "left" | "right"
  ) => {
    setSelectedAgent(agent);
    setSelectionDirection(selectionDirection);
  };

  return (
    <AgentsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        selectionDirection,
        agents,
        setAgents,
        selectedAgent,
        onSelectAgent,
      }}
    >
      {children}
    </AgentsContext.Provider>
  );
};

export const useAgents = () => {
  const agentsState = useContext(AgentsContext);

  return agentsState;
};
