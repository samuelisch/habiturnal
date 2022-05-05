import { useContext, useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../App/ProtectedContainer';
import Loading from '../../assets/Loading';
import { useAppSelector } from '../../reducers/hooks';
import { createLike, removeLike, selectAllJournalLikes } from '../../reducers/journalLikeSlice';
import journalCalls from '../../services/journals';
import { calcReadTime, formatDate } from '../../utils/utilfunc';
import styles from './JournalDetailsView.module.scss';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import { remove } from '../../reducers/journalsSlice';
import { JournalType } from '../../utils/types';
import { PositiveToast } from '../../assets/Toast';

const JournalDetailsView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [journal, setJournal] = useState<JournalType | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const likedJournals = useAppSelector(selectAllJournalLikes);

  useEffect(() => {
    let fetching = true;
    (async () => {
      if (id && user) {
        try {
          const singleJournal = await journalCalls.getSingleJournal(id);
          if (fetching) {
            setJournal(singleJournal as JournalType);
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();

    return () => {
      fetching = false;
    };
  }, [id, user]);

  useEffect(() => {
    if (likedJournals && journal) {
      const response = likedJournals.filter(likedJournal => likedJournal.id === journal.id);
      if (response.length) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    }
  }, [likedJournals, journal]);

  const savePost = async () => {
    if (user && journal) {
      const likesObj = {
        user: user.id,
        journals: journal.id,
      };

      await journalCalls.createJournalLike(likesObj);
      dispatch(createLike(journal));
      setSaved(true);
    }
  };

  const unSavePost = async () => {
    if (journal && user) {
      await journalCalls.deleteJournalLike(journal.id, user.id);
      dispatch(removeLike(journal));
      setSaved(false);
    }
  };

  const formattedDate = () => {
    if (journal) {
      return formatDate(journal.created_date);
    }
    return '';
  };

  if (!journal || !user) {
    return <Loading />;
  }

  const deleteJournal = async () => {
    await journalCalls.deleteJournal(journal.id);
    dispatch(remove(journal.id));
    PositiveToast('Successfully deleted journal');
    navigate('/home');
  };

  const editJournal = () => {
    navigate(`/journals/edit/${journal.id}`);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.HeaderContainer}>
        <div>
          <div className={styles.Author} onClick={() => navigate(`/user/${journal.user}`)}>
            {journal.owner}
          </div>
          <div className={styles.TimeDate}>
            <span className={styles.Date}>{formattedDate()}</span>
            <span className={styles.Divider}> - </span>
            <span className={styles.Time}>{calcReadTime(journal.content.length)} min read</span>
          </div>
        </div>
        <div>
          {saved ? (
            <FaBookmark className={styles.Unlike} size="25px" onClick={unSavePost} />
          ) : (
            <FaRegBookmark className={styles.Like} size="25px" onClick={savePost} />
          )}
        </div>
      </div>
      <div className={styles.Title}>{journal.title}</div>
      <div className={styles.Content}>{journal.content}</div>
      {user.id === journal.user ? (
        <div className={styles.BtnContainer}>
          <div className={styles.EditBtn}>
            <AiOutlineEdit onClick={editJournal} className={styles.Edit} size="25px" />
          </div>
          <div className={styles.DeleteBtn}>
            <RiDeleteBin6Line onClick={deleteJournal} className={styles.Delete} size="25px" />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default JournalDetailsView;
