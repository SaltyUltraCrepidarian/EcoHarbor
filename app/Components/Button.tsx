import React from 'react';
import './Button.css';

type Props = {
  action: Function;
  text: string;
  className: string;
};

export default function Button({ action, text, className }: Props) {
  return (
    <button className= {className} onClick={() => action()}>
      {text}
    </button>
  );
}
