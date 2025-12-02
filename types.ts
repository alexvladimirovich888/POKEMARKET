export enum Rarity {
  COMMON = 'Common',
  RARE = 'Rare',
  EPIC = 'Epic',
  LEGENDARY = 'Legendary',
}

export enum PokeType {
  FIRE = 'Fire',
  WATER = 'Water',
  GRASS = 'Grass',
  ELECTRIC = 'Electric',
  PSYCHIC = 'Psychic',
  DRAGON = 'Dragon',
  GHOST = 'Ghost',
  NORMAL = 'Normal',
}

export interface Stat {
  name: string;
  value: number;
  fullMark: number;
}

export interface Transaction {
  id: string;
  type: 'List' | 'Sale' | 'Offer';
  price: number;
  from: string;
  to: string;
  date: string;
}

export interface PokemonAsset {
  id: string;
  name: string;
  description: string;
  image: string;
  type: PokeType;
  rarity: Rarity;
  price: number; // in SOL
  owner: string;
  level: number;
  stats: Stat[];
  isAuction: boolean;
  auctionEndsAt?: number; // Timestamp
  history: Transaction[];
}

export interface UserState {
  isConnected: boolean;
  address: string | null;
  balance: number;
  inventoryIds: string[];
}