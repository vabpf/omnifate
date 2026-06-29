export interface HumanDesignCenter {
  id: string;
  name: string;
  defined: boolean;
  type: string;
  color: string;
}

export interface HumanDesignData {
  type: string;
  authority: string;
  strategy: string;
  profile: string;
  centers: HumanDesignCenter[];
  activeGates: number[];
  definedChannels: string[];
}
