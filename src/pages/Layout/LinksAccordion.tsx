import { Accordion, Nav } from "react-bootstrap";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function AccordionContent() {
  const tabs = [
    {
      title: "Core Insights",
      to: "/core-insights",
    },
    {
      title: "Integrated Delivery",
      to: "/integrated-delivery",
    },
  ];
  return (
    <>
      {tabs.map((item) => (
        <Nav.Link as={NavLink} to={item.to as string} key={item.title} end>
          {item.title}
        </Nav.Link>
      ))}
    </>
  );
}

function LinksAccordion() {
  return (
    <div className="w-100">
      <AccordionContent></AccordionContent>
    </div>
  );
}

export default LinksAccordion;
