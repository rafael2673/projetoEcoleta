import React, {useEffect, useState} from 'react';
import api from '../../services/api';


interface Item {
  id: number;
  title: string;
  image_url: string;
}
const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    })
  }, []);
  function handleSelectItem (id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if(alreadySelected >=0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }
  localStorage.setItem('selectedItems', 
      JSON.stringify(selectedItems));
  return (
    <fieldset>
        <legend>
          <h2>Itens de coleta</h2>
          <span>Selecione um ou mais itens abaixo</span>
        </legend>
        <ul className="items-grid">
            {items.map(item => (
                <li key={item.id} 
                onClick = {() => handleSelectItem(item.id)}
                className = {selectedItems.includes(item.id) ? 'selected' : ''}>
                  <img src={item.image_url} alt={item.title}/>
                  <span>{item.title}</span>
                </li>
            ))}
        </ul>
    </fieldset>
  )
}

export default Items;