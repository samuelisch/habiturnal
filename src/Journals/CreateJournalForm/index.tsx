import React, { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../assets/Button';
import { UserContext } from '../../App/ProtectedContainer';
import journalCalls, { JournalType } from '../../services/journals';
import styles from './CreateJournalForm.module.scss';
import { useAppDispatch } from '../../reducers/hooks';
import { create } from '../../reducers/journalsSlice';

const CreateJournalForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const submitJournal = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return; // something's really wrong if this happens
    try {
      const journalObject = {
        user: user.id,
        title,
        content,
        owner: user.username,
      };
      const newJournal = await journalCalls.createJournal(journalObject) as JournalType;
      dispatch(create(newJournal));
      navigate(`/journals/view/${newJournal.id}`)

      setTitle('');
      setContent('');
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className={styles.Container}>
      <h1>Journal Form</h1>
      <form className={styles.FormContainer} onSubmit={submitJournal}>
        <input
          aria-label="journalTitle"
          className={styles.TitleInput}
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className={styles.ContentInput}
          value={content}
          onChange={e => setContent(e.target.value)}
          autoComplete="off"
          placeholder="What's been on? ..."
        />
        <Button
          className={styles.Button}
          type="button"
          text="Cancel"
          clickHandler={() => navigate(-1)}
        />
        <Button className={styles.Button} type="submit" text="Complete reflection" />
      </form>
    </div>
  );
};

export default CreateJournalForm;
