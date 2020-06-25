import React, {useEffect, useState, ChangeEvent} from 'react';
import axios from 'axios';
import Mapa from './Mapa';

interface UF {
  id:number;
  sigla: string;
  nome: string;
}
interface Cidade {
  id: number;
  nome: string;
}
const Endereco = () => {
  const [ufs, setUf] = useState<UF[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([])
  
  const [selectedUF, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(resp => {
      setUf(resp.data);
    })
  }, [])
  useEffect(() => {
    if (selectedUF === '0') {
      return ;
    }
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
    .then(resp => {
      setCidades(resp.data);
    });
  }, [selectedUF]);

  function handleSelectUf(e: ChangeEvent<HTMLSelectElement>){
    const { value } = e.target;
    setSelectedUf(value);
  }
  function handleSelectCity(e: ChangeEvent<HTMLSelectElement>){
    const { value } = e.target;
    setSelectedCity(value);
  }
  localStorage.setItem('selectedUf', selectedUF);
  localStorage.setItem('selectedCity', selectedCity);
  
  return (
    <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>
          <Mapa />
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf" value = {selectedUF} onChange={handleSelectUf}>
                <option value="0">Selecione um estado</option>
                {ufs.map(uf => (
                  <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
                ))}
              </select>
            </div>
           
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city" value = {selectedCity} onChange={handleSelectCity}>
                <option value="0">Selecione uma cidade</option>
                {cidades.map(cidade => (
                  <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>
                ))}
              </select>
            </div>
          </div>
    </fieldset>
  )
}

export default Endereco;