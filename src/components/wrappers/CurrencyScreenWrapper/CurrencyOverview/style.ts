import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .CurrencyOverview {
    &__collapsed {
      .CurrencyOverview__content {
        padding: 10px;
      }
      .CurrencyOverview__content-left {
        margin: 0;
        padding: 0 60px;
        @include respond-to(xl) {
          padding: 0 40px;
        }
        @include respond-to(lg) {
          padding: 0 20px;
        }
        @include respond-to(md) {
          padding: 0 10px;
        }
      }
      .CurrencyOverview__row {
        margin: 0;
        align-items: flex-start;
        .Row__content {
          text-align: left;
        }
      }
      .CurrencyOverview__rowWithDoubleValue {
        align-items: flex-start;
      }
      .Value,
      .ValuePercent {
        align-items: flex-start;
      }

      .Row__title-inner .Row__title.Row__title,
      .Value .Value__value,
      .ValuePercent .ValuePercent__value,
      .TextWithModal__text,
      .CurrencyOverview__usageAsCollateral,
      .TokenIcon__dollar {
        @include respond-to(md) {
          font-size: $small;
        }
      }
    }
    &__borrow {
      .CurrencyOverview__inner {
        &:last-of-type {
          justify-content: flex-start;
        }
      }
    }

    &__caption {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      padding: 0 20px;
      @include respond-to(sm) {
        padding: 0;
      }

      .CurrencyOverview__captionLink {
        padding: 10px 0;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        width: 50%;
        @include respond-to(lg) {
          padding: 8px 0;
        }
        @include respond-to(sm) {
          padding: 15px 10px;
          width: 100%;
        }
      }

      p {
        font-size: $regular;
        @include respond-to(xl) {
          font-size: $medium;
        }
        @include respond-to(lg) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $regular;
        }
      }
    }
    &__caption-title {
      text-align: left;
      width: 25%;
      font-weight: 600;
    }

    &__content {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      transition: $transition;
      @include respond-to(xl) {
        padding: 15px 20px;
      }
      @include respond-to(sm) {
        padding: 20px 10px 30px;
        flex-direction: column;
      }
    }

    &__content-left {
      display: flex;
      justify-content: space-between;
      flex: 1;
      margin-right: 80px;
      @include respond-to(xl) {
        margin-right: 50px;
      }
      @include respond-to(lg) {
        margin-right: 30px;
      }
      @include respond-to(md) {
        margin-right: 0;
      }
      @include respond-to(sm) {
        display: block;
      }
    }

    &__inner {
      width: 360px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      @include respond-to(xl) {
        width: 45%;
      }
      @include respond-to(lg) {
        width: 48%;
      }
    }
    &__row {
      margin-bottom: 15px;
      @include respond-to(xl) {
        margin-bottom: 12px;
      }
      @include respond-to(sm) {
        margin-bottom: 15px;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    &__rowWithDoubleValue {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .CurrencyOverview__thirtyDays {
        .ValuePercent__value {
          font-size: $small;
          @include respond-to(xl) {
            font-size: $extraSmall;
          }
        }
      }
    }

    &__usageAsCollateral,
    &__no-data {
      font-size: $large;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $regular;
      }
    }
    &__usageAsCollateral {
      font-weight: 600;
    }

    &__content-right {
      width: 710px;
      border-radius: $borderRadius;
      padding: 0 2px;
      @include respond-to(xl) {
        width: 640px;
      }
      @include respond-to(lg) {
        width: 480px;
      }
      @include respond-to(md) {
        display: none;
      }
      @include respond-to(sm) {
        margin-top: 35px;
        display: block;
        width: 100%;
        height: 165px;
      }
    }

    &__mobileFilterButtons {
      display: none;
      @include respond-to(sm) {
        display: block;
      }
    }

    &__contentNoBorder {
      margin-top: 0 !important;
      border: none !important;
      min-height: 168px;
      @include respond-to(xl) {
        min-height: 138px;
      }
      @include respond-to(lg) {
        min-height: 126px;
      }
      @include respond-to(sm) {
        display: none;
      }
    }
  }
`;

export default staticStyles;
