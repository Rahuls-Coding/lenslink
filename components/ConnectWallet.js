
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'


export default function ConnectWallet() {
      

    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()
  
    console.log('running twice?')

    if (isConnected)
      return (
        <div>
          Connected to {address}
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      )
    return( 
    <div>
        <button onClick={() => connect()}>Connect Wallet</button>
    </div>
    )
  }