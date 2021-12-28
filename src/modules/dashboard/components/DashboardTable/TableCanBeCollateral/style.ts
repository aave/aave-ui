import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableCanBeCollateralWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    @include respond-to(sm) {
      justify-content: flex-end;
    }

    .TextWithModal__text,
    .TableCanBeCollateral {
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

    .TableCanBeCollateral {
      &__image {
        width: 12px;
        height: 8px;
        @include respond-to(xl) {
          width: 11px;
          height: 6px;
        }
        @include respond-to(sm) {
          width: 12px;
          height: 8px;
        }
      }
    }
  }
`;

export default staticStyles;
