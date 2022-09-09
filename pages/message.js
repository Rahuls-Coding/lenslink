import React from 'react'
import {useState, useEffect } from 'react';
import { Client } from '@xmtp/xmtp-js'
import ConnectWallet from '../components/ConnectWallet'
import {useAccount, useSigner} from 'wagmi' 
import { Wallet } from 'ethers'

export default function Message() {

    
    const {isConnected} = useAccount()
    const { data:signer } = useSigner()
    
    
    const wallet = Wallet.createRandom()

    console.log(wallet)
    console.log(signer)

    const createDms = async () => {

        
        const xmtp = await Client.create(signer)
    
        const conversation = await xmtp.conversations.newConversation(
        '0x05F0D0CcC2b00f55ea61684Ae2b9369e5e499F91'
        )
            
        const messages = await conversation.messages()
        // Send a message
        await conversation.send("It's signing messages!")
        // Listen for new messages in the conversation
        console.log(messages)
        for await (const message of await conversation.streamMessages()) {
            console.log(`[${message.senderAddress}]: ${message.content}`)
        }
    
        }


        if (isConnected) {

        }


  return (
    <div>
        <ConnectWallet/>
    </div>
   
  )
}

