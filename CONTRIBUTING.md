# 贡献规范 (CONTRIBUTING)

## PR 提交规范

### 基本原则

1. **每个 PR 只做一件事**：一个 PR 只实现或修改单一功能，功能越小越好
2. **基于 PR 添加新功能**：所有新功能必须通过 PR 提交到 main 分支，不直接 push
3. **main 分支始终可运行**：合并后主分支必须能正常启动和演示

---

### PR 标题格式

```
feat: 添加语音识别功能
fix: 修复时间解析错误
refactor: 重构事件存储逻辑
docs: 更新 README 部署说明
```

前缀说明：
- `feat` — 新功能
- `fix` — Bug 修复
- `refactor` — 重构（不改变功能）
- `docs` — 文档更新
- `style` — UI 样式调整

---

### PR 描述模板（复制到 PR 描述框）

```markdown
## 功能描述

说明本 PR 实现了什么功能，以及用户如何使用它。

**示例：**
新增语音录入入口，用户点击麦克风按钮后开始录音，
松开后自动将语音发送给 Claude API 解析为日历事件。

---

## 实现思路

简要说明技术选型或核心实现逻辑（3-5 行即可）。

**示例：**
- 使用 Web Speech API 的 SpeechRecognition 接口录音
- 录音结束后将文字传入 `claudeParser.js` 调用 Claude API
- Claude 返回结构化 JSON，写入 localStorage

---

## 测试方式

说明如何验证该功能正常运行。

**示例：**
1. 运行 `npm run dev`，打开 http://localhost:5173
2. 点击麦克风按钮，说"明天上午十点开会"
3. 松开后查看列表是否出现"明天 10:00 开会"事件
4. 控制台无报错，语音播报"已添加..."

---

## 截图 / 录屏

（可选，建议贴一张功能截图）
```

---

## 分支命名规范

```
feat/voice-recognition     # 新功能
fix/time-parse-bug         # Bug 修复
refactor/event-store       # 重构
```

---

## 本地开发流程

```bash
# 1. 从 main 拉最新代码，创建功能分支
git checkout main && git pull
git checkout -b feat/你的功能名

# 2. 开发 + 自测

# 3. 提交代码
git add .
git commit -m "feat: 实现语音识别基础功能"

# 4. 推送分支
git push origin feat/你的功能名

# 5. 在 GitHub 上创建 PR，填写上方模板
```

---

## 给 AI 编程工具的提交提示词

将以下内容保存为 `.cursor/commit-prompt.md` 或直接粘贴给 Cursor / TRAE：

```
当你完成一个功能后，请按以下流程帮我提交：

1. 先问我：「本次改动是否准备提交？功能描述是：[自动生成的一句话总结]」
2. 如果我确认，生成 git commit 命令，格式为：
   git add .
   git commit -m "feat/fix/docs: [一句话说明]"
   git push origin [当前分支名]
3. 提示我去 GitHub 创建 PR，并给出 PR 描述草稿，包含：
   - 功能描述（1-2行）
   - 实现思路（要点）
   - 测试方式（步骤）

每次 PR 只包含一个功能，不要把多个功能合并到一个 PR。
```
