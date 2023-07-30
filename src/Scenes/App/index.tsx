import "./App.css";
import { AgentsContextProvider } from "../../Context/AgentsContext";
import AppScene from "./AppScene";

const App = () => {
  return (
    <AgentsContextProvider>
      <AppScene />
    </AgentsContextProvider>
  );
};

export default App;
