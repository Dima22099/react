import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import Input from '../input/input';

const INITIAL_STATE = {
  title: true,
  post: true,
  date: true
};

const JournalForm = ({ onSubmit }) => {
  const [formValidState, setFormValidState] = useState(INITIAL_STATE);
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();

  useEffect(() => {
    let timeId;
    if (!formValidState.title || !formValidState.post || !formValidState.date) {
      timeId = setTimeout(() => {
        setFormValidState(INITIAL_STATE);
      }, 2000);
    }
    return () => {
      clearTimeout(timeId);
    };
  }, [formValidState]);

  const addJournalItem = (e) => {
    e.preventDefault();
    e.target.reset();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let isFormValid = true;

    if (!formProps.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, title: true }));
    }
    if (!formProps.post?.trim().length) {
      setFormValidState((state) => ({ ...state, post: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, post: true }));
    }
    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, date: true }));
    }
    if (!isFormValid) {
      return;
    }
    onSubmit(formProps);
  };
  return (
    <form className={styles['jounal-form']} onSubmit={addJournalItem}>

      <div>
        <Input
          formValidState={formValidState.title}
          ref={titleRef}
          type="text"
          name="title"
          appearance="title"
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src="/calendar.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>

        <Input
          ref={dateRef}
          type="date"
          name="date"
          id="date"
          formValidState={formValidState.date}
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src="/folder.svg" alt="Иконка папка" />
          <span>Метки</span>
        </label>
        <Input type="text" name="tag" id="tag" />
      </div>

      <textarea
        ref={postRef}
        name="post"
        id=""
        cols="30"
        rows="10"
        className={cn(styles.input, {
          [styles.invalid]: !formValidState.post
        })}
      />
      <Button text="Сохранить" />
    </form>
  );
};

export default JournalForm;
