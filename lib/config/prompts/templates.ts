/**
 * 固定模板（不可编辑）
 *
 * 这些模板包含占位符，在运行时动态替换
 */

/**
 * 执行阶段前缀模板
 *
 * 占位符：
 * - {{PROJECT_PATH}} - 项目路径
 */
export const EXECUTION_PREFIX_TEMPLATE = `## 重要：当前工作环境

**你当前正在此项目目录中工作：**
\`{{PROJECT_PATH}}\`

**严格要求：**
- 所有文件操作必须在此目录内进行
- 优先使用相对路径（如 \`app/page.tsx\`、\`lib/utils.ts\`）
- 如需使用绝对路径，必须是此目录内的路径
- 严禁访问父级目录（\`../\`）或其他项目目录
- 严禁使用指向项目外的绝对路径
`;

/**
 * 安全警告模板（bypassPermissions 模式）
 */
export const SECURITY_WARNING_TEMPLATE = `
⚠️ 【路径安全警告】
- 当前环境路径检查已禁用
- 你的所有文件操作都会被审计日志记录
- 严格遵守以下规则，否则操作会被标记为安全违规：
  1. 禁止使用绝对路径（如 C:\\、D:\\、/Users/）
  2. 禁止使用 ../ 跳出项目目录
  3. 仅使用项目内相对路径（如 app/page.tsx）
- 违规操作将被记录并可能导致项目暂停
`;

/**
 * 构建执行阶段完整系统提示词
 *
 * @param projectPath - 项目路径
 * @param basePrompt - 基础提示词（可编辑部分）
 * @returns 完整的系统提示词
 */
export function buildExecutionSystemPrompt(projectPath: string, basePrompt: string): string {
  const prefix = EXECUTION_PREFIX_TEMPLATE.replace('{{PROJECT_PATH}}', projectPath);
  return `${prefix}${SECURITY_WARNING_TEMPLATE}

${basePrompt}`;
}

/**
 * 构建规划阶段完整系统提示词
 *
 * @param basePrompt - 基础提示词（可编辑部分）
 * @returns 完整的系统提示词
 */
export function buildPlanningSystemPrompt(basePrompt: string): string {
  // 规划阶段没有动态前缀，直接返回
  return basePrompt;
}
