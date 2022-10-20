export type Role = 'tank' | 'support' | 'dps' | 'any';

export type Hero = {
  name: string;
  image: string;
  background: string;
  role: Role;
}

export type Layout = '1-2-2' | Role;
