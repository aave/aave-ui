import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BorrowCompositionBar {
    margin-bottom: 15px;
    &.Row .Row__title {
      margin-bottom: 5px;
    }
  }
`;

export default staticStyles;
