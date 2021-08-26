import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableValueCol__value {
    align-items: center;
    .Value__value {
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        font-size: $small;
      }
    }
    .SubValue {
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
    }
  }
`;

export default staticStyles;
