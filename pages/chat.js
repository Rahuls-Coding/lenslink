
import dynamic from 'next/dynamic'
const ConnectWallet = dynamic(() => import('../components/ConnectWallet'), { ssr: false })
const  Message = dynamic(() => import('../components/Messages'), { ssr: false })


export default function Chat() {

  return (
    <div>
        <ConnectWallet/>
        <Message/>
    </div>
   
  )
}

