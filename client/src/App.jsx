import React, { useEffect, useState, useRef } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { AuthRoutes, SpecRoutes } from "./components/ProtectedRoutes";
import * as Pages from "./pages/index";
import * as Components from "./components";

import "./App.scss";
import "./styles/tables.scss"
import "./styles/forms.scss"

import { getUser } from "./features/Users/userSlice";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	// Sideabr
	faReceipt, faUsersGear, faBoxArchive, faUserTag, faMoneyCheckDollar, faKey, faArrowRightFromBracket, faIdBadge,
	// Headers
	faArrowRightToBracket, faPlus, faPrint,
	// Queries
	faMagnifyingGlass,
	// Tables General
	faPen, faTrashCan,
	// Bills Table
	faFileInvoice,
	// Workers Table
	faAddressCard,
	// Logs Table
	faCheck, faXmark, faClipboardUser,
	// Payees Table
	faCircleUser,
	// Cheques Table
	faMoneyCheck,
	// Forms
	faShekelSign, faPenToSquare, faAt, faCircleCheck, faCircleXmark


} from '@fortawesome/free-solid-svg-icons';
library.add(
	faReceipt, faUsersGear, faBoxArchive, faUserTag, faMoneyCheckDollar, faKey, faArrowRightFromBracket, faIdBadge,
	faArrowRightToBracket, faPlus, faPrint,
	faMagnifyingGlass,
	faPen, faTrashCan,
	faFileInvoice,
	faAddressCard,
	faCheck, faXmark, faClipboardUser,
	faCircleUser,
	faMoneyCheck,
	faShekelSign, faPenToSquare, faAt, faCircleCheck, faCircleXmark

);

export const UserContext = React.createContext();
export const PrintContext = React.createContext();

function App() {
	const contentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => contentRef.current,
		documentTitle: document.title,
	});
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUser());
	}, []);

	const toggle = () => {
		setIsOpen(!isOpen);
	}
	const user = useSelector((state) => state.user.user);
	return (
		<>
			<UserContext.Provider value={{ user }}>
				<PrintContext.Provider value={{ handlePrint }}>
					<Components.Sidebar toggle={toggle} />
					<div ref={contentRef} className="content_container">
						<Routes>
							{/* <Route path="/" exact element={<Pages.Home />} /> */}
							<Route path="/" exact element={!user ? <Pages.Login /> : <Navigate to="/logs" />} />
							<Route element={<AuthRoutes />}>
								<Route path="/changePassword" exact element={<Pages.ChangePassword />} />
								<Route path="/logs" exact element={<Pages.Logs />} />
								<Route element={<SpecRoutes />}>
									{/* Bills Routes */}
									<Route path="/bills" exact element={<Pages.Bills />} />
									<Route path="/bills/new" exact element={<Pages.BillForm />} />
									<Route path="/bills/:id/edit" exact element={<Pages.BillForm />} />
									{/* Workers Routes */}
									<Route path="/workers" exact element={<Pages.Workers />} />
									<Route path="/workers/new" exact element={<Pages.WorkerForm />} />
									<Route path="/workers/:id/edit" exact element={<Pages.WorkerForm />} />
									{/* Logs Routes */}
									<Route path="/logs/new" exact element={<Pages.LogForm />} />
									<Route path="/logs/:id/edit" exact element={<Pages.LogForm />} />
									{/* Payees Routes */}
									<Route path="/payees" exact element={<Pages.Payees />} />
									<Route path="/payees/new" exact element={<Pages.PayeeForm />} />
									<Route path="/payees/:id/edit" exact element={<Pages.PayeeForm />} />
									{/* Cheques Routes */}
									<Route path="/cheques" exact element={<Pages.Cheques />} />
									<Route path="/cheques/new" exact element={<Pages.ChequeForm />} />
									<Route path="/cheques/:id/edit" exact element={<Pages.ChequeForm />} />
								</Route>
							</Route>
							{/* Errors */}
							<Route path="/500" exact element={<Components.Error />} />
							<Route path="*" exact element={<Components.NotFound />} />
						</Routes >
					</div>
				</PrintContext.Provider>
			</UserContext.Provider>
		</>
	);
}
export default React.memo(App);