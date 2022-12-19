import { Dropdown } from "react-bootstrap";
import styled from "styled-components";
import { ReactComponent as BellIcon } from "../../assets/bell.svg";
import { ReactComponent as EnvelopePic } from "../../assets/envelope.svg";
import { ReactComponent as EyePic } from "../../assets/eye.svg";
import NavMenuButton from "./NavMenuButton";

const DropdownHeader = styled(Dropdown.Header)`
  letter-spacing: 0.03rem;
  max-width: 100%;
  h5 {
    font-size: 1rem !important;
    display: inline-block;
    color: var(--bs-secondary) !important;
  }
`;

const NotificationLink = styled.a`
  text-decoration: none;
  float: right;
  &:hover {
    color: var(--bs-secondary-blue);
    text-decoration: underline;
  }
  svg {
    color: var(--bs-primary);
    stroke: var(--bs-primary);
    margin-right: 5px;
  }
  :hover svg {
    stroke: var(--bs-secondary-blue);
  }
`;

const NotificationList = styled.div`
  display: flex !important;
  white-space: pre-wrap !important;
  width: 18.75rem !important;
  overflow: hidden;
  max-width: 25ch;
  text-overflow: ellipsis;
  padding: 4px 8px;
`;

function EnvelopeIcon_List() {
  return (
    <>
      <div>
        <EnvelopePic />
      </div>
      <div className="ps-1">
        The Nucleus Command Center Portal is scheduled to go live on 11/01/2022
      </div>
    </>
  );
}

function NotificationIcon() {
  return (
    <NavMenuButton Icon={BellIcon}>
      <DropdownHeader>
        <h5 className="mb-0 me-1 mt-1">Notifications</h5>
        <NotificationLink href="https://nucleus.portal.nttdataservices.com/notification">
          <EyePic />
          View All
        </NotificationLink>
      </DropdownHeader>
      <NotificationList>
        <EnvelopeIcon_List />
      </NotificationList>
    </NavMenuButton>
  );
}

export default NotificationIcon;
