import { useNavigate } from 'react-router-dom';
import { JournalType } from '../../services/journals';
import styles from './JournalSingle.module.scss';

interface Props {
  journal: JournalType;
}

const JournalSingle = ({ journal }: Props) => {
  const navigate = useNavigate();
  const openJournal = () => {
    navigate(`/journals/view/${journal.id}`)
  }

  return (
    <div className={styles.Container} onClick={openJournal}>
      <h1>{journal.title}</h1>
      <p>{journal.content}</p>
      <div>{journal.owner}</div>
    </div>
  );
};

export default JournalSingle;
