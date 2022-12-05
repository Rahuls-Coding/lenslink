import React from 'react'
import {useState, useEffect } from 'react';
import { Client } from '@xmtp/xmtp-js'
import {useAccount, useSigner} from 'wagmi' 

export default function Message() {


    const {isConnected} = useAccount()
    const { data:signer } = useSigner()
    const [message, setMessage] = useState('')
    const [xmtpClient, setXmtpClient] = useState(null)
    const [messages, setMessages] = useState([])
  
    
    const createDms = async () => {
      
      if (signer) {
        const xmtp = await Client.create(signer)
        setXmtpClient(xmtp)
        const conversation = await xmtp.conversations.newConversation(
          '0x05F0D0CcC2b00f55ea61684Ae2b9369e5e499F91'
          )
        for await (const message of await conversation.streamMessages()) {  
          console.log(`[${message.senderAddress}]: ${message.content}`)
          const memo = message.content
          setMessages((t) => [...t, memo])
        }
      }
    }
    
    const sendMessage = async () => {
      if (signer) {
        const conversation = await xmtpClient.conversations.newConversation(
          '0x05F0D0CcC2b00f55ea61684Ae2b9369e5e499F91'
          )
          if (message === '') {
            alert("Cant't send empty message")
          } else {
            await conversation.send(message)
          }
          setMessage('')
        } 
          else {
          alert("Please connect your wallet & Sign the Message")
        }
      }

      const onChange =(e) => {
        e.preventDefault()
        setMessage(e.target.value) 
      }


      const onSubmit = (e) => {
        e.preventDefault()
        sendMessage()

      }
      

  


      useEffect(() => {
        if (isConnected) {
        createDms()
        }
      }, [isConnected, signer])




    return (
        <div>
            {
              isConnected ? 
              
              <form onSubmit={onSubmit}>
              <input className="rounded-md p-1 pl-3 m-3" onChange={onChange} value={message} type="text" placeholder="Message" />
              <button type="submit" className='rounded-md text-md p-1 w-16 h-fit bg-blue-400'>Send</button>
            </form>
            : null}
            {messages.map((message, id) => {
              return <div key={id} >{message}</div>
            })}
        </div>
    )
}



