import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Row.APYLine {
    margin-bottom: 8px;
    @include respond-to(lg) {
      margin-bottom: 4px;
    }
    @include respond-to(md) {
      margin-bottom: 8px;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
    &.Row .Row__title,
    .APYLine__percent .ValuePercent__value {
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
  }
`;

export default staticStyles;
