import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

function AddPerson() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');

  async function addPerson() {
    if (firstName === null || lastName === null) {
      return;
    }
    if (firstName.length < 2 || lastName.length < 2) {
      return;
    }
    const data = {
      firstName: firstName,
      lastName: lastName,
      description: description
    };

    await fetch('api/people', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    backToHome();
  }

  function backToHome() {
    navigate('/');
  }

  return (
    <>
      <h3>Nowa Osoba</h3>
      <Form>
        <FormGroup>
          <Label for='firstNameInput'>Imię</Label>
          <Input
            id='firstNameInput'
            name='firstName'
            placeholder='Imię'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for='lastNameInput'>Nazwisko</Label>
          <Input
            id='lastNameInput'
            name='lastName'
            placeholder='Nazwisko'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for='descriptionInput'>Opis</Label>
          <Input
            id='descriptionInput'
            name='description'
            placeholder='Opis'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <Button className='btn btn-primary' onClick={addPerson}>
          Dodaj
        </Button>{' '}
        <Button className='btn btn-danger' onClick={backToHome}>
          Anuluj
        </Button>
      </Form>
    </>
  );
}

export default AddPerson;
