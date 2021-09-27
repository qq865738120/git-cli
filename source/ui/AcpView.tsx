import React, { FC, useEffect, useState } from "react"
import { Box, Text, useApp } from "ink"
import TextInput from "ink-text-input"
import shell from "shelljs"
import Tips from "./components/Tips"
import Loading from "./components/Loading"

const AcpView: FC = () => {
	const [submitMessage, setSubmitMessage] = useState("")
	const [tasks, setTasks] = useState([] as ((params?: any) => string)[])
	const [taskDone, setTaskDone] = useState([] as ((params?: any) => string)[])
	const [progressText, setProgressText] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [isShowTips, setIsShowTips] = useState(false)
	const { exit } = useApp()

	useEffect(() => {
		setTasks([
			() => "git add .",
			message => `git commit -m "${message}"`,
			() => "git push",
		])
	}, [])

	const onInputSubmit = () => {
		setIsLoading(true)
		tasks.map((task, index) => {
			const taskStr = index === 1 ? task(submitMessage) : task()
			const result = shell.exec(taskStr, {
				silent: true,
			})
			if (result.code === 0) {
				setProgressText(taskStr)
				taskDone.push(task)
				setTaskDone(taskDone)
			} else {
				exit(new Error(result.stderr))
				return
			}
		})
		setIsLoading(false)
		setIsShowTips(true)
		exit(new Error("成功"))
	}

	return (
		<Box flexDirection='column'>
			<Box>
				<Box marginRight={1}>
					<Text>请输入提交信息：</Text>
				</Box>
				<TextInput
					value={submitMessage}
					onChange={setSubmitMessage}
					onSubmit={onInputSubmit}
				/>
			</Box>

			{isLoading && <Loading>{progressText}</Loading>}

			{isShowTips && <Tips />}
		</Box>
	)
}

export default AcpView
