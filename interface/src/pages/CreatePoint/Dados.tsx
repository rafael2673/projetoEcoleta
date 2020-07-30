import React, { useState, ChangeEvent } from 'react';


const Dados = () => {
  const [inputChange, setInputChange] = useState({
    name: '',
    email: '',
    whatsapp: '+55'
  });

  function handleInputChange (e: ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;

    setInputChange({...inputChange, [name]: value });
  }
  localStorage.setItem('inputChange', 
      JSON.stringify(inputChange));
  return (
      <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>
            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
              <input type="text" name="name" id="name" onChange = {handleInputChange}/>
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange = {handleInputChange}/>
            </div>
            <div className="field">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input type="text" name="whatsapp" id="whatsapp" onChange = {handleInputChange}/>
            </div>
      </fieldset>
  )
}

export default Dados;