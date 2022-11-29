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
}

type SharedNFTTypes = {
  type: "nft";
  network: string;
  blockchain: BlockchainOptions;
};
export interface UnlockInfoETH extends SharedNFTTypes {
  contract: string;
  tokenId?: string;
}
export interface UnlockInfoSolana extends SharedNFTTypes {
  mintAddress: string;
  updateAuthority: string;
}

export type UnlockInfoLocation = {
  lat: number;
  long: number;
  type: "location";
  distance: string;
};
export type UnlockInfoNFT = UnlockInfoETH | UnlockInfoSolana;
export type UnlockInfo = UnlockInfoRetweet | UnlockInfoNFT | UnlockInfoLocation;
