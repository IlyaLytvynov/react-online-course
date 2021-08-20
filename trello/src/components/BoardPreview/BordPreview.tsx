import React, { useRef, useState } from 'react';
import styles from './BoardPreview.module.scss';

interface Props {
  name?: string;
  id?: string;
  children?: any;
  shouldBeEditing?: boolean;
  onSubmitEditing: (newName: string, id?: string) => void;
}

export const BoardPreview = ({
  name,
  onSubmitEditing,
  id,
  children,
  shouldBeEditing = false,
}: Props) => {
  console.log(shouldBeEditing);

  const [editing, setEditing] = useState(shouldBeEditing);

  const [newName, setNewName] = useState(name);
  const inputEl = useRef<HTMLInputElement>(null);

  const submitEditing = () => {
    onSubmitEditing(newName as string, id);
    setEditing(false);
  };

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputEl.current!.focus();
    }, 0);
  };

  if (shouldBeEditing !== editing) {
    enableEditing();
  }

  return (
    <div className={styles.container} onDoubleClick={() => enableEditing()}>
      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitEditing();
          }}
        >
          <input
            ref={inputEl}
            value={newName}
            onChange={({ target: { value } }) => setNewName(value)}
          />
        </form>
      ) : children ? (
        children
      ) : (
        newName
      )}
    </div>
  );
};
