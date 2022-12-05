import { FC } from "react";
import { AgentCardProps } from "./types";
import "./agent.css";

const AgentCard: FC<AgentCardProps> = ({ agent, onClick, isSelected }) => {
  return (
    <button
      className={`agent-button ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(agent)}
    >
      <div className="agent-button-image-wrapper">
        <div className="agent-button-image-wrapper-dot top-left" />
        <div className="agent-button-image-wrapper-dot top-right" />
        <img src={agent.displayIcon} alt={agent.description} />
        <div className="agent-button-image-wrapper-dot bottom-left" />
        <div className="agent-button-image-wrapper-dot bottom-right" />
      </div>
    </button>
  );
};

export default AgentCard;
