import { useContext, useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { UserContext } from "../../App/ProtectedContainer";
import Loading from "../../assets/Loading";
import { useAppSelector } from "../../reducers/hooks";
import { createLike, removeLike, selectAllJournalLikes } from "../../reducers/journalLikeSlice";
import journalCalls, { JournalType } from "../../services/journals";
import { calcReadTime, formatDate } from "../../utils/utilfunc";
import styles from './JournalDetailsView.module.scss';

const JournalDetailsView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useContext(UserContext);
  const [journal, setJournal] = useState<JournalType | null>(null)
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
          console.error(error)
        }
      }
    })()

    return () => {
      fetching = false;
    }
  }, [id, user])

  useEffect(() => {
    if (likedJournals && journal) {
      console.log(likedJournals);
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

  const formattedDate = () => {
    if (journal) {
      return formatDate(journal.created_date);
    }
    return '';
  }

  if (!journal) {
    return <Loading />;
  }

  return (
    <div className={styles.Container}>
      <div className={styles.HeaderContainer}>
        <div>
          <div className={styles.Author}>{journal.owner}</div>
          <div className={styles.TimeDate}>
            <span className={styles.Date}>{formattedDate()}</span>
            <span className={styles.Divider}> - </span>
            <span className={styles.Time}>{calcReadTime(journal.content.length)} min read</span>
          </div>
        </div>
        <div>
          {saved 
            ? <FaBookmark className={styles.Unlike} size="25px" onClick={unSavePost} />
            : <FaRegBookmark className={styles.Like} size="25px" onClick={savePost} />
          }
        </div>
      </div>
      <div className={styles.Title}>{journal.title}</div>
      <div className={styles.Content}>{journal.content}</div>
    </div>
  )
}

export default JournalDetailsView