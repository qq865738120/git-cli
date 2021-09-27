import React, { FC } from "react"
import { Box, Text } from "ink"
import Spinner from "ink-spinner"

const Loading: FC = (props) => {
	return (
		<Box>
			<Text color='green'>
				<Spinner type='dots' />
			</Text>
			<Box marginLeft={1}>
				<Text>{props.children}</Text>
			</Box>
		</Box>
	)
}

export default Loading
