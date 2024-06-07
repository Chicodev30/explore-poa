import React from 'react';
import { Accordion } from 'react-bootstrap';

const AccordionMenu = () => {
  return (
    <details className="accordion-menu">
      <summary>Menu</summary>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Item 1</Accordion.Header>
          <Accordion.Body>
            Conteúdo do Item 1.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Desenhar</Accordion.Header>
          <Accordion.Body>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Item 3</Accordion.Header>
          <Accordion.Body>
            Conteúdo do Item 3.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </details>
  );
}

export default AccordionMenu;
