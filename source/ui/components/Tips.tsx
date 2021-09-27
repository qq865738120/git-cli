import React, { FC } from "react"
import { Box, Text } from "ink"

export type ITipsPropsType = 'success' | 'error'

export interface ITipsProps {
	type?: ITipsPropsType
}

const Tips: FC<ITipsProps> = ({ type = 'success' }) => {
	return (
		<Box>
			{type === 'success' && <><Text>✨</Text><Box marginLeft={1}>成功</Box></>}
			{type === 'error' && <><Text>✘</Text><Box marginLeft={1}>出错了</Box></>}
		</Box>
	)
}

export default Tips
