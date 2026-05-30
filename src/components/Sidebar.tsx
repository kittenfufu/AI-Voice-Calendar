import React from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  todayCount: number;
  scheduledCount: number;
  allCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeFilter,
  onFilterChange,
  todayCount,
  scheduledCount,
  allCount,
}) => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li
            className={activeFilter === 'today' ? styles.active : ''}
            onClick={() => onFilterChange('today')}
          >
            今天 ({todayCount})
          </li>
          <li
            className={activeFilter === 'scheduled' ? styles.active : ''}
            onClick={() => onFilterChange('scheduled')}
          >
            计划中 ({scheduledCount})
          </li>
          <li
            className={activeFilter === 'all' ? styles.active : ''}
            onClick={() => onFilterChange('all')}
          >
            全部 ({allCount})
          </li>
          {/* 更多列表可以在这里添加 */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
