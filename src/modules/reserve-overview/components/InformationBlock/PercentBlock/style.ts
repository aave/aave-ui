import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .PercentBlock__no-value,
  .PercentBlock__value .ValuePercent__value {
    font-size: $regular;
    @include respond-to(xl) {
      font-size: $small;
    }
    @include respond-to(lg) {
      font-size: $extraSmall;
    }
    @include respond-to(md) {
      font-size: $small;
    }
    @include respond-to(sm) {
      font-size: $regular;
    }
  }
`;

export default staticStyles;
