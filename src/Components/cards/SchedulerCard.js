import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';
import '../../../node_modules/react-calendar/dist/Calendar.css';
import './SchedulerCard.css';

class SchedulerCard extends React.Component {
	render() {
		return (
			<Container className="main_box">
				<Row className="box_title_row">
					<Col xs={9}>
						<h5 className="box_title text-left">Scheduler</h5>
					</Col>
					<Col xs={3} className="card_add_col">
						<a href="#" className="h1 card_add text-right">
							+
						</a>
					</Col>
				</Row>
				<Row>
					<Calendar className="container main_box" />
				</Row>
			</Container>
		);
	}
}

export default SchedulerCard;
