import React from 'react';
import styles from './MainContentDisplay.module.css';
import { Event, FilterType } from '../types';
import EventCard from './EventCard';
import AddTaskPlaceholder from './AddTaskPlaceholder';
import EventDayGroup from './EventDayGroup'; // 引入 EventDayGroup

import {
  getTodayDate,
  getFutureDates,
  isPastDate,
  getDayOfWeek,
  formatDate,
  getYearMonth,
  getMonthRange
} from '../utils/dateUtils';

interface MainContentDisplayProps {
  events: Event[];
  activeFilter: FilterType;
  onToggleComplete: (id: string) => void;
  onAddTask: (date?: string) => void; // 用于触发添加任务的函数
}

const MainContentDisplay: React.FC<MainContentDisplayProps> = ({ events, activeFilter, onToggleComplete, onAddTask }) => {
  const today = getTodayDate();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0-11

  // 辅助函数：根据日期过滤事件
  const filterEventsByDate = (targetDate: string, eventList: Event[] = events) => {
    return eventList.filter(event => event.dueDate === targetDate);
  };

  // 根据 activeFilter 渲染内容
  const renderContent = () => {
    // 如果是 'today' 视图，则只显示今天的任务
    if (activeFilter === 'today') {
      const todayEvents = filterEventsByDate(today);
      return (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>今天</h2>
          {todayEvents.length > 0 ? (
            todayEvents.map(event => (
              <EventCard key={event.id} event={event} onToggleComplete={onToggleComplete} />
            ))
          ) : (
            <p>今天没有任务。</p>
          )}
          <AddTaskPlaceholder onClick={() => onAddTask(today)} />
        </div>
      );
    }

    // 当 activeFilter 是 'scheduled' 或 'all' 时，进行复杂分组
    const displaySections: React.ReactNode[] = [];

    // 1. 过去未完成任务
    const pastUncompletedEvents = events.filter(event => isPastDate(event.dueDate || '') && !event.completed);
    if (pastUncompletedEvents.length > 0) {
      displaySections.push(
        <div key="past-uncompleted" className={styles.section}>
          <h2 className={styles.sectionTitle}>过去未完成</h2>
          {pastUncompletedEvents.map(event => (
            <EventCard key={event.id} event={event} onToggleComplete={onToggleComplete} />
          ))}
        </div>
      );
    }

    // 2. 今天 (在 'scheduled' 和 'all' 视图下，也需要单独列出)
    const todayEvents = filterEventsByDate(today);
    displaySections.push(
      <div key="today-section" className={styles.section}>
        <EventDayGroup
          dateTitle="今天"
          events={todayEvents}
          showAddTaskPlaceholder={true}
          addTaskDate={today}
          onToggleComplete={onToggleComplete}
          onAddTask={onAddTask}
        />
      </div>
    );

    // 3. 当前周（从明天开始的6天）
    const next6Days = getFutureDates(7).slice(1); // 从明天开始
    next6Days.forEach(date => {
      const dailyEvents = filterEventsByDate(date);
      const dateObj = new Date(date);
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      const dayOfWeek = getDayOfWeek(date);
      const formattedDateTitle = `${month}月${day}日 ${dayOfWeek}`;

      displaySections.push(
        <div key={date} className={styles.section}>
          <EventDayGroup
            dateTitle={formattedDateTitle}
            events={dailyEvents}
            showAddTaskPlaceholder={true}
            addTaskDate={date}
            onToggleComplete={onToggleComplete}
            onAddTask={onAddTask}
          />
        </div>
      );
    });

    // 4. 本月其他时间 (超出7天范围，但在本月内)
    const currentMonthOtherEvents = events.filter(event => {
      if (!event.dueDate) return false;
      const eventYearMonth = getYearMonth(new Date(event.dueDate));
      const isWithinCurrentMonth = eventYearMonth === getYearMonth(new Date());
      const isBeyondNext7Days = !getFutureDates(7).includes(event.dueDate);
      const isNotPast = !isPastDate(event.dueDate);
      return isWithinCurrentMonth && isBeyondNext7Days && isNotPast;
    });

    // 对本月其他事件进行按日期分组
    const currentMonthOtherGrouped: { [date: string]: Event[] } = {};
    currentMonthOtherEvents.forEach(event => {
      if (event.dueDate) {
        if (!currentMonthOtherGrouped[event.dueDate]) {
          currentMonthOtherGrouped[event.dueDate] = [];
        }
        currentMonthOtherGrouped[event.dueDate].push(event);
      }
    });

    if (Object.keys(currentMonthOtherGrouped).length > 0) {
      displaySections.push(
        <div key="current-month-other" className={styles.section}>
          <h2 className={styles.sectionTitle}>本月其他时间</h2>
          {Object.entries(currentMonthOtherGrouped).map(([date, dailyEvents]) => {
            const dateObj = new Date(date);
            const month = dateObj.getMonth() + 1;
            const day = dateObj.getDate();
            const dayOfWeek = getDayOfWeek(date);
            const formattedDateTitle = `${month}月${day}日 ${dayOfWeek}`;
            return (
              <EventDayGroup
                key={date}
                dateTitle={formattedDateTitle}
                events={dailyEvents}
                showAddTaskPlaceholder={true} // 即使有任务，也显示添加占位符
                addTaskDate={date}
                onToggleComplete={onToggleComplete}
                onAddTask={onAddTask}
              />
            );
          })}
        </div>
      );
    }

    // 5. 未来月份 (从下个月开始的未来11个月)
    for (let i = 1; i <= 11; i++) {
      const futureMonthDate = new Date(currentYear, currentMonth + i, 1);
      const futureYearMonth = getYearMonth(futureMonthDate);
      const futureMonthEvents = events.filter(event => event.dueDate && getYearMonth(new Date(event.dueDate)) === futureYearMonth);

      // 对未来月份事件进行按日期分组
      const futureMonthGrouped: { [date: string]: Event[] } = {};
      futureMonthEvents.forEach(event => {
        if (event.dueDate) {
          if (!futureMonthGrouped[event.dueDate]) {
            futureMonthGrouped[event.dueDate] = [];
          }
          futureMonthGrouped[event.dueDate].push(event);
        }
      });

      if (Object.keys(futureMonthGrouped).length > 0) {
        displaySections.push(
          <div key={futureYearMonth} className={styles.section}>
            <h2 className={styles.sectionTitle}>{futureMonthDate.getFullYear()}年{futureMonthDate.getMonth() + 1}月</h2>
            {Object.entries(futureMonthGrouped).map(([date, dailyEvents]) => {
              const dateObj = new Date(date);
              const month = dateObj.getMonth() + 1;
              const day = dateObj.getDate();
              const dayOfWeek = getDayOfWeek(date);
              const formattedDateTitle = `${month}月${day}日 ${dayOfWeek}`;
              return (
                <EventDayGroup
                  key={date}
                  dateTitle={formattedDateTitle}
                  events={dailyEvents}
                  showAddTaskPlaceholder={true} // 即使有任务，也显示添加占位符
                  addTaskDate={date}
                  onToggleComplete={onToggleComplete}
                  onAddTask={onAddTask}
                />
              );
            })}
          </div>
        );
      } else {
        // 如果月份没有任务，但用户需要添加任务，也应该显示一个占位符
        // 这里简化处理，只在月份级别显示一个通用的添加任务入口
        displaySections.push(
            <div key={futureYearMonth} className={styles.section}>
                <h2 className={styles.sectionTitle}>{futureMonthDate.getFullYear()}年{futureMonthDate.getMonth() + 1}月</h2>
                <AddTaskPlaceholder onClick={() => onAddTask(formatDate(futureMonthDate))} />
            </div>
        );
      }
    }

    // 6. 无截止日期任务 (如果存在)
    const noDueDateEvents = events.filter(event => !event.dueDate);
    if (noDueDateEvents.length > 0) {
      displaySections.push(
        <div key="no-due-date" className={styles.section}>
          <h2 className={styles.sectionTitle}>无截止日期</h2>
          {noDueDateEvents.map(event => (
            <EventCard key={event.id} event={event} onToggleComplete={onToggleComplete} />
          ))}
          <AddTaskPlaceholder onClick={() => onAddTask(undefined)} />
        </div>
      );
    }

    return <>{displaySections}</>;
  };

  return (
    <div className={styles.mainContentDisplay}>
      {renderContent()}
    </div>
  );
};

export default MainContentDisplay;
