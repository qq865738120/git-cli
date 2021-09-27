import React, { FC } from "react"
import { Box, Text } from "ink"

export type ITipsPropsType = 'success' | 'error'

export interface ITipsProps {
	type?: ITipsPropsType
}

const Tips: FC<ITipsProps> = ({ type = 'success' }) => {
	return (
		<Box>
			{type === 'success' && <Text>✨ 成功</Text>}
			{type === 'error' && <Text>✘ 出错了</Text>}
		</Box>
	)
}

export default Tips
