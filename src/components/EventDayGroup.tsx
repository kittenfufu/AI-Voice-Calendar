import React from 'react';
import styles from './EventDayGroup.module.css';
import EventCard from './EventCard';
import AddTaskPlaceholder from './AddTaskPlaceholder';
import { Event } from '../types';

interface EventDayGroupProps {
  dateTitle: string; // e.g., "6月2日 周二"
  events: Event[];
  showAddTaskPlaceholder: boolean;
  addTaskDate?: string; // 用于传递给添加任务函数的日期
  onToggleComplete: (id: string) => void;
  onAddTask: (date?: string) => void;
}

const EventDayGroup: React.FC<EventDayGroupProps> = ({
  dateTitle,
  events,
  showAddTaskPlaceholder,
  addTaskDate,
  onToggleComplete,
  onAddTask,
}) => {
  return (
    <div className={styles.dayGroup}>
      <h3 className={styles.dayGroupTitle}>{dateTitle}</h3>
      {events.map((event) => (
        <EventCard key={event.id} event={event} onToggleComplete={onToggleComplete} />
      ))}
      {showAddTaskPlaceholder && (
        <AddTaskPlaceholder onClick={() => onAddTask(addTaskDate)} />
      )}
    </div>
  );
};

export default EventDayGroup;
