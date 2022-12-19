import { IPage } from "powerbi-models";
import { Dropdown, Form } from "react-bootstrap";
import styled, { css } from "styled-components";

type SearchSuggestionsProps = {
  query: string;
  pages: IPage[];
  toggle: (p: IPage) => void;
  isToggled: (p: IPage) => boolean;
};

const CenteredListItem = styled.li`
  text-align: center;
  overflow: hidden;
  list-style: none;
  font-weight: 500;
  min-height: 10rem;
  display: grid;
  place-items: center;
  margin-inline: 1rem;
`;

const Check = styled(Form.Check)`
  > input {
    margin-right: 1rem;
  }
  > label {
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

const activeItemStyle = css`
  color: var(--bs-dropdown-link-hover-color);
  background-color: var(--bs-dropdown-link-hover-bg);
`;

const Item = styled(Dropdown.Item)<ItemProps>`
  ${(props) => props.$isChecked && activeItemStyle}
  &:active {
    ${activeItemStyle}
  }
`;

type ItemProps = {
  $isChecked?: boolean;
};

function SearchSuggestions(props: SearchSuggestionsProps) {
  const { query, pages, isToggled, toggle } = props;
  const searchResults = pages.filter((page) =>
    page.displayName.toLocaleLowerCase().includes(query)
  );
  const hasSearchResults = searchResults && searchResults.length > 0;

  return (
    <>
      {hasSearchResults ? (
        searchResults.map((page) => (
          <Item forwardedAs="li" key={page.name} $isChecked={isToggled(page)}>
            <Check
              type="checkbox"
              id={`export-${page.name}`}
              label={page.displayName}
              checked={isToggled(page)}
              onChange={() => toggle(page)}
            />
          </Item>
        ))
      ) : (
        <CenteredListItem>
          <p className="fs-6 text-break">No Results for &quot;{query}&quot;</p>
        </CenteredListItem>
      )}
    </>
  );
}

export default SearchSuggestions;
