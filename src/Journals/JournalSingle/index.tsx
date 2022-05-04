import { useNavigate } from 'react-router-dom';
import { JournalType } from '../../services/journals';
import { calcReadTime } from '../../utils/utilfunc';
import styles from './JournalSingle.module.scss';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import TimeAgo from '../../assets/TimeAgo';

interface Props {
  journal: JournalType;
}

const JournalSingle = ({ journal }: Props) => {
  const navigate = useNavigate();

  const openJournal = () => {
    navigate(`/journals/view/${journal.id}`);
  };

  const cutPreview = (words: string) => {
    return words.length > 100 ? `${words.slice(0, 100)} ...` : words;
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Meta} onClick={() => navigate(`/user/${journal.user}`)}>
        <div>
          <span className={styles.Author}>{journal.owner}</span>
          <span className={styles.Divider}> - </span>
        </div>
        <div>
          <TimeAgo timestamp={new Date(journal.created_date).toISOString()} />
        </div>
      </div>
      <div className={styles.JournalLink} onClick={openJournal}>
        <div className={styles.Title}>{journal.title}</div>
        <div className={styles.Preview}>{cutPreview(journal.content)}</div>
      </div>
      <div className={styles.Actions}>
        <div>
          <span className={styles.ReadTime} onClick={openJournal}>
            {calcReadTime(journal.content.length)} min read
          </span>
          <span className={styles.Divider}> - </span>
        </div>
        <div>
          <FaRegBookmark className={styles.Like} size="15px" />
        </div>
      </div>
    </div>
  );
};

export default JournalSingle;
