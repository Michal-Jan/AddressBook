import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input
} from 'reactstrap';

function EmailModal({ emailModalOpen, setEmailModalOpen, person, reload }) {
  const [modal, setModal] = useState(false);
  const [emailToAdd, setEmailToAdd] = useState('');

  useEffect(() => {
    setModal(emailModalOpen);
  }, [emailModalOpen]);

  const toggle = () => {
    setEmailModalOpen(!modal);
    setModal(!modal);
  };

  async function addEmail() {
    if (emailToAdd.length < 6) {
      return;
    }
    const data = { emailAddress: emailToAdd, personId: person.id };

    await fetch('api/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    setEmailToAdd('');
    reload();
    toggle();
  }

  async function deleteEmail(id) {
    await fetch(`api/emails/${id}`, {
      method: 'DELETE'
    });
    reload();
    toggle();
  }

  function handleEnterKey(event) {
    const enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) {
      event.preventDefault();
      addEmail();
    }
  }

  let modalContent = person ? (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {person.firstName} {person.lastName}
        </ModalHeader>
        <ModalBody>
          {person.emails.map((email) => (
            <p key={email.id}>
              {email.emailAddress}
              <Button
                color='link'
                size='sm'
                onClick={() => deleteEmail(email.id)}>
                usuń
              </Button>
            </p>
          ))}
          <Form>
            <FormGroup>
              <Input
                id='emailInput'
                name='emailAddress'
                placeholder='Adres email'
                type='email'
                value={emailToAdd}
                onChange={(e) => setEmailToAdd(e.target.value)}
                onKeyDown={handleEnterKey}
              />
            </FormGroup>
            <Button className='btn btn-primary' onClick={addEmail}>
              Dodaj
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={toggle}>
            Zamknij
          </Button>
        </ModalFooter>
      </Modal>
    </>
  ) : (
    <></>
  );

  return <>{modalContent}</>;
}

export default EmailModal;
