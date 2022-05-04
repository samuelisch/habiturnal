import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { UserContext } from "../../App/ProtectedContainer";
import Loading from "../../assets/Loading";
import journalCalls, { JournalType } from "../../services/journals";
import { calcReadTime, formatDate } from "../../utils/utilfunc";
import styles from './JournalDetailsView.module.scss';

const JournalDetailsView = () => {
  const { id } = useParams();
  const user = useContext(UserContext);
  const [journal, setJournal] = useState<JournalType | null>(null)

  useEffect(() => {
    let fetching = true;
    (async () => {
      if (id && user) {
        try {
          const singleJournal = await journalCalls.getSingleJournal(id);
          if (fetching) {
            console.log(singleJournal)
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
      <div>
      {/* add date created, ability to save post, beautify styling */}
        <span className={styles.Author}>{journal.owner}</span>
        <div className={styles.TimeDate}>
          <span className={styles.Date}>{formattedDate()}</span>
          <span className={styles.Divider}> - </span>
          <span className={styles.Time}>{calcReadTime(journal.content.length)} min read</span>
        </div>
      </div>
      <div className={styles.Title}>{journal.title}</div>
      <div className={styles.Content}>{journal.content}</div>
    </div>
  )
}

export default JournalDetailsView