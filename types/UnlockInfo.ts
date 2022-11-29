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

export type UnlockInfoETH = {
  type: "nft";
  network: string;
  blockchain: BlockchainOptions;
  contract: string;
  tokenId?: string;
};
export type UnlockInfoSolana = {
  type: "nft";
  network: string;
  blockchain: BlockchainOptions;
  mintAddress: string;
  updateAuthority: string;
};

export type UnlockInfoLocation = {
  lat: number;
  long: number;
  type: "location";
  distance: string;
};
export type UnlockInfoNFT = UnlockInfoETH | UnlockInfoSolana;
export type UnlockInfo = UnlockInfoRetweet | UnlockInfoNFT | UnlockInfoLocation;
