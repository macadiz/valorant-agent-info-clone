import { Ability, Role } from "../types";
import { AbilityMap, MappedAbilitySlot } from "./types";

export const mapAgentAbilities = (
  abilities: Ability[],
  roleInfo: Role,
  agentDescription: string
) => {
  const abilitiesMap: AbilityMap[] = [];

  const mappedRole: AbilityMap = {
    id: `role-${roleInfo.uuid}`,
    name: roleInfo.displayName,
    icon: roleInfo.displayIcon,
    slot: "INFO",
    description: roleInfo.description,
    specialDescription: agentDescription,
  };

  abilitiesMap.push(mappedRole);

  abilities
    .filter((ability) => ability.slot !== "Passive")
    .sort((a, b) => {
      if (
        a.slot === "Grenade" &&
        (b.slot === "Ability1" ||
          b.slot === "Ability2" ||
          b.slot === "Ultimate")
      ) {
        return -1;
      }

      if (
        a.slot === "Ability1" &&
        (b.slot === "Ability2" || b.slot === "Ultimate")
      ) {
        return -1;
      }

      if (a.slot === "Ability2" && b.slot === "Ultimate") {
        return -1;
      } else {
        return 0;
      }
    })
    .forEach((ability) => {
      abilitiesMap.push({
        id: `ability-${ability.displayName}`,
        name: ability.displayName,
        icon: ability.displayIcon,
        slot: ability.slot,
        description: ability.description.replace(/\r\n/g, '<br />'),
      });
    });

  return abilitiesMap;
};

export const translateSlot = (slot: MappedAbilitySlot) => {
  switch (slot) {
    case "Ability1": {
      return "Q";
    }
    case "Ability2": {
      return "E";
    }
    case "Grenade": {
      return "C";
    }
    case "Ultimate": {
      return "X";
    }
    case "INFO": {
      return "INFO";
    }
  }
};
