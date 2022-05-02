import { JournalType } from "../../services/journals";

interface Props {
  journal: JournalType
}

const JournalSingle = ({ journal }: Props) => {
  return (
    <div>
      <h1>{journal.title}</h1>
      <p>{journal.content}</p>
      <div>{journal.user}</div>
    </div>
  )
}

export default JournalSingle;