import './JournalList.css';
import { useContext } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { UserContext } from '../../context/user.context';

const JournalList = ({ items }) => {
  // const { userId } = useContext(UserContext);
  const { userId } = useContext(UserContext);

  if (items.length === 0) {
    return <p>Записей нет, добавьте новое воспоминание.</p>;
  }

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  };

  return (
    <>
      {items
        .filter((el) => el.userId === userId)
        .sort(sortItems)
        .map((el) => (
          <CardButton key={el.id}>
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
