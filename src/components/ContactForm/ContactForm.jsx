import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Form, Label, Span, Input, Button } from './ContactForm.styled';

export function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  //ввод в интпут
  const handleChange = evt => {
    const { name, value } = evt.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  // функція для сабміта форми та передачі данних в Аpp;
  const handleSubmit = evt => {
    evt.preventDefault();

    const newContact = { id: nanoid(), name, number, };
    onSubmit( newContact );
    setName('');
    setNumber('');
  };

    return (
      <Form onSubmit={handleSubmit}>
        <Label>          
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholder=" "
            required
            value={name}
            onChange={handleChange}
          />
          <Span>Name</Span>
        </Label>
        <Label>       
          <Input       
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            placeholder=" "
            required
            value={number}
            onChange={handleChange}
          />
          <Span>Number</Span>
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    );
  }

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
