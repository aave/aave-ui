import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .LiquidityMiningCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    .LiquidityMiningCard__noData {
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $extraSmall;
      }
      @include respond-to(md) {
        font-size: $small;
      }
    }

    &__left {
      @include respond-to(sm) {
        align-items: flex-start;
      }
    }
    &__right {
      @include respond-to(sm) {
        align-items: flex-end;
      }
    }

    .LiquidityMiningCard__tooltip {
      display: block;
      padding: 7px 10px;
      border-radius: $borderRadius;
      box-shadow: $boxShadow;
    }

    .LiquidityMiningCard__valueWithTooltip {
      cursor: pointer;
    }
  }
`;

export default staticStyles;
