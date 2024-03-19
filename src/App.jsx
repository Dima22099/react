import './App.css';
import { useState } from 'react';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import Body from './layout/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import useLocalStorage from './components/hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user.context';

function mapItems(items) {
  if (!items || !items.length) {
    return [];
  }

  return items.map((i) => ({
    ...i,
    date: new Date(i.date)
  }));
}

const App = () => {
  const [items, setItems] = useLocalStorage('data');
  const [selectedItem, setSelectedItem] = useState(null);

  const addItems = (item) => {
    if (!item.id) {
      setItems([...mapItems(items), {
        ...item,
        date: new Date(item.date),
        id: (items && items.length > 0) ? Math.max(...items.map((i) => i.id)) + 1 : 1
      }]);
      return;
    }

    setItems([...mapItems(items).map((i) => {
      if (i.id === item.id) {
        return {
          ...item
        };
      }

      return i;
    })]);
  };
  const deleteItem = (id) => {
    setSelectedItem(null);
    setItems([...items.filter((i) => i.id !== id)]);
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton clearForm={() => setSelectedItem(null)} />
          <JournalList items={mapItems(items)} setItem={setSelectedItem} />
        </LeftPanel>
        <Body>
          <JournalForm
            onSubmit={addItems}
            onDelete={deleteItem}
            data={selectedItem}
          />
        </Body>
      </div>
    </UserContextProvider>
  );
};

export default App;
