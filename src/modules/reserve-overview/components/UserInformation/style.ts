import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .UserInformation {
    position: relative;
    @include respond-to(sm) {
      padding: 0 10px;
      width: calc(100% + 20px);
      left: -10px;
      margin-bottom: 30px;
    }

    &__mobile-caption {
      display: none;
      @include respond-to(sm) {
        display: block;
        padding: 20px;
        width: 100%;
        text-align: center;
      }
      h2 {
        font-weight: 400;
        font-size: $regular;
      }
    }

    &__content-wrapper {
      position: relative;
      width: 100%;
      @include respond-to(sm) {
        display: none;
      }
    }
    &__contentWrapperVisible {
      @include respond-to(sm) {
        display: block;
      }
    }

    &__content-inner {
      position: relative;
      width: 100%;
      @include respond-to(md) {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      @include respond-to(sm) {
        flex-direction: column;
        padding-bottom: 20px;
      }
    }

    &__info-wrapper {
      padding: 20px;
      margin-bottom: 15px;
      position: relative;
      box-shadow: $boxShadow;
      @include respond-to(xl) {
        padding: 15px;
      }
      @include respond-to(lg) {
        margin-bottom: 10px;
        padding: 10px;
      }
      @include respond-to(md) {
        margin-bottom: 0;
        padding: 15px;
        width: 49%;
      }
      @include respond-to(sm) {
        width: 100%;
        background: transparent !important;
        box-shadow: none;
        margin-bottom: 15px;
        padding: 0 0 15px;
        &:nth-of-type(2) {
          padding-bottom: 0;
          &:after {
            display: none;
          }
        }
      }
      &:after {
        content: '';
        position: absolute;
        left: -10px;
        bottom: 0;
        width: calc(100% + 20px);
        height: 1px;
        display: none;
        @include respond-to(sm) {
          display: block;
        }
      }

      h3 {
        margin-bottom: 20px;
        font-weight: 600;
        font-size: $large;
        display: flex;
        align-items: center;
        justify-content: space-between;
        @include respond-to(xl) {
          font-size: $medium;
          margin-bottom: 15px;
        }
        @include respond-to(lg) {
          font-size: $small;
          margin-bottom: 10px;
        }
        @include respond-to(md) {
          font-size: $medium;
        }
        @include respond-to(sm) {
          font-size: $regular;
        }
      }
    }

    &__caption-buttons {
      a {
        margin-right: 5px;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }

    .UserInformation__button {
      width: 90px;
      min-height: 32px;
      font-size: $medium;
      @include respond-to(xl) {
        width: 70px;
        min-height: 24px;
        font-size: $small;
      }
    }
    &__button-noBorder {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 400;
    }
    .UserInformation__buttonNoBorderDisabled {
      opacity: 0.5 !important;
      cursor: not-allowed;
    }

    &__info-inner {
      @include respond-to(sm) {
        padding-left: 10px;
      }
    }

    &__row {
      display: flex;
      justify-content: space-between;
      align-self: center;
    }

    .Value {
      .Value__value {
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
    }
    .ValuePercent {
      .ValuePercent__value {
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
    }

    .UserInformation__swiper {
      .Switcher__label {
        font-size: $large;
        @include respond-to(xl) {
          font-size: $medium;
        }
        @include respond-to(lg) {
          font-size: $small;
        }
        @include respond-to(md) {
          font-size: $medium;
        }
      }
    }

    &__noData {
      font-size: $large;
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

    .GradientPlusButton.GradientPlusButton {
      width: 26px;
      height: 26px;
      span {
        width: 13px;
      }
    }
    .UserInformation__GradientPlusButton.GradientPlusButton {
      right: -10px;
    }

    &__borrow-table {
      position: relative;
      @include respond-to(md) {
        padding-top: 10px;
      }
      @include respond-to(sm) {
        padding: 20px 10px 0;
        left: -10px;
        width: calc(100% + 20px);
      }
    }
  }
`;

export default staticStyles;
