# 🎙️ Voice Calendar — 语音日历

> 以语音交互为核心的智能日历管理工具，参考 Apple 提醒事项设计逻辑，让你用说话代替打字管理日程。

## ✨ 功能特性

- 🎤 **语音添加事件** — 说"明天下午三点开会"，自动识别时间和内容
- 🗑️ **语音删除/修改** — 说"取消明天开会"或"把会议改到四点"
- 📋 **语音查询** — "今天有什么安排？""本周还有哪些待办？"
- 🔔 **智能提醒** — 提前提醒，浏览器通知 + 语音播报
- 📱 **仿 Apple 提醒事项 UI** — 今天 / 计划中 / 全部 / 优先级分组

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/你的用户名/voice-calendar.git
cd voice-calendar

# 安装依赖
npm install

# 配置环境变量（填入你的 Claude API Key）
cp .env.example .env

# 启动开发服务器
npm run dev
```

打开 http://localhost:5173 即可使用。

## 🌐 在线体验

> 部署后填入链接

## 🏗️ 技术栈

| 模块 | 技术选型 | 说明 |
|------|---------|------|
| 前端框架 | React + Vite | 快速启动，易于部署 |
| 语音识别 | Web Speech API | 免费，无需 API Key |
| 意图解析 | Claude API | 将自然语言转为结构化数据 |
| 语音播报 | Web Speech Synthesis | 浏览器内置 |
| 数据存储 | localStorage | 本地持久化，无需后端 |
| 部署 | Vercel | 一键部署 |

## 📁 项目结构

```
voice-calendar/
├── src/
│   ├── components/
│   │   ├── VoiceButton.jsx      # 语音输入按钮
│   │   ├── CalendarList.jsx     # 日历事件列表
│   │   ├── EventCard.jsx        # 单个事件卡片
│   │   └── GroupedView.jsx      # 分组视图（今天/计划中/全部）
│   ├── hooks/
│   │   ├── useSpeechRecognition.js  # 语音识别 Hook
│   │   ├── useSpeechSynthesis.js    # 语音播报 Hook
│   │   └── useEvents.js             # 事件 CRUD 逻辑
│   ├── services/
│   │   └── claudeParser.js      # 调用 Claude API 解析意图
│   ├── store/
│   │   └── eventsStore.js       # 全局状态管理
│   └── App.jsx
├── docs/
│   ├── PRD.md                   # 产品需求文档
│   └── CONTRIBUTING.md          # PR 贡献规范
├── .env.example
└── README.md
```

## 🗂️ PR 历史

| PR | 功能 | 状态 |
|----|------|------|
| #1 | 项目框架 + 基础 UI | ✅ |
| #2 | 语音识别 + AI 意图解析 | ✅ |
| #3 | 提醒通知 + 语音删改 | ✅ |
| #4 | 部署 + README 完善 | ✅ |

## 📄 许可证

MIT
