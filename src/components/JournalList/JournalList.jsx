import './JournalList.css';
import { useContext, useMemo } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { UserContext } from '../../context/user.context';

const JournalList = ({ items, setItem }) => {
  const { userId } = useContext(UserContext);
  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  };

  const filteredItems = useMemo(() => items
    .filter((el) => el.userId === userId)
    .sort(sortItems), [items, userId]);

  if (items.length === 0) {
    return <p>Записей нет, добавьте новое воспоминание.</p>;
  }

  return (
    <>
      {filteredItems
        .map((el) => (
          <CardButton key={el.id} onClick={() => setItem(el)}>
            <JournalItem
              title={el.title}
              date={el.date}
              post={el.post}
            />
          </CardButton>
        ))}
    </>
  );
};

export default JournalList;
