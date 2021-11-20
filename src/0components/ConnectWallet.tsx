import WalletConnectClient from "@walletconnect/client";

import { CLIENT_EVENTS } from "@walletconnect/client";
import { PairingTypes } from "@walletconnect/types";



export default function ConnectWallet() {
// Create Session
// Initiate your WalletConnect client with the relay server



// const client = await WalletConnectClient.init({
const client = async() => await WalletConnectClient.init({
  relayProvider: "wss://relay.walletconnect.com",
  metadata: {
    name: "Example Dapp",
    description: "Example Dapp",
    url: "#",
    icons: ["https://walletconnect.com/walletconnect-logo.png"],
  },
});




// Subscribe to pairing proposal event for sharing URI
client.on(
  CLIENT_EVENTS.pairing.proposal,
  async (proposal: PairingTypes.Proposal) => {
    // uri should be shared with the Wallet either through QR Code scanning or mobile deep linking
    const { uri } = proposal.signal.params;
  }
);


// Connect application and specify session permissions

// const session = await client.connect({
const session = async(client: WalletConnectClient) => await client.connect({
    permissions: {
      blockchain: {
        chains: ["eip155:1"],
      },
      jsonrpc: {
        methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
      },
    },
  });


//  JSON-RPC Payloads
// Once the session has been successful then you can start making JSON-RPC 
// requests to be approved and signed by the walle

const result = await client.request({
    topic: session.topic,
    chainId: "eip155:1",
    request: {
      id: 1,
      jsonrpc: "2.0",
      method: "personal_sign",
      params: [
        "0x1d85568eEAbad713fBB5293B45ea066e552A90De",
        "0x7468697320697320612074657374206d65737361676520746f206265207369676e6564",
      ],
    },
  });



}