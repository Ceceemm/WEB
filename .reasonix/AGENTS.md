# Reasonix instructions for C:\Users\TomatoLaser\Desktop\WEB

## Git 工作流

- 本项目所有代码、配置、文档或资源改动都必须留下 Git 记录。
- 开始新任务前，优先从当前稳定分支新建独立分支，例如 `reasonix/<task-name>` 或用户指定的分支名。
- 完成改动后，必须执行 `git status` 核对变更，并创建语义清晰的 `git commit`。
- 网络和凭据允许时，应将提交推送到对应远端分支。
- 如果验证、提交或推送失败，必须明确告诉用户失败原因、当前本地状态和建议下一步，不要声称改动已经完整落库。
- 回滚优先使用 `git revert <commit>`，保留可追踪的反向提交记录。
