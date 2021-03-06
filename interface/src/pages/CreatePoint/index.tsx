import React, { FormEvent, useState } from 'react';
import './style.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import Items from './Items';
import Dados from './Dados';
import Endereco from './Endereco';
import api from '../../services/api';
import Dropzone from '../components/Dropzone';



const CreatePoint = () => {
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState<File>();

  async function handleSubmit(e: FormEvent){
    e.preventDefault();
    let inputChange = localStorage.getItem('inputChange');
    let selectedPosition = localStorage.getItem('selectedPosition');
    const selectedItems = localStorage.getItem('selectedItems');
    if (inputChange !== null &&
        inputChange !== '' && 
        selectedPosition !== null &&
        selectedItems !== null) {
      const { name, email, whatsapp } = JSON.parse(inputChange);
      const uf = localStorage.getItem('selectedUf');
      const city = localStorage.getItem('selectedCity');
      const [latitude, longitude] = JSON.parse(selectedPosition);
      const items:number[] = JSON.parse(selectedItems);
      
      const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', String(uf));
        data.append('city', String(city));
        data.append('latitude', latitude);
        data.append('longitude', longitude);
        data.append('items', items.join(','));
        if(selectedFile)
        data.append('image', selectedFile);

      await api.post('points', data);
      alert('Dados cadastrados');
      history.push('/')
    }
    
  }
  return(
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta"/>

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit = {handleSubmit} action="">
        <h1>Cadastro do <br/> ponto de coleta</h1>
        
        <Dropzone onFileSelected={setSelectedFile} />
        <Dados />
        <Endereco />
        <Items/>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
}
export default CreatePoint;