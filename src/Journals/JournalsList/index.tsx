import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { fetchJournals, selectAllJournals } from '../../reducers/journalsSlice';
import { JournalType } from '../../services/journals';
import JournalSingle from '../JournalSingle';
import styles from './JournalsList.module.scss';

interface Props {
  filter?: string;
}

const JournalsList = ({ filter }: Props) => {
  const dispatch = useAppDispatch();
  const allJournals = useAppSelector(selectAllJournals);

  useEffect(() => {
    (async () => {
      if (filter === 'user') {
        
      }
      else if (filter === 'saved') {}
      else if (filter === 'near') {}
      else {
        await dispatch(fetchJournals());
    }})();
  }, [filter, dispatch]);

  const sortedJournals = [...allJournals].sort((a: JournalType, b: JournalType) => {
    return new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
  })

  const displayJournals = sortedJournals.map((journal: JournalType) => (
    <JournalSingle key={journal.id} journal={journal} />
  ))

  return (
    // TODO: TABS FOR ALL / NEAR YOU
    <div>
      <h1>Journals List</h1>
      { displayJournals }
      <div className={styles.End}>
        <span className={styles.EndText}>You've reached the end.</span>
      </div>
    </div>
  );
};

export default JournalsList;
