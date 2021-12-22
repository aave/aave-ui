import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableUsageAsCollateralWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    @include respond-to(sm) {
      justify-content: flex-end;
    }

    .TextWithModal__text,
    .TableUsageAsCollateral {
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
      }
    }

    .TableUsageAsCollateral {
      font-weight: 600;
    }
  }
`;

export default staticStyles;
