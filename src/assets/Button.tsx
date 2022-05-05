import { FormEvent, ReactElement } from 'react';

type PropsType = {
  className: string,
  type: 'submit' | 'button' | 'reset',
  text: string,
  clickHandler?: (e: FormEvent) => void,
  disabled?: boolean
}

const Button = ({ className, type, text, clickHandler, disabled }: PropsType): ReactElement => {
  return (
    <button className={className} type={type} onClick={clickHandler} disabled={disabled}>{text}</button>
  );
};

export default Button;