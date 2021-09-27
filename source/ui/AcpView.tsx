import React, { FC, useEffect, useState } from "react"
import { Box, Newline, Text, useApp } from "ink"
import TextInput from "ink-text-input"
import ProgressBar from "ink-progress-bar"
import shell from "shelljs"
// import logSymbols from "log-symbols"

const AcpView: FC = () => {
	const [submitMessage, setSubmitMessage] = useState("")
	const [tasks, setTasks] = useState([] as ((params?: any) => string)[])
	const [taskDone, setTaskDone] = useState([] as ((params?: any) => string)[])
	const [progressText, setProgressText] = useState("")
	const { exit } = useApp()

	useEffect(() => {
		setTasks([
			() => "git add .",
			() => `git commit -m "${submitMessage}"`,
			() => "git push",
		])
	}, [])

	const onInputSubmit = () => {
		tasks.map(task => {
			const result = shell.exec(task(), { silent: true })
			if (result.code === 0) {
				setProgressText(task().substring(0, 8))
				setTaskDone(taskDone.concat([task]))
			} else {
				exit(new Error(task() + "命令运行失败"))
			}
		})
		const result = shell.exec("git add .", { silent: true })
		console.log("result", result)
		shell.exec(`git commit -m "${submitMessage}"`, { silent: true })
		// shell.exec("git pull", { silent: true })
		shell.exec("git push", { silent: true })
	}

	return (
		<Box>
			<Text>请输入提交信息：</Text>
			<TextInput
				value={submitMessage}
				onChange={setSubmitMessage}
				onSubmit={onInputSubmit}
			/>
			<Newline />
			<Text>{progressText}</Text>
			<ProgressBar
				left={progressText.length}
				percent={taskDone.length / tasks.length}
			/>
		</Box>
	)
}

export default AcpView
