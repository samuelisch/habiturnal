import { useEffect, useState } from 'react';
import journalCalls, { JournalType } from '../../services/journals';
import JournalSingle from '../JournalSingle';

const JournalsList = () => {
  const [allJournals, setAllJournals] = useState<JournalType[]>([]);

  useEffect(() => {
    let fetching = true;
    (async () => {
      try {
        const journals = await journalCalls.getJournals();
        if (fetching) {
          setAllJournals(journals as JournalType[]);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      fetching = false;
    };
  }, []);

  const sortedJournals = allJournals.sort((a: JournalType, b: JournalType) => {
    return new Date(a['created_date']).getTime() - new Date(b['created_date']).getTime()
  })

  const displayJournals = sortedJournals.map((journal: JournalType) => (
    <JournalSingle key={journal.id} journal={journal} />
  ))

  return (
    <div>
      <h1>Journals List</h1>
      { displayJournals }
    </div>
  );
};

export default JournalsList;
