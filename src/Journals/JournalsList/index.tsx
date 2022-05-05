import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App/ProtectedContainer';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { fetchJournals, selectAllJournals } from '../../reducers/journalsSlice';
import journalCalls from '../../services/journals';
import { JournalType } from '../../utils/types';
import JournalSingle from '../JournalSingle';
import styles from './JournalsList.module.scss';

interface Props {
  filter?: string | null;
  value?: string | number | null;
}

const JournalsList = ({ filter, value }: Props) => {
  const user = useContext(UserContext);
  const dispatch = useAppDispatch();
  const [journals, setJournals] = useState<JournalType[]>([]);
  const allJournals = useAppSelector(selectAllJournals);

  useEffect(() => {
    (async () => {
      dispatch(fetchJournals());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (user && allJournals.length) {
      (async () => {
        if (filter === 'user') {
          if (value) {
            const selectedJournals = allJournals.filter(
              journal => journal.user.toString() === value.toString()
            );
            setJournals(selectedJournals);
          }
        } else if (filter === 'saved' && value) {
          const selectedJournals = await journalCalls.getJournalLikesByUserId(value);
          setJournals(selectedJournals as JournalType[]);
        } else if (filter === 'nearby') {
          const selectedJournals = allJournals.filter(journal => journal.location === value);
          setJournals(selectedJournals);
        } else {
          setJournals(allJournals);
        }
      })();
    }
  }, [filter, user, allJournals, value]);

  const sortedJournals = [...journals].sort((a: JournalType, b: JournalType) => {
    return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
  });

  const displayJournals = sortedJournals.map((journal: JournalType) => (
    <JournalSingle key={journal.id} journal={journal} />
  ));

  if (!displayJournals.length) {
    return (
      <div className={styles.End}>
        <span className={styles.EndText}>There's a whole lotta nothing here.</span>
      </div>
    );
  }

  return (
    <div className={styles.Container}>
      {displayJournals}
      <div className={styles.End}>
        <span className={styles.EndText}>You've reached the end.</span>
      </div>
    </div>
  );
};

export default JournalsList;
