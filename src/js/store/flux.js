const getState = ({ getStore, getActions, setStore }) => {
	const URI = "https://assets.breatheco.de/apis/fake/contact";
	const AGENDA_SLUG = "bryanstgarcia";
	return {
		store: {
			//Your data structures, A.K.A Entities
			agenda: {
				agenda_slug: AGENDA_SLUG,
				contacts: []
			}
		},
		actions: {
			createAgenda: async () => {
				//if you need to create an agenda_slug use the uri and add the agenda name or user that you want
				try {
					const response = await fetch(`${URI}/agenda/${AGENDA_SLUG}`);
					if (response.ok) {
						const agenda = await response.json();
						return alert("The user was created");
					}
				} catch (error) {
					console.log(error);
				}
			},
			getContacts: async () => {
				//Obtain all the contacts from the agenda 
				try {
					//Get the store to use it
					const store = getStore();
					//API request
					const response = await fetch(`${URI}/agenda/${AGENDA_SLUG}`);
					const actualContacts = await response.json();

					setStore({
						agenda: {
							...store.agenda,
							contacts: [...actualContacts]
						}
					});
				} catch (error) {
					console.log(error);
				}
			},
			createContact: async ({ fullName, email, address, phone }) => {
				//Create a new contact
				try {
					const store = getStore();
					const actions = getActions();
					const newContact = {
						full_name: fullName,
						email: email,
						agenda_slug: store.agenda.agenda_slug,
						address: address,
						phone: phone
					};

					const response = await fetch(`${URI}/`, {
						method: "POST",
						body: JSON.stringify(newContact),
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						const contacts = await actions.getContacts();
						return true;
					} else {
						throw new Error("Error, contact wasn't created");
					}
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			updateContact: async (contact, id) => {
				//Update a contact from the agenda
				try {
					const store = getStore();
					const actions = getActions();
					const updateContact = {
						full_name: contact.fullName,
						email: contact.email,
						agenda_slug: store.agenda.agenda_slug,
						address: contact.address,
						phone: contact.phone
					};

					const update = await fetch(`${URI}/${id}`, {
						method: "PUT",
						body: JSON.stringify(updateContact),
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (update.ok) {
						const contacts = await actions.getContacts();
						return true;
					} else {
						throw new Error("Error, contact wasn't created");
					}
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			deleteContact: async (contact, id) => {
				//Delete contact from the agenda
				const store = getStore();
				const actions = getActions();

				try {
					const deleteContact = await fetch(`${URI}/${id}`, {
						method: "DELETE"
					});
					if (deleteContact.ok) {
						const getContacts = await actions.getContacts();
						return true;
					} else {
						throw new Error("An error occurred");
					}
				} catch (error) {
					console.log(error);
					return false;
				}
			}
		}
	};
};

export default getState;
