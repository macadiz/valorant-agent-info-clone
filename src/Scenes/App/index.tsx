import React, { useEffect, useState } from "react";
import AgentInfo from "../../Components/AgentInfo";
import { ViewAgent } from "../../Components/AgentInfo/types";
import AgentList from "../../Components/AgentList";
import { getAgents, orderAgents } from "../../Components/AgentList/actions";
import PageInfo from "../../Components/PageInfo";
import { calculateGradient } from "./actions";

import "./App.css";
import { loadXHR } from "../../Shared/API";

const App = () => {
  const [agents, setAgents] = useState<ViewAgent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<ViewAgent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSelectAgent = (agent: ViewAgent) => {
    setSelectedAgent(agent);
  };

  let mainStyles = {};

  if (selectedAgent) {
    mainStyles = {
      backgroundImage: `linear-gradient(to bottom right, ${calculateGradient(
        selectedAgent.backgroundGradientColors
      )})`,
    };
  }

  return (
    <main className="main-container" style={mainStyles}>
      {isLoading ? (
        <div className="loading-container">
          <h1 className="loading-heading">LOADING...</h1>
        </div>
      ) : (
        <div className="agents-page-wrapper">
          <div className="agent-info-container">
            {selectedAgent && <AgentInfo agent={selectedAgent} />}
          </div>
          <div className="agent-list-container">
            <AgentList
              agents={agents}
              selectedAgent={selectedAgent}
              onSelectAgent={onSelectAgent}
            />
          </div>
        </div>
      )}
      <PageInfo selectedAgent={selectedAgent} />
    </main>
  );
};

export default App;
