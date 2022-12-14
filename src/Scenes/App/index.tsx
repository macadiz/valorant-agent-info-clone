import React, { useEffect, useState } from "react";
import AgentInfo from "../../Components/AgentInfo";
import { TAgent } from "../../Components/AgentInfo/types";
import AgentList from "../../Components/AgentList";
import { getAgents, orderAgents } from "../../Components/AgentList/actions";
import PageInfo from "../../Components/PageInfo";
import { calculateGradient } from "./actions";

import "./App.css";

const App = () => {
  const [agents, setAgents] = useState<TAgent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<TAgent | null>(null);

  useEffect(() => {
    getAgents().then((agents) => {
      const orderedAgents = orderAgents(agents);
      setAgents(orderedAgents);
      setSelectedAgent(orderedAgents[0]);
    });
  }, []);

  const onSelectAgent = (agent: TAgent) => {
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
      <PageInfo selectedAgent={selectedAgent} />
    </main>
  );
};

export default App;
