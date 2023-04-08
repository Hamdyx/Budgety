import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';

import { ReactComponent as OverviewIcon } from './grid.svg';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
	AssetIcon,
	BudgetIcon,
	CashIcon,
	CreditcardIcon,
	InvestmentIcon,
	LoanIcon,
	ReportsIcon,
	SchedulerIcon,
	TransactionsIcon,
} from 'assets/icons';

function Sidebar() {
	const [state, setState] = useState(true);

	const budgetIcon = <BudgetIcon />;
	const schedulerIcon = <SchedulerIcon />;
	const reportsIcon = <ReportsIcon />;
	const transactionsIcon = <TransactionsIcon />;
	const cashIcon = <CashIcon />;
	const creditcardIcon = <CreditcardIcon />;
	const loanIcon = <LoanIcon />;
	const assetIcon = <AssetIcon />;
	const investmentIcon = <InvestmentIcon />;

	const toggleMenu = () => {
		let isShow = !state.showMenu;
		let isMobile = window.screen.availWidth <= 425 ? true : false;
		setState({ showMenu: isShow });
		console.log(
			`isShow: ${document.querySelector('.sidebar-items').style.display}`
		);
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

		if (isShow) {
			document
				.querySelector('#sidebar_box')
				.classList.add('col-lg-2', 'col-md-3');
			document
				.querySelector('#sidebar_box')
				.classList.remove('col-lg-1', 'col-md-1');
			if (isMobile) {
				document.querySelector('.sidebar-items').style.display = 'flex';
			}
		} else {
			document
				.querySelector('#sidebar_box')
				.classList.remove('col-lg-2', 'col-md-3');
			document
				.querySelector('#sidebar_box')
				.classList.add('col-lg-1', 'col-md-1');
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
	};

	const handleSubMenuShow = () => {
		console.log('submenu');
		let subMenu = document.querySelectorAll('.subMenu');
		subMenu = Array.from(subMenu);
		subMenu.forEach((i) => {
			if (state.showMenu) {
				i.style.display = 'inline';
				document.querySelector('#sidebar_box').classList.add('col-lg-2');
				document.querySelector('#sidebar_box').classList.remove('col-lg-1');
			} else {
				i.style.display = 'none';
				document.querySelector('#sidebar_box').classList.remove('col-lg-2');
				document.querySelector('#sidebar_box').classList.add('col-lg-1');
			}
		});
	};

	return (
		<Nav activekey="/" className="flex-column d-inline-flex" id="sidebar_nav">
			<Link to="#" onClick={toggleMenu} className="nav-toggle">
				<GiHamburgerMenu className="burger-menu-icon" />
			</Link>
			<div className="sidebar-items ">
				<NavLink to="/" eventkey="0" className="nav-link">
					<OverviewIcon width="16" height="16" className="nav_icon" />
					{/* <Image src={overviewImg} width="16" height="16" className="nav_icon" /> */}
					<span className="subMenu">Overview</span>
				</NavLink>
				<NavLink to="/budget" eventkey="link-1" className="nav-link">
					{budgetIcon}
					<span className="subMenu">Budget</span>
				</NavLink>
				<NavLink to="/scheduler" eventkey="link-2" className="nav-link">
					{schedulerIcon}
					<span className="subMenu">Scheduler</span>
				</NavLink>
				<NavLink to="/reports" eventkey="link-3" className="nav-link">
					{reportsIcon}
					<span className="subMenu">Reports</span>
				</NavLink>
				<Nav.Link
					eventkey="link-4"
					disabled
					id="sidebar_accounts"
					className="text-muted"
				>
					<span className="subMenu">Accounts</span>
				</Nav.Link>
				<NavLink to="/transactions" eventkey="link-5" className="nav-link">
					{transactionsIcon}
					<span className="subMenu">All Transactions</span>
				</NavLink>
				<NavLink to="/cash" eventkey="link-6" className="nav-link">
					{cashIcon}
					<span className="subMenu">
						Cash
						{/* <span className="sidebar_span income_item_text">($6969)</span> */}
					</span>
				</NavLink>
				<NavLink to="/credit_card" eventkey="link-7" className="nav-link">
					{creditcardIcon}
					<span className="subMenu">
						Credit Card
						{/* <span className="sidebar_span income_item_text">($6969)</span> */}
					</span>
				</NavLink>
				<NavLink to="/bank" eventkey="link-8" className="nav-link">
					{loanIcon}
					<span className="subMenu">
						Bank
						{/* <span className="sidebar_span expense_item_text">($6969)</span> */}
					</span>
				</NavLink>
				<NavLink to="/asset" eventkey="link-9" className="nav-link">
					{assetIcon}
					<span className="subMenu">
						Asset
						{/* <span className="sidebar_span income_item_text">($6969)</span> */}
					</span>
				</NavLink>
				<NavLink to="/investment" eventkey="link-10" className="nav-link">
					{investmentIcon}
					<span className="subMenu">
						Investment
						{/* <span className="sidebar_span income_item_text">($6969)</span> */}
					</span>
				</NavLink>
				<Nav.Link className="sidebar_add_box">+</Nav.Link>
			</div>
		</Nav>
	);
}

export default Sidebar;
