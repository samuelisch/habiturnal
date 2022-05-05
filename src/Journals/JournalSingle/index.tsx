import { useNavigate } from 'react-router-dom';
import journalCalls, { JournalType } from '../../services/journals';
import { calcReadTime } from '../../utils/utilfunc';
import styles from './JournalSingle.module.scss';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import TimeAgo from '../../assets/TimeAgo';
import ReactCountryFlag from 'react-country-flag';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App/ProtectedContainer';
import { useDispatch } from 'react-redux';
import { createLike, removeLike, selectAllJournalLikes } from '../../reducers/journalLikeSlice';
import { useAppSelector } from '../../reducers/hooks';

interface Props {
  journal: JournalType;
}

const JournalSingle = ({ journal }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useContext(UserContext)
  const [saved, setSaved] = useState<boolean>(false);
  const likedJournals = useAppSelector(selectAllJournalLikes);

  useEffect(() => {
    if (likedJournals && journal) {
      const response = likedJournals.filter(likedJournal => likedJournal.id === journal.id);
      if (response.length) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    }
  }, [likedJournals, journal])

  const savePost = async () => {
    if (user && journal) {
      const likesObj = {
        user: user.id,
        journals: journal.id
      }
      
      await journalCalls.createJournalLike(likesObj);
      dispatch(createLike(journal));
      setSaved(true);
    }
  }

  const unSavePost = async () => {
    if (journal && user) {
      await journalCalls.deleteJournalLike(journal.id, user.id)
      dispatch(removeLike(journal))
      setSaved(false);
    }
  }

  const openJournal = () => {
    navigate(`/journals/view/${journal.id}`);
  };

  const cutPreview = (words: string) => {
    return words.length > 100 ? `${words.slice(0, 100)} ...` : words;
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Meta} onClick={() => navigate(`/user/${journal.user}`)}>
        <div className={styles.AuthorContainer}>
          <span className={styles.Author}>{journal.owner}</span>
          <span className={styles.Divider}> - </span>
          <span className={styles.Country}>
            <ReactCountryFlag countryCode={journal.location} />
          </span>
        </div>
        <div>
          <TimeAgo timestamp={new Date(journal.created_date).toISOString()} />
        </div>
      </div>
      <div className={styles.JournalLink} onClick={openJournal}>
        <div className={styles.Title}>{journal.title}</div>
        <div className={styles.Preview}>{cutPreview(journal.content)}</div>
      </div>
      <div className={styles.Actions}>
        <div>
          <span className={styles.ReadTime} onClick={openJournal}>
            {calcReadTime(journal.content.length)} min read
          </span>
          <span className={styles.Divider}> - </span>
        </div>
        <div>
          {saved 
          ? <FaBookmark className={styles.Unlike} size="15px" onClick={unSavePost} />
          : <FaRegBookmark className={styles.Like} size="15px" onClick={savePost} />
          }
        </div>
      </div>
    </div>
  );
};

export default JournalSingle;
