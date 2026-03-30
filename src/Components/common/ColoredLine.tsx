type ColoredLineProps = {
	color: string;
	height?: number;
};

export const ColoredLine = ({ color, height = 2 }: ColoredLineProps) => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			height,
		}}
	/>
);
