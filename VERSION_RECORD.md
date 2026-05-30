# 项目版本记录

## [v0.0.2 功能增强/缺陷修复] - 2026-05-31 00:00:00
### 变更类型: 功能增强 (feature-6), 缺陷修复 (bug-fix)
- **功能增强：任务添加模态框实现**
  - 为任务添加模态框创建了样式文件 [AddTaskModal.module.css](file:///c:/Users/31063/Desktop/AI-Voice-Calendar/AI-Voice-Calendar/src/components/AddTaskModal.module.css)。
  - 在 [App.tsx](file:///c:/Users/31063/Desktop/AI-Voice-Calendar/AI-Voice-Calendar/src/App.tsx) 中启用了 `AddTaskModal` 组件的渲染，实现了任务添加的交互流程。
  - 移除了 [App.tsx](file:///c:/Users/31063/Desktop/AI-Voice-Calendar/AI-Voice-Calendar/src/App.tsx) 中 `handleAddTask` 函数内的 `alert` 调试信息，现在模态框将正常显示。
- **缺陷修复：事件勾选异常**
  - 在 `useEvents.ts` 中使用 `crypto.randomUUID()` 确保事件 ID 的全局唯一性，解决了勾选单个事件时所有事件都被标记为已勾选的问题。
- **缺陷修复：左侧列表切换功能修复**
  - 在 `MainContentDisplay.tsx` 中新增 `onActiveFilterChange` prop，用于通知父组件当前活跃的过滤器。
  - 在 `MainContentDisplay.tsx` 中实现滚动事件监听和逻辑，以根据滚动位置判断当前最可见的日期分组。
  - 在 `App.tsx` 中将 `setActiveFilter` 作为 `onActiveFilterChange` prop 传递给 `MainContentDisplay`，实现左侧导航栏背景与右侧内容滚动的同步。
- **功能增强：计划模块基础结构**
  - 创建了 [MainContentDisplay.tsx](file:///c:/Users/31063/Desktop/AI-Voice-Calendar/AI-Voice-Calendar/src/components/MainContentDisplay.tsx) 组件，负责主内容区域的复杂日期分组和渲染。
  - 创建了 [MainContentDisplay.module.css](file:///c:/Users/31063/Desktop/AI-Voice-Calendar/AI-Voice-Calendar/src/components/MainContentDisplay.module.css) 为其提供样式。
  - 创建了 [EventDayGroup.tsx](file:///c:/Users/31063/Desktop/AI-Voice-Calendar/AI-Voice-Calendar/src/components/EventDayGroup.tsx) 组件，用于分组和显示单个日期的事件，并包含“添加任务”占位符。
  - 创建了 [EventDayGroup.module.css](file:///c:/Users/31063/Desktop/AI-Voice-Calendar/AI-Voice-Calendar/src/components/EventDayGroup.module.css) 为其提供样式。
  - 创建了 [AddTaskPlaceholder.tsx](file:///c:/Users/31063/Desktop/AI-Voice-Calendar/AI-Voice-Calendar/src/components/AddTaskPlaceholder.tsx) 和 [AddTaskPlaceholder.module.css](file:///c:/Users/31063/Desktop/AI-Voice-Calendar/AI-Voice-Calendar/src/components/AddTaskPlaceholder.module.css)，用于任务添加入口的占位符。
  - 完善了 [dateUtils.ts](file:///c:/Users/31063/Desktop/AI-Voice-Calendar/AI-Voice-Calendar/src/utils/dateUtils.ts) 中的日期处理辅助函数，支持计划模块的日期计算和格式化。
  - 在 [App.tsx](file:///c:/Users/31063/Desktop/AI-Voice-Calendar/AI-Voice-Calendar/src/App.tsx) 中集成了 `MainContentDisplay` 组件，并移除了旧的事件渲染逻辑。
- 影响文件：
  - `src/App.tsx`
  - `src/components/AddTaskModal.tsx`
  - `src/components/AddTaskModal.module.css`
  - `src/components/MainContentDisplay.tsx`
  - `src/components/MainContentDisplay.module.css`
  - `src/components/EventDayGroup.tsx`
  - `src/components/EventDayGroup.module.css`
  - `src/components/AddTaskPlaceholder.tsx`
  - `src/components/AddTaskPlaceholder.module.css`
  - `src/hooks/useEvents.ts`
  - `src/utils/dateUtils.ts`

## [v0.0.1 初始版本] - 2026-05-30 00:00:00
### 新功能
- 初始化项目，创建 `VERSION_RECORD.md` 文件。
- 设定版本记录规范。
- 影响文件：`VERSION_RECORD.md`
