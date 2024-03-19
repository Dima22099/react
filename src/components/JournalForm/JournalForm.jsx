import {
  useContext, useEffect, useRef, useState
} from 'react';
import cn from 'classnames';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import Input from '../input/input';
import { UserContext } from '../../context/user.context';

const INITIAL_STATE = {
  title: true,
  post: true,
  date: true
};

const JournalForm = ({ onSubmit, data, onDelete }) => {
  const [formValidState, setFormValidState] = useState(INITIAL_STATE);
  const { userId } = useContext(UserContext);

  const [id, setId] = useState(null);
  const [input, setInput] = useState('');
  const [date, setDate] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescrtiption] = useState('');

  const onInput = (e) => setInput(e.target.value);
  const onDate = (e) => setDate(e.target.value);
  const onTag = (e) => setTag(e.target.value);
  const onDescription = (e) => setDescrtiption(e.target.value);

  const focusError = (formValidState) => {
    // eslint-disable-next-line default-case
    switch (true) {
      case !formValidState.title:
        titleRef.current.focus();
        break;
      case !formValidState.post:
        postRef.current.focus();
        break;
      case !formValidState.date:
        dateRef.current.focus();
        break;
    }
  };

  const clearForm = () => {
    setId(null);
    setInput('');
    setTag('');
    setDescrtiption('');
    setDate('');
  };

  useEffect(() => {
    if (!data) {
      clearForm();
    }

    if (data) {
      const {
        id: postId, title, date, tag, post
      } = data;

      setId(postId);
      setInput(title);
      setDate(date.toISOString().slice(0, 10));
      setTag(tag);
      setDescrtiption(post);
    }
  }, [data]);

  const addJournalItem = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    const formState = {
      title: Boolean(formProps.title?.trim().length),
      post: Boolean(formProps.post?.trim().length),
      date: Boolean(formProps.date)
    };

    const isValid = Object.values(formState).every((value) => value === true);
    setFormValidState(formState);

    if (!isValid) return;

    onSubmit({
      id,
      title: input,
      date,
      tag,
      post: description,
      userId
    });

    clearForm();
  };

  return (
    <form className={styles['jounal-form']} onSubmit={addJournalItem}>
      <div>
        <Input
          className={styles.title}
          formValidState={formValidState.title}
          type="text"
          name="title"
          appearance="title"
          value={input}
          onInput={onInput}
        />
        {id && (
        <button className={styles.delete} type="button" onClick={() => onDelete(id)}>
          <img src="/arhiv.svg" alt="Кнопка удалить" />
        </button>
        )}

      </div>

      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src="/calendar.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>

        <Input
          type="date"
          name="date"
          id="date"
          value={date}
          formValidState={formValidState.date}
          onInput={onDate}
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src="/folder.svg" alt="Иконка папка" />
          <span>Метки</span>
        </label>
        <Input type="text" name="tag" id="tag" value={tag} onInput={onTag} />
      </div>

      <textarea
        onInput={onDescription}
        value={description}
        name="post"
        id=""
        cols="30"
        rows="10"
        className={cn(styles.input, {
          [styles.invalid]: !formValidState.post
        })}
      />
      <Button>Сохранить</Button>
    </form>
  );
};

export default JournalForm;
