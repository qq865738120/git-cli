import React, { FC, useEffect, useState } from "react"
import { Box, Text, useApp } from "ink"
import TextInput from "ink-text-input"
import shell from "shelljs"
import Tips, { ITipsPropsType } from "./components/Tips"
import Loading from "./components/Loading"

const AcpView: FC = () => {
	const [submitMessage, setSubmitMessage] = useState("")
	const [tasks, setTasks] = useState([] as ((params?: any) => string)[])
	const [taskDone, setTaskDone] = useState([] as ((params?: any) => string)[])
	const [progressText, setProgressText] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [isShowTips, setIsShowTips] = useState(false)
	const [tipsType, setTipsType] = useState<ITipsPropsType>('success')
	const { exit } = useApp()

	useEffect(() => {
		setTasks([
			() => "git add .",
			message => `git commit -m "${message || 'default'}"`,
			() => "git push",
		])
	}, [])

	const onInputSubmit = () => {
		setIsLoading(true)
		tasks.map((task, index) => {
      if (tipsType === 'error') {
        return
      }

			const taskStr = index === 1 ? task(submitMessage) : task()
			const result = shell.exec(taskStr, {
				silent: true,
			})
			if (result.code === 0) {
				setProgressText(taskStr)
				taskDone.push(task)
				setTaskDone(taskDone)
			} else {
        setTipsType('error')
        setIsShowTips(true)
				exit(new Error(result.stderr))
        process.exit(1)
			}
		})
		setIsLoading(false)
    setTipsType('success')
		setIsShowTips(true)
		exit(new Error("成功"))
    process.exit(0)
	}

	return (
		<Box flexDirection='column'>
			<Box>
				<Box marginRight={1}>
					<Text>请输入提交信息：(default)</Text>
				</Box>
				<TextInput
					value={submitMessage}
					onChange={setSubmitMessage}
					onSubmit={onInputSubmit}
				/>
			</Box>

			{isLoading && <Loading>{progressText}</Loading>}

			{isShowTips && <Tips type={tipsType} />}
		</Box>
	)
}

export default AcpView
