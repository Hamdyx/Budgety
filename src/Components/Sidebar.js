import React from 'react';
import ReactDOM from 'react-dom';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Sidebar.css';

import { ReactComponent as OverviewIcon } from '../grid.svg';
import { GiHamburgerMenu } from 'react-icons/gi';
import InvestmentPage from '../investment/InvestmentPage';
/* import './App.css'; */

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: true,
			activeLink: '/',
		};
		this.handleActive = this.handleActive.bind(this);
		this.budgetIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-currency-exchange nav_icon"
				viewBox="0 0 16 16"
			>
				<path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z" />
			</svg>
		);
		this.schedulerIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-calendar-event-fill nav_icon"
				viewBox="0 0 16 16"
			>
				<path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
			</svg>
		);
		this.reportsIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-bar-chart nav_icon"
				viewBox="0 0 16 16"
			>
				<path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
			</svg>
		);
		this.transactionsIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-file-diff nav_icon"
				viewBox="0 0 16 16"
			>
				<path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4zm-2.5 6.5A.5.5 0 0 1 6 10h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
				<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
			</svg>
		);
		this.cashIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-cash-stack nav_icon"
				viewBox="0 0 16 16"
			>
				<path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
				<path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
			</svg>
		);
		this.creditcardIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-credit-card nav_icon"
				viewBox="0 0 16 16"
			>
				<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
				<path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
			</svg>
		);
		this.loanIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-bank nav_icon"
				viewBox="0 0 16 16"
			>
				<path d="M8 .95 14.61 4h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.379l.5 2A.5.5 0 0 1 15.5 17H.5a.5.5 0 0 1-.485-.621l.5-2A.5.5 0 0 1 1 14V7H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 4h.89L8 .95zM3.776 4h8.447L8 2.05 3.776 4zM2 7v7h1V7H2zm2 0v7h2.5V7H4zm3.5 0v7h1V7h-1zm2 0v7H12V7H9.5zM13 7v7h1V7h-1zm2-1V5H1v1h14zm-.39 9H1.39l-.25 1h13.72l-.25-1z" />
			</svg>
		);
		this.assetIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-gem nav_icon"
				viewBox="0 0 16 16"
			>
				<path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z" />
			</svg>
		);
		this.investmentIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-graph-up nav_icon"
				viewBox="0 0 16 16"
			>
				<path
					fillRule="evenodd"
					d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z"
				/>
			</svg>
		);
		this.toggleMenu = this.toggleMenu.bind(this);
		this.handleSubMenuShow = this.handleSubMenuShow.bind(this);
	}

	componentDidMount() {
		var navLinks = document.querySelectorAll('.nav-link');
		console.log(navLinks);
		navLinks = Array.from(navLinks);
		var defActive = navLinks[0];
		this.setState({ activeLink: defActive });
		navLinks.forEach((e) => e.addEventListener('click', this.handleActive));
	}

	handleActive(event) {
		var targetDom = event.currentTarget;
		var prevActive = this.state.activeLink;
		/* console.log(prevActive);
    console.log(targetDom);
    console.log(targetDom.classList); */
		prevActive.classList.remove('active');
		targetDom.classList.add('active');
		this.setState({ activeLink: targetDom });
	}

	toggleMenu() {
		let isShow = !this.state.showMenu;
		let isMobile = window.screen.availWidth <= 425 ? true : false;
		this.setState({ showMenu: isShow });
		console.log(`isShow: ${document.querySelector('.sidebar-items').style.display}`);
		console.log(`isMobile: ${isMobile}`);
		if (isMobile) {
			isShow =
				document.querySelector('.sidebar-items').style.display === 'none' ||
				document.querySelector('.sidebar-items').style.display === ''
					? true
					: false;
		}
		console.log(isShow);
		let subMenu = document.querySelectorAll('.subMenu');
		subMenu = Array.from(subMenu);

		/* this.handleSubMenuShow(subMenu); */

		if (isShow) {
			document.querySelector('#sidebar_box').classList.add('col-lg-2', 'col-md-3');
			document.querySelector('#sidebar_box').classList.remove('col-lg-1', 'col-md-1');
			if (isMobile) {
				document.querySelector('.sidebar-items').style.display = 'flex';
			}
		} else {
			document.querySelector('#sidebar_box').classList.remove('col-lg-2', 'col-md-3');
			document.querySelector('#sidebar_box').classList.add('col-lg-1', 'col-md-1');
			if (isMobile) {
				document.querySelector('.sidebar-items').style.display = 'none';
			}
		}

		subMenu.forEach((i) => {
			if (isShow) {
				i.style.display = 'inline';
			} else {
				i.style.display = 'none';
			}
		});
		// console.log(isShow);

		/* setTimeout(this.handleSubMenuShow, 1000); */
	}

	handleSubMenuShow() {
		console.log('submenu');
		let subMenu = document.querySelectorAll('.subMenu');
		subMenu = Array.from(subMenu);
		subMenu.forEach((i) => {
			if (this.state.showMenu) {
				i.style.display = 'inline';
				document.querySelector('#sidebar_box').classList.add('col-lg-2');
				document.querySelector('#sidebar_box').classList.remove('col-lg-1');
			} else {
				i.style.display = 'none';
				document.querySelector('#sidebar_box').classList.remove('col-lg-2');
				document.querySelector('#sidebar_box').classList.add('col-lg-1');
			}
		});
	}

	render() {
		return (
			<Nav activekey="/" className="flex-column d-inline-flex" id="sidebar_nav">
				<Link to="#" onClick={this.toggleMenu} className="nav-toggle">
					<GiHamburgerMenu className="burger-menu-icon" />
				</Link>
				<div className="sidebar-items ">
					<Link to="/" eventkey="0" className="nav-link active">
						<OverviewIcon width="16" height="16" className="nav_icon" />
						<span className="subMenu">Overview</span>
					</Link>
					<Link to="/budget" eventkey="link-1" className="nav-link">
						{this.budgetIcon}
						<span className="subMenu">Budget</span>
					</Link>
					<Link to="/" eventkey="link-2" className="nav-link">
						{this.schedulerIcon}
						<span className="subMenu">Scheduler</span>
					</Link>
					<Link to="/" eventkey="link-3" className="nav-link">
						{this.reportsIcon}
						<span className="subMenu">Reports</span>
					</Link>
					<Nav.Link
						eventkey="link-4"
						disabled
						id="sidebar_accounts"
						className="text-muted"
					>
						<span className="subMenu">Accounts</span>
					</Nav.Link>
					<Link to="/" eventkey="link-5" className="nav-link">
						{this.transactionsIcon}
						<span className="subMenu">All Transactions</span>
					</Link>
					<Link to="/" eventkey="link-6" className="nav-link">
						{this.cashIcon}
						<span className="subMenu">
							Cash
							{/* <span className="sidebar_span income_item_text">($6969)</span> */}
						</span>
					</Link>
					<Link to="/" eventkey="link-7" className="nav-link">
						{this.creditcardIcon}
						<span className="subMenu">
							Credit Card
							{/* <span className="sidebar_span income_item_text">($6969)</span> */}
						</span>
					</Link>
					<Link to="/bank" eventkey="link-8" className="nav-link">
						{this.loanIcon}
						<span className="subMenu">
							Bank
							{/* <span className="sidebar_span expense_item_text">($6969)</span> */}
						</span>
					</Link>
					<Link to="/" eventkey="link-9" className="nav-link">
						{this.assetIcon}
						<span className="subMenu">
							Asset
							{/* <span className="sidebar_span income_item_text">($6969)</span> */}
						</span>
					</Link>
					<Link to="/investment" eventkey="link-10" className="nav-link">
						{this.investmentIcon}
						<span className="subMenu">
							Investment
							{/* <span className="sidebar_span income_item_text">($6969)</span> */}
						</span>
					</Link>
					<Nav.Link className="sidebar_add_box">+</Nav.Link>
				</div>
			</Nav>
		);
	}
}

export default Sidebar;
