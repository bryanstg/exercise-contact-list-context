import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
	const { store, actions } = useContext(Context);
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	const history = useHistory();
	const params = useParams();

	useEffect(() => {
		if ("id" in params) {
			const updateContact = store.agenda.contacts.find(contact => {
				return contact.id == params.id;
			});
			setFullName(updateContact.full_name);
			setEmail(updateContact.email);
			setPhone(updateContact.phone);
			setAddress(updateContact.address);
		}
	}, []);

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							value={fullName}
							onChange={event => {
								setFullName(event.target.value);
							}}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							value={email}
							onChange={event => {
								setEmail(event.target.value);
							}}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							value={phone}
							onChange={event => {
								setPhone(event.target.value);
							}}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							value={address}
							onChange={event => {
								setAddress(event.target.value);
							}}
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={async event => {
							let success = false;
							if ("id" in params) {
								success = await actions.updateContact(
									{
										fullName,
										email,
										address,
										phone
									},
									params.id
								);
							} else {
								success = await actions.createContact({
									fullName,
									email,
									address,
									phone
								});
							}
							if (success) {
								history.push("/");
							} else {
								alert("There was a problem, try again");
							}
						}}>
						Save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
