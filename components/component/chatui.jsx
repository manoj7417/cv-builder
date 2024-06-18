'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AskBot } from '@/app/api/api'; // Ensure this path is correct
import ChatLoader from '@/app/ui/ChatLoader';

export function Chatui() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim()) {
      const newUserMessage = { sender: 'user', text: input };
      setMessages([...messages, newUserMessage]);
      setInput('');
      setIsLoading(true)
      try {
        const reply = await AskBot(input);
        const newAIMessage = { sender: 'AI', text: reply[0].text.value };
        setMessages(messages => [...messages, newAIMessage]);
      } catch (error) {
        console.error('Error fetching response from AI:', error);
        setMessages(messages => [...messages, { sender: 'AI', text: "Sorry, I couldn't fetch a response. Please try again." }]);
      }finally{
        setIsLoading(false)
      }
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen flex-col max-h-[calc(100vh-20rem)]">
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-lg" ref={chatContainerRef}>
        <div className="grid gap-4 ">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'AI' ? '' : 'justify-end'}`}>
              <div className={`max-w-[60%] rounded-t-lg ${message.sender === 'AI' ? 'rounded-br-lg bg-gray-900 text-gray-50' : 'rounded-bl-lg bg-gray-200 text-black'} p-3`}>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading &&
            <div className='flex '>
              <ChatLoader />
            </div>
          }
        </div>
      </main>
      <div className="border-t border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center">
          <Input
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            placeholder="Type your message..."
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <Button
            className="ml-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={sendMessage}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
