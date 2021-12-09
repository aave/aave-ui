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

  .PercentBlock__content {
    display: flex;
    align-items: center;
    img {
      margin-right: 4px;
      width: 12px;
      height: 12px;
      @include respond-to(xl) {
        width: 10px;
        height: 10px;
      }
      @include respond-to(lg) {
        width: 8px;
        height: 8px;
      }
      @include respond-to(md) {
        width: 10px;
        height: 10px;
      }
      @include respond-to(sm) {
        width: 12px;
        height: 12px;
      }
    }
  }
`;

export default staticStyles;
