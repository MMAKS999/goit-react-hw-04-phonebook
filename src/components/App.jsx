import { Filter } from './Filter';
import { PhonebookForm } from './PhonebookForm';
import { ContactList } from './contactList';
import Swal from 'sweetalert2';

import { Component } from 'react';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = dataContact => {
    if (
      this.state.contacts.some(
        contact =>
          contact.name.toLowerCase() === dataContact.name.toLowerCase() ||
          contact.number === dataContact.number
      )
    ) {
      Swal.fire(`${dataContact.name} or ${dataContact.number} is already in contacts.`);
      return;
    }
    this.setState(prevState => ({
      contacts: [dataContact, ...prevState.contacts],
    }));
  };

  changeFilter = ev => {
    this.setState({ filter: ev.currentTarget.value });
  };

  // Видалення контакту
  onDelateContact = id => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: updatedContacts });
  };

  // метод фільтрації контактів
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    
    const storageContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storageContacts) {
      this.setState({ contacts: storageContacts });
    }
    

  }
// Визначення зміни в даних
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contact) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <PhonebookForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          dataContacts={visibleContacts}
          onDelateContact={this.onDelateContact}
        />
      </div>
    );
  }
}
