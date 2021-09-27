import React, { FC, useState } from "react"
import { Box, Text } from "ink"
import TextInput from "ink-text-input"
import shell from "shelljs"

const AcpView: FC = () => {
	const [submitMessage, setSubmitMessage] = useState("")

	const onInputSubmit = () => {
		const result = shell.exec("git add .", { silent: true })
    console.log('result', result);
		shell.exec(`git commit -m "${submitMessage}"`, { silent: true })
    shell.exec("git pull", { silent: true })
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
		</Box>
	)
}

export default AcpView
