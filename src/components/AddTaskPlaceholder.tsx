import React from 'react';
import styles from './AddTaskPlaceholder.module.css';

interface AddTaskPlaceholderProps {
  onClick: () => void;
}

const AddTaskPlaceholder: React.FC<AddTaskPlaceholderProps> = ({ onClick }) => {
  return (
    <div className={styles.placeholder} onClick={onClick}>
      <span className={styles.plusIcon}>+</span>
      <span className={styles.text}>添加新任务</span>
    </div>
  );
};

export default AddTaskPlaceholder;
