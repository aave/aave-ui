import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .UserEModeInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    opacity: 0.5;
  }
`;

export default staticStyles;
