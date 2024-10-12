import React, { useState } from 'react';
import styled from 'styled-components';

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalInput = styled.input`
  width: 45%;
    margin-right: 5px;
    padding: 8px;
`;

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background-color: #005bb5;
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 400px;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
`;

const Dropdown = styled.select`
  padding: 0.5rem;
  margin-right: 0.5rem;
`;

interface Link {
  platform: 'youtube' | 'github';
  text: string;
}

const Links = () => {
  const [links, setLinks] = useState<Link[]>([]);  // Define the links as an array of Link objects
  const [showModal, setShowModal] = useState(false);
  const [newLink, setNewLink] = useState<Link>({ platform: 'youtube', text: '' });

  const handleAddLink = () => {
    setLinks([...links, newLink]);  // Add the new link to the list
    setNewLink({ platform: 'youtube', text: '' });  // Reset the new link form
    setShowModal(false);
  };

  return (
   <>
   
    <LinksContainer>
      <Button onClick={() => setShowModal(true)}>Add New Link</Button>

      {showModal && (
        <div>
          <Dropdown
            value={newLink.platform}
            onChange={(e) => setNewLink({ ...newLink, platform: e.target.value as 'youtube' | 'github' })}
          >
            <option value="youtube">YouTube</option>
            <option value="github">GitHub</option>
          </Dropdown>
          <ModalInput
            type="text"
            placeholder="Enter link"
            value={newLink.text}
            onChange={(e) => setNewLink({ ...newLink, text: e.target.value })}
          />
          <Button onClick={handleAddLink}>Add</Button>
        </div>
      )}

      <LinkList>
        {links.map((link, index) => (
          <ListItem key={index}>
            <Dropdown
              value={link.platform}
              onChange={(e) =>
                setLinks(
                  links.map((l, i) =>
                    i === index ? { ...l, platform: e.target.value as 'youtube' | 'github' } : l
                  )
                )
              }
            >
              <option value="youtube">YouTube</option>
              <option value="github">GitHub</option>
            </Dropdown>
            <span>{link.text}</span>
            <Button onClick={() => setLinks(links.filter((_, i) => i !== index))}>Delete</Button>
          </ListItem>
        ))}
      </LinkList>
    </LinksContainer>
   </>
  );
};

export default Links;
