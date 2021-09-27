import React, { FC } from "react"
import { Box, Text } from "ink"

export type ITipsPropsType = "success" | "error"

export interface ITipsProps {
	type?: ITipsPropsType
}

const Tips: FC<ITipsProps> = ({ type = "success" }) => {
	return (
		<Box>
			{type === "success" && (
				<>
					<Text>✨</Text>
					<Box marginLeft={1}>
						<Text>成功</Text>
					</Box>
				</>
			)}
			{type === "error" && (
				<>
					<Text>✘</Text>
					<Box marginLeft={1}>
						<Text>出错了</Text>
					</Box>
				</>
			)}
		</Box>
	)
}

export default Tips
