import React, { FC } from "react"
import { Box, Text } from "ink"

const Tips: FC<{ type?: 'success' }> = ({ type = 'success' }) => {
	return (
		<Box>
			{type === 'success' && <Text>✨ 成功</Text>}
		</Box>
	)
}

export default Tips
