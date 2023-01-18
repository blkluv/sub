import { PlaceType } from "../components/Submarine/SelectLockType/Location/AddressAutocomplete";

interface Hsl {
  a: number;
  h: number;
  l: number;
  s: number;
}

interface Hsv {
  a: number;
  h: number;
  s: number;
  v: number;
}

interface Rgb {
  a: number;
  b: number;
  g: number;
  r: number;
}

interface ButtonColor {
  hex: string;
  hsl: Hsl;
  hsv: Hsv;
  rgb: Rgb;
  oldHue: number;
  source: string;
}

export interface Customizations {
  backgroundCid?: string;
  fontFamily?: string;
  buttonColor?: ButtonColor;
  buttonTextColor?: ButtonColor;
  buttonShape?: string;
  logoCid?: string;
}
export type UnlockInfoRetweet = {
  type: "retweet";
  tweetUrl: string;
};

export enum BlockchainOptions {
  Ethereum = "Ethereum",
  Solana = "Solana",
  Polygon = "Polygon",
  Avalanche = "Avalanche",
  Flow = "Flow",
}

type SharedNFTTypes = {
  type: "nft";
};
export interface UnlockInfoETH extends SharedNFTTypes {
  blockchain: BlockchainOptions.Ethereum;
  network: string;
  contract: string;
  tokenId?: string;
}
export interface UnlockInfoSolana extends SharedNFTTypes {
  blockchain: BlockchainOptions.Solana;
  network: string;
  mintAddress: string;
  updateAuthority: string;
}

export enum FlowNetwork {
  Mainnet = "Mainnet",
  Testnet = "Testnet",
}
export interface UnlockInfoFlow extends SharedNFTTypes {
  blockchain: BlockchainOptions.Flow;
  network: FlowNetwork;
  contract: string;
  tokenId?: string;
}

export type UnlockInfoLocation = {
  lat: number;
  long: number;
  type: "location";
  distance: string;
  place?: PlaceType;
};

export type UnlockInfoTwitch = {
  type: "twitch";
  loginName: string;
};

export type UnlockInfoNFT = UnlockInfoETH | UnlockInfoSolana | UnlockInfoFlow;
export type UnlockInfo = UnlockInfoRetweet | UnlockInfoNFT | UnlockInfoLocation | UnlockInfoTwitch;
