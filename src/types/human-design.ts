export interface HumanDesignCenter {
  id: string;
  name: string;
  defined: boolean;
  type: string;
  color: string;
}

export interface IncarnationCross {
  type: string;
  personalitySun: { gate: number; line: number };
  personalityEarth: { gate: number; line: number };
  designSun: { gate: number; line: number };
  designEarth: { gate: number; line: number };
}

export interface HumanDesignData {
  type: string;
  authority: string;
  strategy: string;
  profile: string;
  centers: HumanDesignCenter[];
  activeGates: number[];
  definedChannels: string[];
  incarnationCross?: IncarnationCross;
}
