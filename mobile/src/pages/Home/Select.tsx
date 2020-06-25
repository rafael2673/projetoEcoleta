import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Picker, StyleSheet, AsyncStorage } from 'react-native';

interface UF {
  id: number;
  sigla: string;
  nome: string;
}
interface Cidade {
  id: number;
  nome: string;
}

const Select = () => {
  const [ufs, setUf] = useState<UF[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([])
  

  const [selectedUF, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(resp => {
      setUf(resp.data);
    })
  }, [])
  useEffect(() => {
    if (selectedUF === '0') {
      return;
    }
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
      .then(resp => {
        setCidades(resp.data);
      });
  }, [selectedUF]);
  AsyncStorage.setItem('uf', selectedUF);
  AsyncStorage.setItem('city', selectedCity);
  return (
    <>
      <Picker style = {styles.select} selectedValue = {selectedUF} onValueChange = {value => setSelectedUf(value)}>
        <Picker.Item label = 'Selecione um estado' />
        {ufs.map(uf => (
          <Picker.Item key={uf.id} label={uf.nome} value={uf.sigla} />
        ))}
      </Picker>
      <Picker style = {styles.select} selectedValue = {selectedCity} onValueChange = {value => setSelectedCity(value)}>
        <Picker.Item  label = 'Selecione uma cidade' value = ''/>
        {cidades.map(cidade => (
          <Picker.Item key={cidade.id} label={cidade.nome} value={cidade.nome} />
        ))}
      </Picker>

    </>
  );
}
const styles = StyleSheet.create({
  select: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 80,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#939393',
  },
});
export default Select;