export type Role = {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  assetPath: string;
};

export type AbilitySlot =
  | "Ability1"
  | "Ability2"
  | "Grenade"
  | "Ultimate"
  | "Passive";

export type Ability = {
  slot: AbilitySlot;
  displayName: string;
  description: string;
  displayIcon: string;
};

export type Media = {
  id: number;
  wwise: string;
  wave: string;
};

export type VoiceLine = {
  minDuration: number;
  maxDuration: number;
  mediaList: Media[];
};

export type TAgent = {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  characterTags: string[] | null;
  displayIcon: string;
  displayIconSmall: string;
  bustPortrait: string;
  fullPortrait: string;
  fullPortraitV2: string;
  killfeedPortrait: string;
  background: string;
  backgroundGradientColors: string[];
  assetPath: string;
  isFullPortraitRightFacing: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest: boolean;
  isBaseContent: boolean;
  role: Role;
  abilities: Ability[];
  voiceLine: VoiceLine;
};

export type ViewAgent = TAgent & {
  portraitBlob: Blob;
  backgroundBlob: Blob;
};

export type AgentInfoProps = {
  agent: ViewAgent;
};
