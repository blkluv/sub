import * as fcl from "@onflow/fcl";
import { FlowNetwork } from "../types/UnlockInfo";

const submarineInfo = {
  "app.detail.icon": "https://app.submarine.me/submarine.png",
  "app.detail.title": "Submarine.me",
};
const testnetConfig = {
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/testnet/authn",
  "discovery.authn.include": ["0x9d2e44203cb13051", "0x82ec283f88a62e65"], // Ledger & Dapper wallet address on Testnet set to be included
  "flow.network": "testnet", // Network set to Testnet,
  "accessNode.api": "https://rest-testnet.onflow.org", // Access Node set to Testnet
  ...submarineInfo,
};

const mainnetConfig = {
  "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
  "discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/authn",
  "discovery.authn.include": ["0xead892083b3e2c6c", "0xe5cd26afebe62781"], // Ledger & Dapper wallet address on Mainnet set to be included
  "flow.network": "mainnet", // Network set to Testnet,
  "accessNode.api": "https://rest-mainnet.onflow.org", // Access Node set to Testnet //https://mainnet.onflow.org/
  ...submarineInfo,
};

const configMap = {
  [FlowNetwork.Mainnet]: mainnetConfig,
  [FlowNetwork.Testnet]: testnetConfig,
};

export const getFcl = (network: FlowNetwork) => {
  const config = configMap[network];
  fcl.config({ ...config });
  return fcl;
};
