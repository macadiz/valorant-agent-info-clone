import { FC, useEffect, useState } from "react";
import { AbilityMap, AgentDetailsProps } from "./types";
import { mapAgentAbilities, translateSlot } from "./actions";

import "./AgentDetails.css";

const AgentDetails: FC<AgentDetailsProps> = ({
  name,
  role,
  abilities,
  description,
}) => {
  const [mappedAbilities, setMappedAgentAbilities] = useState<AbilityMap[]>([]);
  const [selectedAbility, setSelectedAbility] = useState<AbilityMap | null>(
    null
  );

  useEffect(() => {
    setMappedAgentAbilities(mapAgentAbilities(abilities, role, description));
  }, [abilities, role, description]);

  useEffect(() => {
    if (mapAgentAbilities.length) {
      setSelectedAbility(mappedAbilities[0]);
    }
  }, [mappedAbilities]);

  const onChangeSelectedAbility = (ability: AbilityMap) => {
    setSelectedAbility(ability);
  };

  console.log(selectedAbility);

  return (
    <div className="agent-details">
      <h1 className="role-name">{role.displayName}</h1>
      <h1 className="agent-name">{name}</h1>
      <div className="abilities-wrapper">
        {mappedAbilities.map((ability) => {
          return (
            <button
              key={ability.id}
              className={`ability-tab ${
                selectedAbility && selectedAbility.id === ability.id
                  ? "selected"
                  : ""
              }`}
              onClick={() => onChangeSelectedAbility(ability)}
            >
              <span>{translateSlot(ability.slot)}</span>
              <div className="separator" />
              <img
                className="ability-image"
                src={ability.icon}
                alt={ability.description}
              />
            </button>
          );
        })}
      </div>
      <div className="description-wrapper">
        {selectedAbility ? (
          <>
            {selectedAbility.specialDescription && (
              <p className="special-description">
                {selectedAbility.specialDescription}
              </p>
            )}
            <h2 className="description-heading">{selectedAbility.name}</h2>
            <p
              className="description"
              dangerouslySetInnerHTML={{
                __html: selectedAbility.description,
              }}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AgentDetails;
