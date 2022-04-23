import { ReactElement } from 'react';

type PropsType = {
  className: string,
  type: 'submit' | 'button' | 'reset',
  text: string,
  clickHandler?: () => void
}

const Button = ({ className, type, text, clickHandler }: PropsType): ReactElement => {
  return (
    <button className={className} type={type} onClick={clickHandler}>{text}</button>
  );
};

export default Button;