import React, { useState } from 'react';
import { GreeterClient as Greeter } from './ui_pb_service'; // Stellen Sie sicher, dass der Pfad korrekt ist
import { HelloRequest,HelloReply } from './ui_pb'; // Stellen Sie sicher, dass der Pfad korrekt ist

const App = () => {
 const [message, setMessage] = useState('noMesg');
 const [name, setName] = useState('not set');
 const [inputValue, setInputValue] = useState('not set');
 const handleInputChange = (event) => {
  setInputValue(event.target.value);
};
const handleSubmit = (event) => {
  event.preventDefault();
  setName(inputValue); // Aktualisieren Sie den Namen-State mit dem Wert aus dem Eingabefeld
};

 const sendHelloRequest = async () => {
    const client = new Greeter('http://localhost:8080'); // Ersetzen Sie die URL durch die Ihres Servers
    const request = new HelloRequest();
    request.setName(name); // Setzen Sie den Namen, den Sie senden möchten

    try {
     client.sayHello(request,function(err, response) {
        setMessage('MSG from GO BACKEND :'+ response.getMessage());
     });
    } catch (error) {
      console.error('error while sending:', error);
    }
 };

 return (
    <div>
         <p>current MSG: {name}</p>
         <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput">change msg:</label>
        <input
          type="text"
          id="nameInput"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">ok</button>
      </form>
   
    </div>
      <button onClick={sendHelloRequest}>SEND TO GO BACKEND</button>
      <p>{message}</p>
    </div>
 );
};

export default App;