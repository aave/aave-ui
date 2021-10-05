import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/screen-size';
  @import 'src/_mixins/vars';

  .LiquidityMiningAPYLine {
    position: relative;
    margin-top: 3px;
    border-radius: $borderRadius;
    padding: 3px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    @include respond-to(xl) {
      margin-top: 3px;
      padding: 1px 5px;
    }

    &__withTooltip {
      cursor: pointer;
    }

    &__tribe {
      display: flex;
      align-items: center;
      justify-content: center;
      strong {
        margin: 0 3px;
        @include respond-to(lg) {
          position: relative;
          top: 1px;
        }
        @include respond-to(md) {
          top: 0;
        }
      }
      img {
        width: 12px;
        height: 12px;
        position: relative;
        @include respond-to(xl) {
          width: 10px;
          height: 10px;
        }
      }
    }

    .ValuePercent .ValuePercent__value,
    &__title {
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

    .ValuePercent {
      margin: 0 3px;
    }

    .TokenIcon {
      &__image {
        margin-right: 0;
      }
    }

    .LiquidityMiningAPYLine__tooltip {
      max-width: 550px;
      display: block;
      padding: 7px 10px;
      border-radius: $borderRadius;
      box-shadow: $boxShadow;
      @include respond-to(xl) {
        max-width: 380px;
      }
    }

    &__tooltip--content {
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
    }
  }
`;

export default staticStyles;
