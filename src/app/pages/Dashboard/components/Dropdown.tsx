import styled from 'styled-components/macro';

export function DropdownComponent(props) {
  const { location, locations, locationCallback } = props;

  function DropDownItem(locationItem) {
    return (
      <DropdownItem
        value={locationItem.location_id}
        onClick={() => {
          locationCallback(locationItem.location_id);
        }}
      >
        {locationItem.name}
      </DropdownItem>
    );
  }
  return (
    <Dropdown
      value={location}
      onChange={e => {
        locationCallback(e.target.value);
      }}
    >
      {locations &&
        locations
          .filter(locationItem => locationItem.is_active === true)
          .map(locationItem => (
            <DropDownItem key={locationItem.location_id} {...locationItem} />
          ))}
    </Dropdown>
  );
}

const Dropdown = styled.select`
  position: relative;
  display: inline-block;
  min-width: 15rem;
  max-width: 100%;
  max-height: 3rem;
  padding: 0.5rem;
  border: none;
  background-color: ${p => p.theme.background};
  color: ${p => p.theme.text};
  font-size: 1rem;
  border: 1px solid ${p => p.theme.border};
  border-radius: 0.5rem;
`;

const DropdownItem = styled.option`
  display: block;
  width: 100%;
  height: 100%;
  background-color: ${p => p.theme.background};
  color: ${p => p.theme.text};
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${p => p.theme.border};
  }
`;

const DropdownButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${p => p.theme.background};
  color: ${p => p.theme.text};
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${p => p.theme.border};
  }
`;
