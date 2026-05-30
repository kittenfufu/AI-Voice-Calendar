import { useState, useEffect } from 'react';
import { Event } from '../types';

const LOCAL_STORAGE_KEY = 'voice-calendar-events';

const useEvents = () => {
  // 从 localStorage 加载事件，如果不存在则初始化为空数组
  const [events, setEvents] = useState<Event[]>(() => {
    try {
      const storedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedEvents ? JSON.parse(storedEvents) : [];
    } catch (error) {
      console.error("Failed to load events from localStorage:", error);
      return [];
    }
  });

  // 当 events 状态变化时，保存到 localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error("Failed to save events to localStorage:", error);
    }
  }, [events]);

  // 添加事件
  const addEvent = (event: Omit<Event, 'id' | 'completed'>) => {
    const newEvent: Event = {
      id: crypto.randomUUID(), // 使用 crypto.randomUUID() 生成唯一的ID
      completed: false,
      ...event,
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  // 更新事件
  const updateEvent = (updatedEvent: Event) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  // 删除事件
  const deleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  // 切换事件完成状态
  const toggleEventComplete = (id: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, completed: !event.completed } : event
      )
    );
  };

  // 清空所有事件
  const clearEvents = () => {
    setEvents([]);
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    toggleEventComplete,
    clearEvents,
  };
};

export default useEvents;
