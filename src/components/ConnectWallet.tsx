import React, { useState } from "react";
import styled from "styled-components";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { convertUtf8ToHex } from "@walletconnect/utils";
import { IInternalEvent } from "@walletconnect/types";
import Button from "./Button";
import Wrapper from "./Wrapper";
import Modal from "./Modal";
import Header from "./Header";
import Loader from "./Loader";
// import { fonts } from "./styles";
import { apiGetAccountAssets, apiGetGasPrices, apiGetAccountNonce } from "../helpers/api";
import {
  sanitizeHex,
  verifySignature,
  hashTypedDataMessage,
  hashMessage,
} from "../helpers/utilities";
import { convertAmountToRawNumber, convertStringToHex } from "../helpers/bignumber";
import { IAssetData } from "../helpers/types";
import Banner from "./Banner";
import AccountAssets from "./AccountAssets";
import { eip712 } from "../helpers/eip712";



const App = () => {
  const [ connector, setConnector ] = useState([])
  const [ accounts, setAccounts ] = useState([])
  const [ assets, setAssets ] = useState<IAssetData[]>([])
  const [ address, setAddress ] = useState<string>([])
  const [ connected, setConnected ] = useState<WalletConnect | null>([])
  const [ chainId, setChainId ] = useState<number>([])
  const [ fetching, setFetching ] = useState<boolean>([])
  const [ showModal, setShowModal ] = useState<boolean>([])
  const [ pendingRequest, setPendingRequest ] = useState<boolean>([])
  const [ result, setResult ] = useState<any | null>([])


  const connect = async () => {
    // bridge url
    const bridge = "https://bridge.walletconnect.org";

    // create new connector
    const connector = new WalletConnect({ bridge , qrcodeModal: QRCodeModal });
  
    setConnector(connector)
  
    // check if already connected
    if (!connector.connected) {
      // create new session
      await connector.createSession();
    }

    // subscribe to events
    await subscribeToEvents();
  };
  
  const subscribeToEvents = () => {
    const { connector } = this.state;

    if (!connector) {
      return;
    }

    connector.on("session_update", async (error: any, payload: any) => {
      console.log(`connector.on("session_update")`);

      if (error) {
        throw error;
      }

      const { chainId, accounts } = payload.params[0];
      onSessionUpdate(accounts, chainId);
    });

    connector.on("connect", (error: any, payload: any) => {
      console.log(`connector.on("connect")`);

      if (error) {
        throw error;
      }

      onConnect(payload);
    });

    connector.on("disconnect", (error: any, payload: any) => {
      console.log(`connector.on("disconnect")`);

      if (error) {
        throw error;
      }

      onDisconnect();
    });

    if (connector.connected) {
      const { chainId, accounts } = connector;
      const address = accounts[0];

      setConnected(true)
      setChainId(chainId)
      setAccounts(accounts)
      setAddress(address)
      
      onSessionUpdate(accounts, chainId);
    }

    setConnector(connector)
  };

  const killSession = async () => {
    const { connector } = this.state;
    if (connector) {
      connector.killSession();
    }
    resetApp();
  };

  const resetApp = async () => {
    setConnector([])
    setAccounts([])
    setAssets([])
    setAddress("")
    setConnected(null)
    setChainId(0)
    setFetching(false)
    setShowModal(false)
    setPendingRequest(false)
    setResult(null)
  };

  const onConnect = async (payload: IInternalEvent) => {
    const { chainId, accounts } = payload.params[0];
    const address = accounts[0];

    setConnected(true)
    setChainId(chainId)
    setAccounts(accounts)
    setAddress(address)  

    getAccountAssets();
  };

  const onDisconnect = async () => {
    resetApp();
  };

  const onSessionUpdate = async (accounts: string[], chainId: number) => {
    const address = accounts[0];

    setChainId(chainId)
    setAccounts(accounts)
    setAddress(address)

    await getAccountAssets();
  };

  const getAccountAssets = async () => {
    const { address, chainId } = this.state;

    setFetching(true)
    try {
      // get account balances
      const assets = await apiGetAccountAssets(address, chainId);

      setFetching(false)
      setAddress(address)
      setAssets(assets)
    } catch (error) {
      console.error(error);

      setFetching(false)
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const signMessage = async () => {
    if (!connector) {
      return;
    }

    // test message
    const message = `My email is john@doe.com - ${new Date().toUTCString()}`;

    // encode message (hex)
    const hexMsg = convertUtf8ToHex(message);

    // eth_sign params
    const msgParams = [address, hexMsg];

    try {
      // open modal
      toggleModal();

      // toggle pending request indicator
      setPendingRequest(true)

      // send message
      const result = await connector.signMessage(msgParams);

      // verify signature
      const hash = hashMessage(message);
      const valid = await verifySignature(address, result, hash, chainId);

      // format displayed result
      const formattedResult = {
        method: "eth_sign",
        address: address,
        valid: valid,
        result: result,
      };

      // display result
      setConnector(connector)
      setPendingRequest(false)
      setResult(formattedResult)
    } catch (error) {
      console.error(error);

      setConnector(connector)
      setPendingRequest(false)
      setResult(null)
    }
  };

  
  return (
    <div>
        <div>
          {!address && !assets.length ? (
            <div center>
              <h3>
                {`Try out WalletConnect`}
                <br />
              </h3>
              <div>
                <Button left onClick={connect} fetching={fetching}>
                  {"Connect to WalletConnect"}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              // <h3>Actions</h3>
              // <div center>
              //     <div left onClick={signMessage}>
              //       {"eth_sign"}
              //     </div>
              // </div>
              <h3>Balances</h3>
              {!fetching ? (
                <AccountAssets chainId={chainId} assets={assets} />
              ) : (
                  <div>
                    <Loader />
                  </div>
              )}
            </div>
          )}
        </div>
    </div>
  );
};

export default App;
