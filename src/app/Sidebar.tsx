import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
	OverviewIcon,
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
import './Sidebar.css';

function Sidebar() {
	const [state, setState] = useState({ showMenu: true });

	const navItems = [
		{ path: '/', title: 'Overview', icon: <OverviewIcon /> },
		{ path: '/budget', title: 'Budget', icon: <BudgetIcon /> },
		{ path: '/scheduler', title: 'Scheduler', icon: <SchedulerIcon /> },
		{ path: '/reports', title: 'Reports', icon: <ReportsIcon /> },
		{
			path: '/transactions',
			title: 'All Transactions',
			icon: <TransactionsIcon />,
		},
		{ path: '/cash', title: 'Cash', icon: <CashIcon /> },
		{ path: '/credit_card', title: 'Credit Card', icon: <CreditcardIcon /> },
		{ path: '/bank', title: 'Bank', icon: <LoanIcon /> },
		{ path: '/asset', title: 'Asset', icon: <AssetIcon /> },
		{ path: '/investment', title: 'Investment', icon: <InvestmentIcon /> },
	];

	const toggleMenu = () => {
		let isShow = !state.showMenu;
		let isMobile = window.screen.availWidth <= 425 ? true : false;
		setState({ showMenu: isShow });
		console.log(`isMobile: ${isMobile}`);
		if (isMobile) {
			isShow =
				(document.querySelector('.sidebar-items') as any)!.style.display ===
					'none' ||
				(document.querySelector('.sidebar-items') as any)!.style.display === ''
					? true
					: false;
		}
		console.log({ isShow });
		let subMenu = Array.from(document.querySelectorAll('.subMenu'));

		if (isShow) {
			document
				.querySelector('#sidebar_box')
				?.classList.add('col-lg-2', 'col-md-3');
			document
				.querySelector('#sidebar_box')
				?.classList.remove('col-lg-1', 'col-md-1');
			if (isMobile) {
				(document.querySelector('.sidebar-items') as any).style.display =
					'flex';
			}
		} else {
			document
				.querySelector('#sidebar_box')
				?.classList.remove('col-lg-2', 'col-md-3');
			document
				.querySelector('#sidebar_box')
				?.classList.add('col-lg-1', 'col-md-1');
			if (isMobile) {
				(document.querySelector('.sidebar-items') as any).style.display =
					'none';
			}
		}

		subMenu.forEach((i: any) => {
			if (isShow) {
				i.style.display = 'inline';
			} else {
				i.style.display = 'none';
			}
		});
	};

	return (
		<Nav activeKey="/" className="flex-column d-inline-flex" id="sidebar_nav">
			<Link to="#" onClick={toggleMenu} className="nav-toggle">
				<GiHamburgerMenu className="burger-menu-icon" />
			</Link>
			<div className="sidebar-items ">
				{navItems.map((el, i) => {
					const { path, title, icon, ...rest } = el;
					return (
						<NavLink key={i} to={path} className="nav-link" {...rest}>
							{icon}
							<span className="subMenu">{title}</span>
						</NavLink>
					);
				})}
				<Nav.Link className="sidebar_add_box">+</Nav.Link>
			</div>
		</Nav>
	);
}

export default Sidebar;
