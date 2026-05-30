# AI 编程助手提示词 (给 Cursor / TRAE 使用)

## 🚀 项目启动提示词（第一次用时发给 Cursor）

将以下内容完整粘贴给 Cursor 或 TRAE：

---

```
你是我的 AI 编程助手，我们正在开发一个叫 "Voice Calendar（语音日历）" 的 Web 应用。

## 项目背景
这是一个以语音交互为核心的日历管理工具，用户可以通过说话来添加、查询、修改、删除日程事件。UI 和数据结构参考 Apple 提醒事项（iOS Reminders App）的设计逻辑。

## Apple 提醒事项的核心设计逻辑
- 分组视图：今天 / 计划中 / 全部 / 已完成
- 事件属性：标题、截止日期、截止时间、优先级（高/中/低/无）、备注、提醒设置
- 左侧圆形勾选框，右侧事件标题 + 时间标签，优先级用颜色感叹号表示

## 技术栈
- React + Vite（前端框架）
- Web Speech API（语音识别，lang: 'zh-CN'）
- Claude API（claude-sonnet-4-20250514，意图解析）
- Web Speech Synthesis（语音播报）
- localStorage（本地数据持久化）
- Vercel（部署）

## 当前任务（PR #1）
请帮我搭建项目框架和基础 UI：

1. 用 Vite + React 初始化项目
2. 创建主界面，参考 Apple 提醒事项的布局：
   - 左侧边栏：今天、计划中、全部（带数量角标）
   - 右侧主区域：事件列表，按日期分组（今天、明天、本周、更晚）
   - 底部固定：大圆形麦克风按钮（核心交互入口）
3. 事件卡片组件：圆形勾选框 + 标题 + 时间标签 + 优先级图标
4. 创建 useEvents.js Hook，封装 localStorage 的 CRUD 操作
5. 添加几条示例事件用于展示效果

## 代码规范
- 每个组件单独一个文件
- 样式优先用 CSS Modules 或 Tailwind
- 所有注释用中文
- 组件命名用 PascalCase，文件名与组件名一致

## 完成后请
1. 告诉我运行项目的命令
2. 列出创建了哪些文件
3. 询问我是否准备提交到 GitHub，并给出 PR 描述草稿
```

---

## 📝 PR #2 提示词（语音功能）

```
继续开发 Voice Calendar。当前 PR #1（基础 UI）已合并。

现在开始 PR #2：实现语音识别和 AI 意图解析。

## 需要实现的功能

### 1. 语音识别（useSpeechRecognition.js）
使用 Web Speech API：
- 按住麦克风按钮开始录音，松开停止
- lang 设为 'zh-CN'
- 录音状态反馈（按钮变色、显示波形动画）
- 兼容性检查（不支持时显示提示）

### 2. AI 意图解析（src/services/claudeParser.js）
调用 Claude API（URL: https://api.anthropic.com/v1/messages）
API Key 从环境变量 VITE_CLAUDE_API_KEY 读取

System Prompt 如下（直接用这个）：
"""
你是一个日历助手。将用户的语音文字转为 JSON 格式的日历操作指令。
当前时间：{currentDateTime}

请返回如下 JSON 格式（只返回 JSON，不要其他文字）：
{
  "action": "add" | "query" | "update" | "delete" | "complete",
  "event": {
    "title": "事件标题",
    "date": "YYYY-MM-DD 格式，基于当前时间计算",
    "time": "HH:MM 格式，如无时间则为 null",
    "remindBeforeMinutes": 数字或 null,
    "priority": "high" | "medium" | "low" | "none"
  },
  "queryType": "today" | "week" | "all"（当 action 为 query 时），
  "matchTitle": "要修改/删除的事件标题关键词"（当 action 为 update/delete 时）,
  "reply": "给用户的回复，简洁自然，一句话"
}
"""

### 3. 语音播报（useSpeechSynthesis.js）
使用 Web Speech Synthesis，播报 Claude 返回的 reply 字段。

### 4. 完整流程串联
按住录音 → 语音识别文字 → 发给 Claude 解析 → 执行操作（增删改查）→ 语音播报确认

### 5. .env.example 文件
创建 .env.example：
VITE_CLAUDE_API_KEY=your_claude_api_key_here

## 注意
- 错误处理：API 失败时语音播报"抱歉，我没有理解，请再说一遍"
- loading 状态：识别中显示"正在理解..."
```

---

## 🔁 PR #3 提示词（功能迭代，给 TRAE）

```
继续 Voice Calendar 项目。PR #2 已合并，语音识别和 AI 解析已就绪。

现在做 PR #3（可拆成多个小 PR）：

### 功能 3a：浏览器提醒通知
- 请求通知权限（Notification API）
- 事件创建时，根据 remindBeforeMinutes 设置 setTimeout
- 到时间推送 Notification，标题为事件标题，body 为时间

### 功能 3b：语音修改和删除
- 解析 Claude 返回的 update / delete 指令
- delete：模糊匹配 matchTitle，找到后弹出确认对话框（或语音二次确认）
- update：修改匹配事件的时间/标题字段

### 功能 3c：列表 UI 细化
- 今天 / 计划中 / 全部 三个视图的切换逻辑
- 过期事件标红
- 点击事件卡片可展开查看备注和提醒设置

每个功能做完后分别提交 PR，不要合并到一个 PR 里。
```

---

## 🚢 PR #4 提示词（部署）

```
Voice Calendar 功能已开发完成，现在做部署准备（PR #4）。

1. 检查 package.json 的 build 命令是否正确（vite build）
2. 创建 vercel.json（如需要）
3. 完善 README.md：
   - 添加项目截图（先用占位文字 [截图]）
   - 填写在线演示链接（部署后填入）
   - 完善安装和使用说明
   - 列出所有语音命令示例

然后告诉我 Vercel 部署步骤（我没用过 Vercel）。
```
