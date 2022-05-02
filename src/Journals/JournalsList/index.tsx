import { useAppSelector } from '../../reducers/hooks';
import { selectAllJournals } from '../../reducers/journalsSlice';
import { JournalType } from '../../services/journals';
import JournalSingle from '../JournalSingle';

const JournalsList = () => {
  const allJournals = useAppSelector(selectAllJournals);

  const sortedJournals = [...allJournals].sort((a: JournalType, b: JournalType) => {
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
