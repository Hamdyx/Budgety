import type { CustomFloatingLabelProps } from 'types/types';

import React from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';

const CustomFloatingLabel = ({
	type,
	label,
	value,
	changeFunc,
}: CustomFloatingLabelProps) => {
	return (
		<FloatingLabel controlId="floatingInput-4" label={label} className="mb-3">
			<Form.Control
				type={type}
				value={value}
				onChange={changeFunc}
				className="trx-modal-input"
			/>
		</FloatingLabel>
	);
};

export default CustomFloatingLabel;
