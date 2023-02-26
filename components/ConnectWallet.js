
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
        <div className='flex justify-start'>
          <div className='m-4'>
            Connected to {address}
          </div>
          <div className='flex items-center text-white'>
            <button className='h-max py-2 px-6 bg-red-400 rounded-lg' onClick={() => disconnect()}>Disconnect</button>
          </div>
        </div>
      )
    return( 
    <div>
        <button onClick={() => connect()}>Connect Wallet</button>
    </div>
    )
  }