import { useEffect, useState } from 'react';
import styles from './App.module.css';
import useEvents from './hooks/useEvents';
import Sidebar from './components/Sidebar';
import MainContentDisplay from './components/MainContentDisplay'; // 引入 MainContentDisplay
import { FilterType } from './types';
import { getTodayDate, getFutureDates } from './utils/dateUtils'; // 导入日期工具函数
import AddTaskModal from './components/AddTaskModal'; // 引入 AddTaskModal

function App() {
  const { events, addEvent, toggleEventComplete } = useEvents();
  const [activeFilter, setActiveFilter] = useState<FilterType>('today');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedDateForAddTask, setSelectedDateForAddTask] = useState<string | undefined>(undefined);

  const today = getTodayDate();

  // 添加示例事件
  useEffect(() => {
    const storedEvents = localStorage.getItem('voice-calendar-events');
    if (!storedEvents || JSON.parse(storedEvents).length === 0) {
      addEvent({
        title: '和朋友共进午餐',
        dueDate: today,
        dueTime: '12:30',
        priority: '高',
      });
      addEvent({
        title: '完成AI-Voice-Calendar项目',
        dueDate: today,
        dueTime: '17:00',
        priority: '高',
      });
      addEvent({
        title: '购买牛奶',
        dueDate: getFutureDates(1)[0], // 明天
        priority: '中',
      });
      addEvent({
        title: '健身房锻炼',
        dueDate: getFutureDates(2)[0], // 后天
        dueTime: '19:00',
        priority: '低',
      });
      addEvent({
        title: '阅读《三体》',
        priority: '无',
      });
      addEvent({
        title: '过期任务',
        dueDate: '2026-05-29', // 过去日期
        priority: '低',
        completed: false,
      });
      addEvent({
        title: '本月晚些时候的任务',
        dueDate: '2026-06-20', // 假设是今天之后，本月晚些时候
        priority: '中',
        completed: false,
      });
    }
  }, []);

  // 计算不同类别的事件数量
  const todayEventsCount = events.filter(event => event.dueDate === today && !event.completed).length;
  const scheduledEventsCount = events.filter(event => event.dueDate && event.dueDate !== today && !event.completed).length;
  const allEventsCount = events.filter(event => !event.completed).length;

  // 处理添加任务的函数
  const handleAddTask = (date?: string) => {
    setSelectedDateForAddTask(date);
    setIsAddTaskModalOpen(true);
    // 实际的模态框显示逻辑已通过 AddTaskModal 组件实现
  };

  return (
    <div className={styles.container}>
      {/* 左侧边栏 */}
      <Sidebar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        todayCount={todayEventsCount}
        scheduledCount={scheduledEventsCount}
        allCount={allEventsCount}
      />

      {/* 右侧主区域 */}
      <main className={styles.mainContent}>
        <MainContentDisplay
          events={events}
          activeFilter={activeFilter}
          onToggleComplete={toggleEventComplete}
          onAddTask={handleAddTask}
          onActiveFilterChange={setActiveFilter}
        />
      </main>

      {/* 底部固定麦克风按钮 */}
      <footer className={styles.footer}>
        <button className={styles.microphoneButton} onClick={() => handleAddTask()}>
          <span role="img" aria-label="microphone">🎤</span>
        </button>
      </footer>

      {isAddTaskModalOpen && (
        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          onClose={() => setIsAddTaskModalOpen(false)}
          onSave={(newTask) => {
            addEvent(newTask);
            setIsAddTaskModalOpen(false);
          }}
          initialDate={selectedDateForAddTask}
        />
      )}
    </div>
  );
}

export default App;
