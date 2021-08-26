import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .FreezedWarning {
    font-size: $regular;
    font-weight: 300;
    @include respond-to(xl) {
      font-size: $medium;
    }
    @include respond-to(lg) {
      font-size: $small;
    }
    @include respond-to(sm) {
      font-size: $extraSmall;
    }
    a {
      font-weight: 600;
    }
  }
`;

export default staticStyles;
