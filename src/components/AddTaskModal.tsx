import React, { useState, useEffect } from 'react';
import styles from './AddTaskModal.module.css';
import { Event } from '../types';
import { getTodayDate } from '../utils/dateUtils';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newEvent: Omit<Event, 'id' | 'completed'>) => void;
  initialDate?: string; // 初始日期，如果从特定日期添加任务
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onSave, initialDate }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState<string | undefined>(initialDate || getTodayDate());
  const [dueTime, setDueTime] = useState<string | undefined>(undefined);
  const [priority, setPriority] = useState<Event['priority']>('无');

  useEffect(() => {
    if (initialDate) {
      setDueDate(initialDate);
    } else {
      setDueDate(getTodayDate());
    }
  }, [initialDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('任务名称不能为空！');
      return;
    }

    onSave({
      title,
      dueDate: dueDate === getTodayDate() ? undefined : dueDate, // 如果是今天，则不设置 dueDate
      dueTime,
      priority,
    });
    // 重置表单
    setTitle('');
    setDueDate(initialDate || getTodayDate());
    setDueTime(undefined);
    setPriority('无');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>添加新任务</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">任务名称:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dueDate">截止日期:</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate || ''}
              onChange={(e) => setDueDate(e.target.value || undefined)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dueTime">截止时间:</label>
            <input
              type="time"
              id="dueTime"
              value={dueTime || ''}
              onChange={(e) => setDueTime(e.target.value || undefined)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="priority">优先级:</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Event['priority'])}
            >
              <option value="无">无</option>
              <option value="低">低</option>
              <option value="中">中</option>
              <option value="高">高</option>
            </select>
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              取消
            </button>
            <button type="submit" className={styles.saveButton}>
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
