import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { UserContext } from "../../App/ProtectedContainer";
import Loading from "../../assets/Loading";
import journalCalls, { JournalType } from "../../services/journals";
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

  if (!journal) {
    return <Loading />;
  }

  return (
    <div className={styles.Container}>
      {/* add date created, ability to save post, beautify styling */}
      <span>by: {journal.owner}</span>
      <div>{journal.title}</div>
      <div className={styles.Content}>{journal.content}</div>
    </div>
  )
}

export default JournalDetailsView