import { IPage } from "powerbi-models";
import { useState } from "react";
import { Dropdown, Form, FormControlProps } from "react-bootstrap";
import { TfiDownload } from "react-icons/tfi";
import styled from "styled-components";

import { PageBookmark } from "../../hooks/useExportPowerBIReport";
import useToggleList from "../../hooks/useToggleList";
import DismissOverlay from "../DismissOverlay";
import DropdownMenu from "../DropdownMenuFullHeight";
import DropdownToggle from "../DropdownToggle";
import ExportOptions from "./ExportOptions";
import SearchSuggestions from "./SearchSuggestions";

type ExportDropdownProps = {
  pages: IPage[];
  reportId: string;
  /**Current bookmark state of all pages in the report */
  defaultBookmarkState?: string;
};

//#region CSS styles
const Menu = styled(DropdownMenu)`
  min-width: 18.75rem;
  padding: 0;
  overflow-y: auto;
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  background: var(--bs-white);
  padding: 0.5rem var(--bs-dropdown-item-padding-x);
`;

const Body = styled.ul`
  overflow-y: auto;
  margin: 0;
  padding: 0;
`;

const Footer = styled.div`
  display: flex;
  background: var(--bs-white);
  border-top: 1px solid var(--bs-dropdown-divider-bg);
  padding-block: 0.75em;
  margin-inline: 1rem;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  bottom: 0;
`;

const Text = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;

const DownloadIcon = styled(TfiDownload)`
  color: var(--bs-primary);
`;
//#endregion

export default function ExportDropdown(props: ExportDropdownProps) {
  const { pages, reportId, defaultBookmarkState } = props;
  // Select the current active page by default
  const activePage = pages.find((page) => page.isActive);

  const [isPageToggled, togglePage] = useToggleList([activePage]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange: FormControlProps["onChange"] = (e) => {
    const query = e.target.value.toLocaleLowerCase();
    setSearchQuery(query);
  };

  const handleDropdownToggle = (show: boolean) => setIsMenuVisible(show);

  const pageBookmark: PageBookmark = {
    state: defaultBookmarkState,
  };

  const pagesToExport = pages
    .filter((page) => isPageToggled(page))
    .map((page) => ({
      pageName: page.name,
    }));

  return (
    <Dropdown
      className="d-flex justify-content-end"
      autoClose="outside"
      show={isMenuVisible}
      onToggle={handleDropdownToggle}
      align="end"
    >
      <DropdownToggle variant="secondary">
        <DownloadIcon className="me-2" role="presentation" />
        Export Pages
      </DropdownToggle>

      <DismissOverlay
        show={isMenuVisible}
        onClick={() => setIsMenuVisible(false)}
      />
      <Menu>
        <Header>
          <Form.Control
            type="search"
            placeholder="Type the name of a page..."
            onChange={handleSearchQueryChange}
          />
        </Header>
        <Body>
          <SearchSuggestions
            query={searchQuery}
            pages={pages}
            toggle={togglePage}
            isToggled={isPageToggled}
          />
        </Body>
        <Footer>
          <Text>Export as</Text>
          <ExportOptions
            reportId={reportId}
            pageBookmark={pageBookmark}
            pagesToExport={pagesToExport}
            setIsMenuVisible={setIsMenuVisible}
          />
        </Footer>
      </Menu>
    </Dropdown>
  );
}
