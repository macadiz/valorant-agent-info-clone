import { Role, Ability, AbilitySlot, } from "../../AgentInfo/types";

export type AgentDetailsProps = {
  name: string;
  description: string;
  role: Role;
  abilities: Ability[];
};

export type MappedAbilitySlot = AbilitySlot | 'INFO';

export type AbilityMap = {
    id: string;
    name: string;
    icon: string;
    slot: MappedAbilitySlot;
    description: string;
    specialDescription?: string;
}