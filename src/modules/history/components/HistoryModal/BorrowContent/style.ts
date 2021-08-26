import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BorrowContent__rateMode {
    font-size: $large;
    @include respond-to(xl) {
      font-size: $medium;
    }
    @include respond-to(md) {
      font-size: $regular;
    }
  }
`;

export default staticStyles;
