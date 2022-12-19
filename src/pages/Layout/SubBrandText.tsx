import { Dropdown } from "react-bootstrap";
import styled from "styled-components";
import DropdownToggle from "../../components/DropdownToggle";

const Divider = styled.span`
  font-weight: 300;
  ::before {
    content: "";
    border-right: 1px solid var(--bs-white);
    margin-inline: 1rem;
  }
`;

const Toggle = styled(DropdownToggle)`
  --bs-btn-hover-color: none;
  --bs-btn-hover-border-color: none;
  --bs-btn-hover-bg: none;
  --bs-btn-active-bg: none;
  --bs-btn-bg: none;
  --bs-btn-focus-box-shadow: none;

  border: none;

  font-weight: 200;
  font-size: 1.125rem;
`;

const Menu = styled(Dropdown.Menu)`
  width: 250px;
  border-radius: 0;
  top: 45px !important;
  margin-top: 0 !important;
  padding: 0;
`;

const Item = styled(Dropdown.Item)`
  --bs-dropdown-link-active-bg: none;
  --bs-dropdown-link-hover-bg: none;
  --bs-dropdown-link-active-color: var(--bs-primary);
  --bs-dropdown-link-hover-color: inherit;

  padding: 10px 8px 10px 20px;
  border-left: 4px solid transparent;
  font-weight: 400;

  :hover,
  &.active,
  &:active {
    border-left: 4px solid var(--bs-primary);
    background-color: transparent;
  }
`;

function SubBrandText() {
  const env =
    process.env.REACT_APP_DEPLOY_ENV == "prod"
      ? "dev/"
      : process.env.REACT_APP_DEPLOY_ENV + "/";
  const list = [
    {
      title: "Workplace",
      eventKey: "Workplace",
      url: "https://nucleus.portal.nttdataservices.com/" + env + "dws",
    },
    {
      title: "Application",
      eventKey: "Application",
      url: "https://nucleus.portal.nttdataservices.com/" + env + "appservices",
    },
    {
      title: "Cloud & Hybrid Infrastructure",
      eventKey: "Cloud & Hybrid Infrastructure",
      url: "https://nucleus.portal.nttdataservices.com/" + env + "cloudhybrid/",
    },
    {
      title: "Service Desk",
      eventKey: "Service Desk",
      url:
        "https://nucleus.portal.nttdataservices.com/" +
        env +
        "servicedesk#/posactual",
    },
  ];

  const activeTab = "Cloud & Hybrid Infrastructure";

  return (
    <>
      <span className="d-none d-lg-inline">
        <Divider />
      </span>
      <Dropdown className="d-none d-lg-inline me-5">
        <Toggle>Cloud & Hybrid Infrastructure</Toggle>
        <Menu>
          {list.map((tab) => (
            <Item
              href={tab.url}
              active={tab.title == activeTab}
              key={tab.title}
            >
              {tab.title}
            </Item>
          ))}
        </Menu>
      </Dropdown>
    </>
  );
}

export default SubBrandText;
