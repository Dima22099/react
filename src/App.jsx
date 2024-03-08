import Button from './components/Button/Button';

import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import Body from './layout/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useState } from 'react';

const INITIAL_DATE = [
  // {
  //   id: 1,
  //   title: 'Подготовка к обновлению курсов',
  //   text: 'Горные походы открывают удивительные природные ланшафт',
  //   date: new Date()

  // },
  // {
  //   id: 2,
  //   title: 'поход в горы',
  //   text: 'Думал что это займет очень много времни.',
  //   date: new Date()

  // }
];

const App = () => {
  const [items, setItems] = useState(INITIAL_DATE);

  const addItems = (item) => {
    setItems((oldItems) => [...oldItems, {
      text: item.text,
      title: item.title,
      date: new Date(item.date),
      id: oldItems.length > 0 ? Math.max(...oldItems.map((i) => i.id)) + 1 : 1
    }]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={items} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItems} />
      </Body>
    </div>
  );
};

export default App;
