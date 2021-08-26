import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .SidePanelCard {
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: $borderRadius;
    @include respond-to(sm) {
      margin-right: 15px;
      &:last-of-type {
        margin-right: 0;
      }
    }
    &:after,
    &:before {
      content: '';
      position: absolute;
      left: -1px;
      right: -1px;
      top: -1px;
      bottom: -1px;
      border-radius: $borderRadius;
      transition: all 0.3s ease;
    }

    &__withGradientBorder {
      &:after,
      &:before {
        background-size: 300% !important;
        animation: animate 4.5s infinite;
      }
      &:before {
        filter: blur(2px);
      }

      .SidePanelCard__inner {
        padding: 15px 10px;
        @include respond-to(lg) {
          padding: 8px 10px;
        }
        @include respond-to(sm) {
          padding: 10px;
        }
      }
    }

    &__inner {
      position: relative;
      z-index: 2;
      padding: 30px 10px 20px;
      width: 180px;
      min-height: 183px;
      border-radius: $borderRadius;
      display: flex;
      flex-direction: column;
      flex: 1;
      @include respond-to(xl) {
        width: 145px;
        min-height: 156px;
      }
      @include respond-to(lg) {
        width: 140px;
        min-height: 143px;
        padding: 20px 10px 12px;
      }
      @include respond-to(sm) {
        width: 150px;
        min-height: 163px;
        padding: 30px 10px 15px;
      }
    }

    .TextWithModal {
      position: absolute;
      z-index: 3;

      .TextWithModal__text {
        display: none;
      }
      .TextWithModal__button {
        right: auto !important;
        top: 15px;
        left: 7px;
        @include respond-to(xl) {
          top: 12px;
          left: 5px;
        }
      }
    }

    &__value-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      margin-bottom: 10px;
    }
    &__title {
      margin-bottom: 1px;
      font-size: $regular;
      font-weight: 300;
      text-align: center;
      @include respond-to(xl) {
        font-size: $medium;
      }
    }
    &__value-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .Value {
        align-items: center;
      }
      .GradientText {
        font-weight: 600;
      }
      .GradientText,
      .Value .Value__value {
        font-size: $extraLarge;
        @include respond-to(xl) {
          font-size: $regular;
        }
      }
    }
    &__value-usd {
      margin-top: 1px;
      font-weight: 300;
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
      @include respond-to(sm) {
        font-size: $small;
      }
    }
  }

  @keyframes animate {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;

export default staticStyles;
