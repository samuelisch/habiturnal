import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';
import styles from './TimeAgo.module.scss';

interface Props {
  timestamp: string;
}

const TimeAgo = ({ timestamp }: Props) => {
  const date = parseISO(timestamp)
  const timePeriod = formatDistanceToNow(date)
  const timeAgo = `${timePeriod} ago`

  return (
    <span>
      <i className={styles.TimeAgo}>{timeAgo}</i>
    </span>
  )
}

export default TimeAgo