# 📋 执行清单 — 一步一步做

按顺序勾选完成即可。

---

## 今天做的事（准备阶段）

### Step 1：配置 GitHub 仓库

- [ ] 登录 GitHub，进入你已建好的仓库
- [ ] 点 Settings → Branches，将默认分支改为 `main`
- [ ] 创建 `dev` 分支（后续开发在 dev 分支，稳定后合并到 main）
- [ ] 将 `README.md`、`PRD.md`、`CONTRIBUTING.md` 上传到仓库根目录（把本次生成的文件直接上传）

### Step 2：在本地配置开发环境

- [ ] 确认电脑已安装 Node.js（运行 `node -v`，建议 v18 以上）
- [ ] 确认已安装 Git（运行 `git --version`）
- [ ] 确认使用 Chrome 或 Edge 浏览器（Web Speech API 需要）

### Step 3：获取 Claude API Key

- [ ] 打开 https://console.anthropic.com
- [ ] 注册账号 → API Keys → Create Key
- [ ] 复制 Key，妥善保存（只显示一次）
- [ ] **不要把 API Key 提交到 GitHub！**（用 .env 文件管理）

---

## Day 1 上午：PR #1 基础框架

- [ ] 打开 Cursor，新建项目
- [ ] 把 `AI_PROMPTS.md` 里的 **PR #1 提示词** 粘贴给 Cursor
- [ ] 等 Cursor 生成项目结构
- [ ] 运行 `npm install && npm run dev`，确认页面能打开
- [ ] 截一张截图
- [ ] 按 CONTRIBUTING.md 的规范提交 PR #1

---

## Day 1 下午：PR #2 语音功能

- [ ] 创建 `.env` 文件，填入你的 Claude API Key：
  ```
  VITE_CLAUDE_API_KEY=sk-ant-xxxxxxxxx
  ```
- [ ] 把 **PR #2 提示词** 粘贴给 Cursor
- [ ] 测试语音识别：对着麦克风说"明天上午十点开会"
- [ ] 确认事件出现在列表中
- [ ] 确认语音播报有反馈
- [ ] 提交 PR #2

---

## Day 2 上午：PR #3 功能迭代（换 TRAE）

- [ ] 打开 TRAE，导入项目
- [ ] 把 **PR #3 提示词** 分批粘贴给 TRAE（按 3a / 3b / 3c 分三次）
- [ ] 每个小功能做完单独提交一个 PR
- [ ] 测试提醒通知是否弹出
- [ ] 测试"删除明天的会议"是否工作

---

## Day 2 下午：PR #4 部署

- [ ] 注册 Vercel 账号（https://vercel.com，用 GitHub 登录）
- [ ] 点 "New Project" → 选择你的 GitHub 仓库
- [ ] 在 Environment Variables 里添加 `VITE_CLAUDE_API_KEY`（填你的 Key）
- [ ] 点 Deploy，等待 2-3 分钟
- [ ] 打开生成的链接，测试线上版本
- [ ] 把链接填入 README.md
- [ ] 提交 PR #4

---

## 关于 Apple 提醒事项 — 如何告诉 AI

你问 AI 能不能直接搜索 Apple 提醒事项的实现逻辑。答案是：

**AI 无法访问闭源 App 的代码，但可以参考它的 UI 设计逻辑。**

推荐这样告诉 Cursor / TRAE：

```
请参考 Apple iOS 提醒事项（Reminders App）的 UI 设计：
- 顶部有"今天""计划中""全部""已完成"四个分组卡片，带数量角标
- 主列表每行左侧是圆形勾选框，右侧是标题，下方是时间和标签
- 优先级用感叹号图标表示（红=高，橙=中，蓝=低）
- 整体风格：白色背景，圆角卡片，苹果系统字体，极简干净
- 可以搜索"Apple Reminders UI Figma"或参考截图来实现类似效果
```

---

## 工具使用建议

| 任务类型 | 推荐工具 | 原因 |
|---------|---------|------|
| 项目初始化、架构设计 | Cursor | 基础版也有足够上下文理解能力 |
| API 集成（Claude、语音） | Cursor | 复杂逻辑需要强模型理解 |
| UI 细节迭代（颜色、布局） | TRAE | 简单修改，TRAE 基础版够用 |
| Bug 修复、小功能 | TRAE 或 CodeX | 任选，粒度小 |
| 写 README、PR 描述 | 直接问 Claude.ai | 文档类任务 Claude 很擅长 |
