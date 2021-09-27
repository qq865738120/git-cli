import React, { FC, useState } from "react"
import { Box, Text } from "ink"
import TextInput from "ink-text-input"
import shell from "shelljs"

const AcpView: FC = () => {
	const [submitMessage, setSubmitMessage] = useState("")

	const onInputSubmit = () => {
		shell.exec("git add .")
		shell.exec(`git commit -m "${submitMessage}"`)
		shell.exec("git push")
	}

	return (
		<Box>
			<Text>{submitMessage}请输入提交信息：</Text>
			<TextInput
				value={submitMessage}
				onChange={setSubmitMessage}
				onSubmit={onInputSubmit}
			/>
		</Box>
	)
}

export default AcpView
