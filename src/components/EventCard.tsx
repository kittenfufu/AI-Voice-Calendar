import React from 'react';
import styles from './EventCard.module.css';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onToggleComplete: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onToggleComplete }) => {
  const handleCheckboxClick = () => {
    onToggleComplete(event.id);
  };

  // 根据优先级设置感叹号的颜色
  const getPriorityColor = (priority: Event['priority']) => {
    switch (priority) {
      case '高':
        return '#ff3b30'; // 红色
      case '中':
        return '#ff9500'; // 橙色
      case '低':
        return '#ffcc00'; // 黄色
      case '无':
      default:
        return 'transparent'; // 无优先级不显示颜色
    }
  };

  return (
    <div className={styles.card}>
      {/* 圆形勾选框 */}
      <div
        className={`${styles.checkbox} ${event.completed ? styles.completed : ''}`}
        onClick={handleCheckboxClick}
      >
        {event.completed && <span className={styles.checkmark}>✔</span>}
      </div>

      {/* 事件内容 */}
      <div className={styles.content}>
        <span className={`${styles.title} ${event.completed ? styles.completedText : ''}`}>
          {event.title}
        </span>
        {event.dueDate && (
          <span className={styles.timeLabel}>
            {event.dueDate} {event.dueTime}
          </span>
        )}
      </div>

      {/* 优先级图标 */}
      {event.priority !== '无' && (
        <span
          className={styles.priorityIcon}
          style={{ color: getPriorityColor(event.priority) }}
        >
          {'!'}
        </span>
      )}
    </div>
  );
};

export default EventCard;
