import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import EmailModal from './EmailModal';

export function Home(props) {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [personToEdit, setPersonToEdit] = useState();

  useEffect(() => {
    populatePeopleData();
  }, []);

  function toggleModalOpen(person) {
    setEmailModalOpen(!emailModalOpen);
    setPersonToEdit(person);
  }

  let contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    <>
      <div className='pb-2'>
        <Button
          className='btn btn-success'
          onClick={() => navigate('/AddPerson')}>
          Dodaj
        </Button>
      </div>
      <table className='table table-striped' aria-labelledby='tableLabel'>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Opis</th>
            <th>Adresy email</th>
            <th>Opcje</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>{person.description}</td>
              <td>
                <Button
                  type='button'
                  className='btn btn-primary btn-sm'
                  onClick={() => toggleModalOpen(person)}>
                  {person.emails.length}
                </Button>
              </td>
              <td>
                <Button
                  type='button'
                  className='btn btn-primary btn-sm'
                  onClick={() => navigate(`/EditPerson/${person.id}`)}>
                  Edycja
                </Button>{' '}
                <Button
                  type='button'
                  className='btn btn-danger btn-sm'
                  onClick={() => deletePerson(person.id)}>
                  Usuń
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EmailModal
        emailModalOpen={emailModalOpen}
        setEmailModalOpen={setEmailModalOpen}
        person={personToEdit}
        reload={populatePeopleData}
      />
    </>
  );

  return (
    <div>
      <div>{contents}</div>
    </div>
  );

  async function populatePeopleData() {
    const response = await fetch('api/people');
    const data = await response.json();
    setPeople(data);
    setLoading(false);
  }

  async function deletePerson(id) {
    await fetch(`api/people/${id}`, {
      method: 'DELETE'
    });
    await populatePeopleData();
  }
}
