import { useEffect, useState } from 'react';
import { Container }  from './Container/Container';
import { AppStyle } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import toast, { Toaster } from 'react-hot-toast';


export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState(''); 
      
  useEffect(() => {
    localStorage.getItem('contacts', JSON.stringify(contacts));    
  }, [contacts]);
  
const addContact = data => {
  if (
    !contacts.find(
      ({ name }) => name.toLocaleLowerCase() === data.name.toLowerCase()
    )
  ) {setContacts(prevContacts => [...prevContacts, data]);
}else {
 toast.error(`${data.name} is already in contacts.`);
}
};
 
const changeFilter = evt => {
  setFilter(evt.currentTarget.value);
};

const deleteContact = contactId => {
  setContacts( contacts  => (contacts.filter(({id}) => id !== contactId))); 
};

const visibleContacts = () => {
  return  contacts.filter(contact =>
  contact.name.toLowerCase().includes(filter.toLowerCase()),);
};

  return (
    <AppStyle>
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />   
        <Toaster position="top-center" reverseOrder={false}/>  
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        {contacts.length > 0 ? (
        <ContactList contacts={visibleContacts()} deleteContact={deleteContact} />
        ) : (
          <p>Your phonebook is empty. Please add contact.</p>
        )}
      </Container>
    </AppStyle>
  );
};