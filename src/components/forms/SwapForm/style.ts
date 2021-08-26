import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .SwapForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include respond-to(sm) {
      padding-top: 30px;
      overflow: hidden;
    }

    .SwapForm__caption {
      max-width: 615px;
      margin-right: auto;
      margin-left: auto;
      @include respond-to(xl) {
        max-width: 550px;
      }
    }

    &__inputs-wrapper {
      display: flex;
      align-items: flex-end;
      margin-bottom: 40px;
      @include respond-to(xl) {
        margin-bottom: 35px;
      }
      @include respond-to(lg) {
        margin-bottom: 30px;
      }
      @include respond-to(md) {
        margin-bottom: 0;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
    &__swap-icon {
      width: 50px;
      height: 50px;
      @include respond-to(lg) {
        width: 40px;
        height: 40px;
      }
      @include respond-to(md) {
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
        transform: rotate(90deg);
      }
    }

    &__slippage-percentages {
      display: none;
      width: 100%;
      position: absolute;
      left: 0;
      top: 100%;
    }
    &__slippageVisible {
      display: block;
    }
    &__slippage-percentagesInner {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 5px 15px;
      @include respond-to(xl) {
        padding: 4px 10px;
      }
      @include respond-to(md) {
        padding: 5px 15px;
      }
    }

    &__slippage-percent {
      width: 60px;
      height: 40px;
      font-size: $medium;
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: $borderRadius;
      @include respond-to(xl) {
        width: 40px;
        height: 24px;
        font-size: $small;
      }
      @include respond-to(md) {
        width: 60px;
        height: 40px;
        font-size: $medium;
      }
      &:disabled {
        box-shadow: $boxShadow;
      }
    }

    .SwapForm__slippage-field {
      width: 70px;
      border-radius: $borderRadius;
      @include respond-to(xl) {
        width: 65px;
      }
      @include respond-to(md) {
        width: 70px;
      }
      input {
        width: 100%;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: $medium;
        @include respond-to(xl) {
          font-size: $small;
          height: 22px;
        }
        @include respond-to(md) {
          font-size: $medium;
          height: 38px;
        }
      }
    }

    &__error-inner {
      width: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 20px;
      font-size: $medium;
      min-height: 25px;
      @include respond-to(xl) {
        font-size: $extraSmall;
        min-height: 20px;
        margin-bottom: 15px;
      }
      @include respond-to(lg) {
        margin-bottom: 10px;
      }
      @include respond-to(md) {
        font-size: $medium;
        min-height: 25px;
        margin-bottom: 30px;
      }
      p {
        text-align: center;
      }
    }

    &__bottom-info {
      min-width: 310px;
      @include respond-to(xl) {
        min-width: 240px;
      }
      @include respond-to(md) {
        min-width: 310px;
      }
    }

    &__bottom-item {
      padding: 6px 15px 5px;
      margin: 0 auto 2px;
      font-size: $regular;
      width: 100%;
      position: relative;
      @include respond-to(xl) {
        padding: 5px 10px 4px;
        font-size: $small;
      }
      @include respond-to(md) {
        padding: 6px 15px 5px;
        font-size: $regular;
      }
    }

    &__bottom-itemContent {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      cursor: default;
      font-size: $regular;
      transition: none;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $regular;
      }
    }
    &__bottomItemWithClick {
      cursor: pointer;
    }
    &__bottom-itemWithClickSlippage {
      z-index: 3;
    }

    &__bottom-title {
      display: flex;
      align-items: center;
      img {
        width: 12px;
        height: 12px;
        margin-left: 5px;
        @include respond-to(xl) {
          width: 10px;
          height: 10px;
        }
      }
    }

    &__bottom-values {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      .HealthFactor {
        margin: 0;
      }

      .ValuePercent {
        .ValuePercent__value {
          font-weight: 400;
          font-size: $regular;
          @include respond-to(xl) {
            font-size: $small;
          }
          @include respond-to(md) {
            font-size: $regular;
          }
        }
      }

      img {
        width: 12px;
        height: 12px;
        margin: 0 5px;
        @include respond-to(xl) {
          width: 10px;
          height: 10px;
        }
        @include respond-to(md) {
          width: 12px;
          height: 12px;
        }
      }
    }

    &__fees {
      display: none;
      width: 100%;
      position: absolute;
      left: 0;
      top: 100%;
      padding: 5px 15px;
      @include respond-to(xl) {
        padding: 4px 10px;
      }
      @include respond-to(md) {
        padding: 5px 15px;
      }

      .Row .Row__title,
      .ValuePercent .ValuePercent__value {
        font-size: $medium;
        @include respond-to(xl) {
          font-size: $extraSmall;
        }
        @include respond-to(md) {
          font-size: $medium;
        }
      }

      .ValuePercent {
        .ValuePercent__value {
          font-weight: 400;
        }
      }
    }
    &__feesVisible {
      display: block;
    }

    &__button-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 50px;
      @include respond-to(sm) {
        margin-bottom: 40px;
      }
    }
  }
`;

export default staticStyles;
