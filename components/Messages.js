import React from 'react'
import {useState, useEffect } from 'react';
import { Client } from '@xmtp/xmtp-js'
import {useAccount, useSigner} from 'wagmi' 

export default function Message() {


    const {isConnected} = useAccount()
    const { data:signer } = useSigner()
  
    
    const createDms = async () => {
      
      if (signer) {
      const xmtp = await Client.create(signer)
      
      const conversation = await xmtp.conversations.newConversation(
        '0x05F0D0CcC2b00f55ea61684Ae2b9369e5e499F91'
        )
        
        const messages = await conversation.messages()
        console.log(messages)

        await conversation.send("Idk")

        console.log(messages)
        for await (const message of await conversation.streamMessages()) {
          console.log(`[${message.senderAddress}]: ${message.content}`)
        }
      }

      }
      
      
      useEffect(() => {
        if (isConnected) {
        createDms()
        }
      }, [isConnected, signer])


}

