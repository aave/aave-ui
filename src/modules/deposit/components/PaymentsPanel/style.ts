import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .PaymentsPanel {
    padding: 10px 7px;
    border-radius: $borderRadius;
    margin-top: 20px;
    @include respond-to(xl) {
      padding: 10px;
      margin-top: 10px;
    }
    @include respond-to(sm) {
      background: transparent !important;
      width: 100%;
      border: none !important;
      padding: 0;
      margin-top: 30px;
      text-align: center;
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__text {
      font-size: $regular;
      flex: 1;
      margin-bottom: 10px;
      text-align: center;
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
        max-width: 300px;
        text-align: center;
        margin: 0 auto 15px;
      }
      .Link {
        display: inline;
        font-weight: 600;
      }
    }

    &__buttons {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin: 0 auto;
    }
    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90px;
      height: 26px;
      padding: 4px 6px;
      box-shadow: $boxShadow;
      border-radius: $borderRadius;
      margin: 0 7px 10px;
      &:active {
        img {
          transform: scale(0.95);
        }
      }
      @include respond-to(sm) {
        width: 140px;
        height: 40px;
        padding: 7px 10px;
        margin: 0 15px 20px;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    &__button-image {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        transition: $transition;
      }
    }

    &__mobileTop-line {
      display: none;
      @include respond-to(sm) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
        font-size: $small;
      }
      p {
        position: relative;
        &:before,
        &:after {
          content: '';
          position: absolute;
          top: 8px;
          height: 1px;
          width: 40px;
        }
        &:before {
          right: calc(100% + 10px);
        }
        &:after {
          left: calc(100% + 10px);
        }
      }
    }
    &__mobileGoBack {
      display: none;
      @include respond-to(sm) {
        display: block;
      }
    }
  }
`;

export default staticStyles;
