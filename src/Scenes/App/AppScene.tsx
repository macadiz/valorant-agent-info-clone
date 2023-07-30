import AgentInfo from "../../Components/AgentInfo";
import AgentList from "../../Components/AgentList";
import PageInfo from "../../Components/PageInfo";
import { useAgents } from "../../Context/AgentsContext";
import { calculateGradient } from "./actions";

const AppScene = () => {
  const { isLoading, agents, selectedAgent, onSelectAgent } = useAgents();

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

export default AppScene;
