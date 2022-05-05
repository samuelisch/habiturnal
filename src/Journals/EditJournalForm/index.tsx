import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../assets/Button';
import { UserContext } from '../../App/ProtectedContainer';
import journalCalls from '../../services/journals';
import styles from './EditJournalForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { update, selectAllJournals } from '../../reducers/journalsSlice';
import { ImCross } from 'react-icons/im';
import { JournalType } from '../../utils/types';

const EditJournalForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [empty, setEmpty] = useState<boolean>(false);
  const allJournals = useAppSelector(selectAllJournals);

  useEffect(() => {
    if (allJournals.length && id) {
      const selectedJournal = allJournals.find(journal => journal.id === parseInt(id));
      if (selectedJournal) {
        setTitle(selectedJournal.title);
        setContent(selectedJournal.content);
      }
    }
  }, [allJournals, id]);

  useEffect(() => {
    if (title.length && content.length) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [title, content]);

  const updateJournal = async (e: FormEvent) => {
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
      const updatedJournal = (await journalCalls.updateJournal(journalObject, id)) as JournalType;
      dispatch(update(updatedJournal));
      navigate(`/journals/view/${updatedJournal.id}`);

      setTitle('');
      setContent('');
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  const handleInputChange = (e: React.FormEvent) => {
    const textbox = e.target as HTMLTextAreaElement;
    textbox.style.height = '0';
    textbox.style.height = textbox.scrollHeight + 'px';
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={styles.Sticky}>
        <ImCross className={styles.Cancel} onClick={() => navigate(-1)} />
        <span className={styles.Header}>Editing Journal</span>
        <Button
          className={styles.Button}
          type="button"
          text="Update"
          disabled={empty}
          clickHandler={updateJournal}
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
            placeholder="Update Title ..."
            maxLength={50}
          />
          <textarea
            className={styles.ContentInput}
            value={content}
            onInput={e => handleInputChange(e)}
            onChange={e => setContent(e.target.value)}
            autoComplete="off"
            placeholder="Update journal ..."
            maxLength={5000}
          />
        </form>
      </div>
    </>
  );
};

export default EditJournalForm;
