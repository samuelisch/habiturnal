import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Loading from "../../assets/Loading";
import journalCalls, { JournalType } from "../../services/journals";

const JournalDetailsView = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState<JournalType | null>(null)

  useEffect(() => {
    let fetching = true;
    (async () => {
      if (id) {
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
  }, [id])

  if (!journal) {
    return <Loading />;
  }

  return (
    <div>
      {/* add date created, ability to save post, beautify styling */}
      <span>by: {journal.owner}</span>
      <h1>{journal.title}</h1>
      <p>{journal.content}</p>
    </div>
  )
}

export default JournalDetailsView