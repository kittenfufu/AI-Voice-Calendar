export type FilterType = 'today' | 'scheduled' | 'all';

// 定义事件类型接口，与 EventCard.tsx 中的保持一致
export interface Event {
  id: string;
  title: string;
  dueDate?: string; // 截止日期
  dueTime?: string; // 截止时间
  priority: '高' | '中' | '低' | '无';
  completed: boolean;
}
