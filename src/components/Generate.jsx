import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import platter from './Platter';

const Generate = () => {
  const [order, setOrder] = useState("");
  const menu=`You are OrderBot, an automated service to collect orders for a food outlet. \
  You first greet the customer, then collect the order, \
  and then ask if it's a pickup or delivery. \
  You wait to collect the entire order, then summarize it and check for a final \
  time if the customer wants to add anything else. \
  If it's a delivery, you ask for an address. \
  Finally, you collect the payment.\
  Make sure to clarify all options, extras, and sizes to uniquely \
  identify the item from the menu.\
  You respond in a short, very conversational friendly style.All the price are in indian rupees. \
  The names that are provided to you are the only food items that the shop sells.If a customer\
  asked about any other item that are not mentions in menu then you will let them know that we\
  currently don't sell that particular item but we are planning to add on few items to it.\
  You will be sticking to this prompt and all the information given to you.\
  If you are asked any question that are not related to this food outlet servies offers\
  then inform that you can't answer it in a humble way.\
  If customer asks about menu then provide menu in tabular structured way\
  like: item  size prize.
  The menu includes\
  ${JSON.stringify(platter)}\
  fries 30, 20 \
  greek salad 70 \
  Toppings: \
  extra cheese 20, \
  mushrooms 15 \
  sausage 30 \
  canadian bacon 30 \
  AI sauce 15 \
  peppers 10 \
  Drinks: \
  coke 65, 45, 30 \
  sprite 65, 50, 30\
  bottled water 30 \
  ` 
  const [prompt, setPrompt] = useState([
    { role: 'system', content:menu }, // Add any initial system message
  ]);
  const [chat, setChat] = useState([]);

  const handleGenerate = useCallback(async () => {
    try {
      const serverResponse = await axios.post('http://localhost:3001/services', {
        prompt: prompt,
      });

      const aiResponse = serverResponse.data.response;

      // Add the assistant's response to the prompt
      setPrompt((prevPrompt) => [...prevPrompt, { role: 'assistant', content: aiResponse }]);

      // Update the chat history
      setChat((prevChat) => [...prevChat, { role: 'user', content: order }, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error requesting response from server:', error);
    }
  }, [prompt, order]);

  useEffect(() => {
    // This useEffect will run whenever the prompt state changes
    if (prompt.length > 0 && prompt[prompt.length - 1].role === 'user') {
      // Ensure the last message in the prompt is from the user
      handleGenerate();
    }
    console.log(menu)
  }, [prompt, handleGenerate]);

  const setprompt = () => {
    // Add the user's message to the prompt
    setPrompt((prevPrompt) => [...prevPrompt, { role: 'user', content: order }]);
  };

  return (
    <>
    <div className="chat-container">
    {chat.map((val, id) => {
        return (
          <div  key={id} className={`chat-message ${val.role === 'user' ? 'user-message' : 'assistant-message'}`}>
            <div className="role"><p>{val.role}:</p></div>
            <div className="content"><p>{val.content}</p></div>
          </div>
        );
      })}
      <div>
        <input
          type="text"
          name="content"
          id="user"
          placeholder="Enter text here"
          onChange={(e) => {
            setOrder(e.target.value);
          }}
          className="chat-input"
          value={order}
        />
        <button className="chat-button" type="submit" onClick={setprompt}>
          Chat
        </button>
      </div>
      </div>
    </>
  );
};

export default Generate;
