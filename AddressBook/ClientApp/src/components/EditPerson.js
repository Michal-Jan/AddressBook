import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

function EditPerson() {
  const params = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState();

  useEffect(() => {
    getPersonData(params.personId);
  }, [params]);

  async function getPersonData(id) {
    const response = await fetch(`api/people/${id}`);
    const data = await response.json();
    setPerson(data);
  }

  async function editPerson() {
    const data = {
      id: person.id,
      firstName: person.firstName,
      lastName: person.lastName,
      description: person.description
    };

    await fetch(`api/people/${person.id}`, {
      method: 'PUT',
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

  let personForm = person ? (
    <>
      <Form>
        <FormGroup>
          <Label for='firstNameInput'>Imię</Label>
          <Input
            id='firstNameInput'
            name='firstName'
            placeholder='Imię'
            value={person.firstName}
            onChange={(e) =>
              setPerson({ ...person, firstName: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for='lastNameInput'>Nazwisko</Label>
          <Input
            id='lastNameInput'
            name='lastName'
            placeholder='Nazwisko'
            value={person.lastName}
            onChange={(e) => setPerson({ ...person, lastName: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='descriptionInput'>Opis</Label>
          <Input
            id='descriptionInput'
            name='description'
            placeholder='Opis'
            value={person.description}
            onChange={(e) =>
              setPerson({ ...person, description: e.target.value })
            }
          />
        </FormGroup>
        <Button className='btn btn-primary' onClick={editPerson}>
          Zapisz
        </Button>{' '}
        <Button className='btn btn-danger' onClick={backToHome}>
          Anuluj
        </Button>
      </Form>
    </>
  ) : (
    <></>
  );

  return (
    <>
      <h4>Edycja</h4>
      {personForm}
    </>
  );
}

export default EditPerson;
