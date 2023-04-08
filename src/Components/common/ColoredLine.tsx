export const ColoredLine = ({
	color,
	height = 2,
}: {
	color: any;
	height?: number;
}) => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			height: 2,
		}}
	/>
);
