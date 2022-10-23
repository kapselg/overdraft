export type Role = 'tank' | 'support' | 'dps' | 'any';

export type Hero = {
  name: string;
  image: string;
  background: string;
  role: Role;
  shortName: string;
  defaultOn: boolean;
}

export type Layout = '1-2-2' | Role;
