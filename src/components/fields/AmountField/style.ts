import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .AmountField {
    width: 335px;
    margin: 0 auto;
    position: relative;
    @include respond-to(lg) {
      width: 260px;
    }
    @include respond-to(md) {
      width: 335px;
    }

    &__disabled {
      .AmountField__wrapper {
        opacity: 0.5;
      }
    }

    &__top-row {
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .Row__title-inner .Row__title,
      .Value .Value__value {
        font-size: $medium;
        @include respond-to(lg) {
          font-size: $small;
        }
        @include respond-to(md) {
          font-size: $medium;
        }
      }
    }

    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      border-radius: $borderRadius;
      transition: $transition;
    }

    .AmountField__input {
      input {
        padding: 15px 5px 14px 0;
        @include respond-to(lg) {
          padding: 12px 5px 12px 0;
        }
        @include respond-to(md) {
          padding: 15px 5px 14px 0;
        }
      }
    }

    &__maxButton {
      font-weight: 600;
      font-size: $medium;
      white-space: nowrap;
      &:hover {
        opacity: 0.7;
      }
      &:active {
        transform: scale(0.9);
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
    }

    &__error-text {
      position: absolute;
      top: calc(100% + 20px);
      width: 100%;
      text-align: center;
      font-size: $medium;
      @include respond-to(lg) {
        font-size: $small;
        top: calc(100% + 18px);
      }
      @include respond-to(md) {
        font-size: $medium;
        top: calc(100% + 20px);
      }
    }

    .Preloader {
      padding: 0;
      .Preloader__dot {
        width: 7px;
        height: 7px;
        margin: 0 4px;
      }
    }
  }
`;

export default staticStyles;
