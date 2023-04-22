import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { StyleConstants } from 'styles/StyleConstants';
import { Nav } from './Nav';
import { DropdownComponent } from '../Dropdown';

export function NavBar(props: any) {
  return (
    <Wrapper>
      <PageWrapper>
        <DropdownComponent {...props} />
      </PageWrapper>
    </Wrapper>
  );
}

const PageWrapper = styled.div`
  width: calc(100% - 1rem);
  margin: 0;
  padding: 0 0.5rem;
  box-sizing: content-box;
  color: ${p => p.theme.text};
  ${media.mobile} {
    padding: 0.5rem;
  }
  ${media.medium} {
    margin: 0 1.5rem;
    width: 100%;
    max-width: 1300px;
  }
`;

const Wrapper = styled.header`
  box-shadow: 0 1px 0 0 ${p => p.theme.borderLight};
  height: ${StyleConstants.NAV_BAR_HEIGHT};
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  background-color: ${p => p.theme.background};
  z-index: 2;

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    background-color: ${p =>
      p.theme.background.replace(
        /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
        'rgba$1,0.75)',
      )};
  }

  ${PageWrapper} {
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
  }
`;
