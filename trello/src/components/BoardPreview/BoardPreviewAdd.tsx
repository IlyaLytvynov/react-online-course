import React, { useRef, useState } from 'react';
import { BoardPreview } from '.';
import styles from './BoardPreview.module.scss';

interface Props {
  onSubmitEditing: (newName: string) => void;
}

export const BoardPreviewAdd = ({ onSubmitEditing }: Props) => {
  const [editing, setEditing] = useState(false);

  const submitEditing = (newName: string) => {
    onSubmitEditing(newName);
    setEditing(false);
  };

  const enableEditing = () => {
    setEditing(true);
  };

  return (
    <BoardPreview
      name={''}
      id={Date.now().toString()}
      shouldBeEditing={editing}
      onSubmitEditing={submitEditing}
    >
      <button onClick={enableEditing}>+</button>
    </BoardPreview>
  );
};
