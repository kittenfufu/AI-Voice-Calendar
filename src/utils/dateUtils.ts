// src/utils/dateUtils.ts

/**
 * 格式化日期为 YYYY-MM-DD 格式
 * @param date 日期对象
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 获取今天的日期 (YYYY-MM-DD 格式)
 * @returns 今天的日期字符串
 */
export const getTodayDate = (): string => {
  return formatDate(new Date());
};

/**
 * 判断给定日期是否是今天
 * @param dateString 日期字符串 (YYYY-MM-DD)
 * @returns 是否是今天
 */
export const isToday = (dateString: string): boolean => {
  return dateString === getTodayDate();
};

/**
 * 判断给定日期是否是过去日期 (早于今天)
 * @param dateString 日期字符串 (YYYY-MM-DD)
 * @returns 是否是过去日期
 */
export const isPastDate = (dateString: string): boolean => {
  return new Date(dateString) < new Date(getTodayDate());
};

/**
 * 判断给定日期是否是本周 (从今天开始的7天内)
 * @param dateString 日期字符串 (YYYY-MM-DD)
 * @returns 是否是本周
 */
export const isThisWeek = (dateString: string): boolean => {
  const today = new Date(getTodayDate());
  const targetDate = new Date(dateString);
  const diffTime = Math.abs(targetDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // 判断是否在今天及未来6天内
  return diffDays >= 0 && diffDays < 7;
};

/**
 * 获取从今天开始的未来指定天数的日期列表
 * @param days 天数
 * @returns 日期字符串数组 (YYYY-MM-DD)
 */
export const getFutureDates = (days: number): string[] => {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(formatDate(date));
  }
  return dates;
};

/**
 * 获取给定日期的年份和月份 (YYYY-MM 格式)
 * @param date 日期对象
 * @returns 年份和月份字符串
 */
export const getYearMonth = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${year}-${month}`;
};

/**
 * 获取指定月份的第一天和最后一天
 * @param yearMonth YYYY-MM 格式的月份字符串
 * @returns 包含开始日期和结束日期的对象
 */
export const getMonthRange = (yearMonth: string) => {
  const [year, month] = yearMonth.split('-').map(Number);
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0); // 月份的第0天是上一个月的最后一天
  return { startDate: formatDate(startDate), endDate: formatDate(endDate) };
};

/**
 * 获取给定日期是星期几的中文表示
 * @param dateString 日期字符串 (YYYY-MM-DD)
 * @returns 星期几的中文表示
 */
export const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return days[date.getDay()];
};
