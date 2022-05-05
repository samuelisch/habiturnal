import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../assets/Button';
import { UserContext } from '../../App/ProtectedContainer';
import journalCalls, { JournalType } from '../../services/journals';
import styles from './CreateJournalForm.module.scss';
import { useAppDispatch } from '../../reducers/hooks';
import { create } from '../../reducers/journalsSlice';
import { ImCross } from 'react-icons/im';

const CreateJournalForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [empty, setEmpty] = useState<boolean>(true);

  const submitJournal = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return; // something's really wrong if this happens
    try {
      const journalObject = {
        user: user.id,
        title,
        content,
        owner: user.username,
        location: user.location,
      };
      const newJournal = (await journalCalls.createJournal(journalObject)) as JournalType;
      dispatch(create(newJournal));
      navigate(`/journals/view/${newJournal.id}`);

      setTitle('');
      setContent('');
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (title.length && content.length) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [title, content]);

  const handleInputChange = (e: React.FormEvent) => {
    const textbox = e.target as HTMLTextAreaElement
    textbox.style.height = '0';
    textbox.style.height = textbox.scrollHeight + "px"
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={styles.Sticky}>
        <ImCross className={styles.Cancel} onClick={() => navigate(-1)} />
        <span className={styles.Header}>{user.username}'s new entry</span>
        <Button
          className={styles.Button}
          type="button"
          text="Publish"
          disabled={empty}
          clickHandler={submitJournal}
        />
      </div>
      <div className={styles.Container}>
        <form className={styles.FormContainer}>
          <input
            aria-label="journalTitle"
            className={styles.TitleInput}
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            maxLength={50}
          />
          <textarea
            className={styles.ContentInput}
            value={content}
            onInput={e => handleInputChange(e)}
            onChange={e => setContent(e.target.value)}
            autoComplete="off"
            placeholder="What's been on? ..."
            maxLength={5000}
          />
        </form>
      </div>
    </>
  );
};

export default CreateJournalForm;
