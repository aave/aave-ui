import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .NoData {
    font-size: $large;
    @include respond-to(xl) {
      font-size: $regular;
    }
    @include respond-to(lg) {
      font-size: $medium;
    }
    @include respond-to(md) {
      font-size: $regular;
    }
  }
`;

export default staticStyles;
