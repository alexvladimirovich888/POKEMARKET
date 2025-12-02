import { PokemonAsset, Rarity, PokeType, Transaction } from './types';

export const SOLANA_PURPLE = '#9945FF';
export const SOLANA_GREEN = '#14F195';

const POKEMON_DB = [
  { id: 25, name: "Pikachu" },
  { id: 6, name: "Charizard" },
  { id: 1, name: "Bulbasaur" },
  { id: 7, name: "Squirtle" },
  { id: 150, name: "Mewtwo" },
  { id: 94, name: "Gengar" },
  { id: 133, name: "Eevee" },
  { id: 143, name: "Snorlax" },
  { id: 448, name: "Lucario" },
  { id: 384, name: "Rayquaza" },
  { id: 149, name: "Dragonite" },
  { id: 445, name: "Garchomp" },
  { id: 282, name: "Gardevoir" },
  { id: 248, name: "Tyranitar" },
  { id: 249, name: "Lugia" },
  { id: 250, name: "Ho-Oh" },
  { id: 382, name: "Kyogre" },
  { id: 383, name: "Groudon" },
  { id: 145, name: "Zapdos" },
  { id: 146, name: "Moltres" },
  { id: 144, name: "Articuno" },
  { id: 59, name: "Arcanine" },
  { id: 130, name: "Gyarados" },
  { id: 65, name: "Alakazam" },
  { id: 68, name: "Machamp" },
  { id: 74, name: "Geodude" },
  { id: 131, name: "Lapras" },
  { id: 132, name: "Ditto" },
  { id: 134, name: "Vaporeon" },
  { id: 135, name: "Jolteon" },
  { id: 136, name: "Flareon" },
  { id: 197, name: "Umbreon" },
  { id: 196, name: "Espeon" },
  { id: 212, name: "Scizor" },
  { id: 214, name: "Heracross" },
  { id: 257, name: "Blaziken" },
  { id: 260, name: "Swampert" },
  { id: 254, name: "Sceptile" },
  { id: 373, name: "Salamence" },
  { id: 376, name: "Metagross" }
];

const DESCRIPTIONS = [
  "Known for its lightning-fast speed and electric personality.",
  "A powerful creature that dominates the battlefield with fire.",
  "A loyal companion with a mysterious past and hidden potential.",
  "Ancient power flows through this legendary beast.",
  "A rare specimen found only in the deep digital abyss of Solana.",
  "Evolves under specific conditions, showcasing unique adaptability.",
  "Its presence alone changes the atmosphere of the battle.",
];

const getRandomEnum = <T>(anEnum: T): T[keyof T] => {
  const enumValues = Object.keys(anEnum) as Array<keyof T>;
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return anEnum[enumValues[randomIndex]];
};

const generateStats = () => [
  { name: 'HP', value: Math.floor(Math.random() * 100) + 50, fullMark: 150 },
  { name: 'ATK', value: Math.floor(Math.random() * 100) + 50, fullMark: 150 },
  { name: 'DEF', value: Math.floor(Math.random() * 100) + 50, fullMark: 150 },
  { name: 'SPD', value: Math.floor(Math.random() * 100) + 50, fullMark: 150 },
  { name: 'SPC', value: Math.floor(Math.random() * 100) + 50, fullMark: 150 },
];

const generateHistory = (): Transaction[] => {
  const types: ('List' | 'Sale' | 'Offer')[] = ['List', 'Sale', 'Offer'];
  return Array.from({ length: 3 }).map((_, i) => ({
    id: `tx-${Math.random().toString(36).substr(2, 9)}`,
    type: types[Math.floor(Math.random() * types.length)],
    price: parseFloat((Math.random() * 10).toFixed(2)),
    from: `${Math.random().toString(36).substr(2, 4)}...${Math.random().toString(36).substr(2, 4)}`,
    to: `${Math.random().toString(36).substr(2, 4)}...${Math.random().toString(36).substr(2, 4)}`,
    date: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleDateString(),
  }));
};

export const MOCK_ASSETS: PokemonAsset[] = POKEMON_DB.map((poke, index) => {
  const isAuction = Math.random() > 0.7;
  // Using high-quality official artwork (Real images)
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`;

  return {
    id: `pokemarket-${index + 1}`,
    name: poke.name,
    description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
    image: image,
    type: getRandomEnum(PokeType) as PokeType,
    rarity: getRandomEnum(Rarity) as Rarity,
    price: parseFloat((Math.random() * (isAuction ? 5 : 50) + 0.5).toFixed(2)),
    owner: Math.random() > 0.5 ? 'Marketplace' : '8xQt...9Lp2',
    level: Math.floor(Math.random() * 99) + 1,
    stats: generateStats(),
    isAuction,
    auctionEndsAt: isAuction ? Date.now() + Math.random() * 86400000 * 2 : undefined,
    history: generateHistory(),
  };
});

export const MOCK_USER_ADDRESS = "Hu3k...9Xm2";
export const MOCK_INITIAL_BALANCE = 145.5;