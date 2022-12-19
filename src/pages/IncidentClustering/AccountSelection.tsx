import { Dropdown } from "react-bootstrap";
import styled from "styled-components";
import DropdownMenu from "../../components/DropdownMenu";
import DropdownToggle from "../../components/DropdownToggle";
import Selections from "../../packages/qlik-react/components/Selections";

const QLIK_ACCOUNT_FIELD_NAME = "Account";

const Button = styled(DropdownToggle)`
  border: none;
  font-weight: 500;
`;

const StyledSelections = styled(Selections)`
  height: 332px;
  width: 280px;
`;

function AccountSelection() {
  return (
    <Dropdown>
      <Button variant="secondary">Accounts</Button>
      <DropdownMenu>
        <StyledSelections fieldIdentifier={QLIK_ACCOUNT_FIELD_NAME} />
      </DropdownMenu>
    </Dropdown>
  );
}

export default AccountSelection;
