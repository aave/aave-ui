import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableCol {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    min-width: 110px;
    overflow: hidden;
    padding: 2px;
    @include respond-to(md) {
      padding: 0;
    }
  }
`;

export default staticStyles;
