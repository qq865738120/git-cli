import chalk from "chalk";

const title = (str: string) => chalk.blue.bold(str)
const name = chalk.green('git-cli')
const prompt = chalk.gray('$')

export default `
${title('使用：')}
  ${prompt} ${name} [--version|--v] [--help|--h] <command> [<args>]

${title('例子：')}
  ${prompt} ${name} acp

${title('参数：')}
  help | h      查看帮助文档
  version | v   查看版本号

${title('命令：')}
  acp           组合git的add、commit、push命令，快速提交代码到远程
`
