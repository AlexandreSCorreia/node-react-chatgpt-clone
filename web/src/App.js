import './App.css';
import './styles/reset.css';
import { useState} from 'react';

import {makeRequest} from './api/api'
import SideMenu from './components/SideMenu/Sidemenu'
import ChatMessage from './components/ChatMessage/ChatMessage'

function App() {

  const [input, setInput] = useState("")
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message:"Estou atuando como um gerador de commits semanticos, como posso te ajudar hoje?"
  }])


  async function handleSubmit(e) {
    e.preventDefault();

    let finalPrompt = `Act as a commit messager generator aways semantic commits
    ${input}
    {REGRAS}
    > Gere 3 exemplos de commit para hotfix, feature e bug
    > Escreva eles em portugues que sejam simples e diretos
    > Seja direto sem comentarios, explicações, observações e dicas `;
    
    let response = await makeRequest({prompt: finalPrompt})

    response = response.data.split('\n')
    .map(line => <p>{line}</p>);

    setChatLog([...chatLog, {
      user: 'me', 
      message: `${input}`
    },{
      user: 'gpt', 
      message: response
    }])
    setInput("")
  }

  return (
    <div className='App'>

      <SideMenu></SideMenu>

      <section className='chatbox'>

          <div className='chat-log'>
            {chatLog.map((message, index)=>(
              <ChatMessage key={index} message={message} />
            ))}
          </div>

          <div className='chat-input-holder'>
            <form onSubmit={handleSubmit}>
              <input
                rows='1'
                className='chat-input-textarea'
                value={input}
                onChange={e =>setInput(e.target.value)}
              >
              </input>
            </form>
          </div>
      </section>

    </div>
  );
}

export default App;
