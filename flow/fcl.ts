import * as fcl from "@onflow/fcl";

fcl.config({
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Endpoint set to Testnet
  "flow.network": "testnet", // Network set to Testnet,
  "accessNode.api": "https://rest-testnet.onflow.org", // Access Node set to Testnet
  "app.detail.icon": "/submarine.png",
  "app.detail.title": "Submarine.me",
});

export default fcl;
