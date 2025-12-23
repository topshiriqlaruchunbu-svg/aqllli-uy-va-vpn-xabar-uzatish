
export type EncodingType = 'base64' | 'hex' | 'binary' | 'rot13' | 'morse';

export interface SmartHomeState {
  lights: boolean;
  temperature: number;
  ac: boolean;
  security: boolean;
  curtains: boolean;
  fridge: boolean;
  garage: boolean;
  entertainment: boolean;
  camera: boolean;
  heater: boolean;
  doorLock: boolean;
}

export interface VPNServer {
  id: string;
  name: string;
  country: string;
  latency: number;
  flag: string;
}
