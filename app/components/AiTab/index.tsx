import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { AskBot } from '@/app/pages/api/api';
import { LuBrainCircuit } from 'react-icons/lu';

interface Message {
  sender: 'user' | 'AI';
  text: string;
}

const Aitab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      // Set the scrollTop to the height of the scrollable content
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // This will scroll the chat container to show the latest message
  }, [messages]); // This effect runs every time the messages array changes

  const sendMessage = async () => {
    if (input.trim()) {
      const newUserMessage: Message = { sender: 'user', text: input };
      setMessages(messages => [...messages, newUserMessage]);
      setInput('');
      try {
        const reply = await AskBot(input);
        const newAIMessage: Message = { sender: 'AI', text: reply[0].text.value };
        setMessages(messages => [...messages, newAIMessage]);
      } catch (error) {
        console.error('Error fetching response from AI:', error);
        const errorResponse: Message = { sender: 'AI', text: "Sorry, I couldn't fetch a response. Please try again." };
        setMessages(messages => [...messages, errorResponse]);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage();
    }
  };

  return (
    <>
      <div className='flex flex-col justify-between rounded-xl shadow-xl mx-8 bg-white p-5 mb-10'>
        <div className='flex items-center justify-center space-x-2 mb-5'>
          <LuBrainCircuit className='h-6 w-6 text-indigo-700' />
          <h2 className='text-xl font-semibold text-indigo-900'>AI-powered Genie</h2>
        </div>
        <p className='text-sm text-center mb-4'>You can ask AI powered Genie your questions and grow your knowledge with the help of AI.</p>
        <div className='flex text-xs space-x-2 mb-4 justify-center'>
          <p className='bg-indigo-500 text-white rounded-2xl  p-2'>Career Planning</p>
          <p className='bg-indigo-500 text-white rounded-2xl  p-2'>Skill Development</p>
          <p className='bg-indigo-500 text-white rounded-2xl  p-2'>Resume Writing</p>
        </div>
        <div className="chat-container overflow-auto p-4 bg-blue-100 text-sm rounded-lg h-96 mb-4" ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div key={index} className={`p-2 text-white my-2 break-words ${message.sender === 'user' ? 'bg-blue-500 ml-auto rounded-l-xl rounded-tr-xl rounded-br-none rounded-bl-xl' : 'bg-green-500 mr-auto rounded-r-xl rounded-tl-xl rounded-bl-none rounded-tr-none'}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input 
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 p-2 border-2 border-gray-300 rounded-l-lg focus:outline-none"
          />
          <button 
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Aitab;
