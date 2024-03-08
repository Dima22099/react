import LeftPanel from '../../layout/LeftPanel/LeftPanel';
import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

const JournalList = ({ items }) => {
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
      {' '}
      {items.sort(sortItems).map((el) => (
        <CardButton key={el.id}>
          <JournalItem
            title={el.title}
            date={el.date}
            text={el.text}
          />
        </CardButton>
      ))}
    </>
  );
};

export default JournalList;
