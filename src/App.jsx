// import Button from './components/Button/Button';

import './App.css';
import { useState } from 'react';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import Body from './layout/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import useLocalStorage from './components/hooks/use-localstorage.hook';
import { UserContext } from './context/user.context';

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((i) => ({
    ...i,
    date: new Date(i.date)
  }));
}

const App = () => {
  const [items, setItems] = useLocalStorage('data');
  const [userId, setUserId] = useState(2);

  const addItems = (item) => {
    setItems([...mapItems(items), {
      post: item.post,
      title: item.title,
      date: new Date(item.date),
      id: (items && items.length > 0) ? Math.max(...items.map((i) => i.id)) + 1 : 1
    }]);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton />
          <JournalList items={mapItems(items)} />
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItems} />
        </Body>
      </div>
    </UserContext.Provider>
  );
};

export default App;
