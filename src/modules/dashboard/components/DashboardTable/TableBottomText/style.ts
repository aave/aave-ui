import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableBottomText {
    font-size: $regular;
    @include respond-to(xl) {
      font-size: $medium;
    }
    @include respond-to(lg) {
      font-size: $small;
    }
    @include respond-to(md) {
      font-size: $medium;
    }
    @include respond-to(sm) {
      font-size: $regular;
      text-align: center;
    }
    a {
      font-weight: 500;
    }
  }
`;

export default staticStyles;
