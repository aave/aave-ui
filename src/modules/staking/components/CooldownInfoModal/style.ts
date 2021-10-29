import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .CooldownInfoModal {
    max-width: 650px !important;
    padding: 50px 20px 55px !important;
    font-size: $large;
    @include respond-to(xl) {
      max-width: 620px !important;
      padding: 50px 40px 40px !important;
      font-size: $regular;
    }
    @include respond-to(lg) {
      max-width: 550px !important;
      padding: 40px 20px !important;
      font-size: $medium;
    }
    @include respond-to(md) {
      max-width: 620px !important;
      padding: 50px 40px 40px !important;
      font-size: $regular;
    }
    @include respond-to(sm) {
      padding: 40px 10px !important;
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .Caption,
    &__infoText,
    &__checkboxInner {
      max-width: 440px;
      margin-bottom: 30px;
      @include respond-to(xl) {
        max-width: 390px;
        margin-bottom: 20px;
      }
      @include respond-to(lg) {
        max-width: 350px;
      }
      @include respond-to(md) {
        max-width: 390px;
      }
    }

    &__infoPanel {
      padding: 16px 16px 15px 14px;
      margin-bottom: 20px;
      max-width: 510px;
      text-align: left;
      display: flex;
      align-items: flex-start;
      @include respond-to(xl) {
        max-width: 440px;
      }

      img {
        width: 16px;
        height: 14px;
        margin-right: 10px;
      }

      p {
        font-size: $medium;
        @include respond-to(xl) {
          font-size: $small;
        }
      }
    }

    &__graphs {
      width: 100%;
      max-width: 500px;
      margin-bottom: 50px;
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $small;
      }
    }
    &__graphsText {
      display: flex;
      align-items: flex-end;
      width: 100%;
      margin-bottom: 10px;
    }
    &__graphTopText {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      span {
        display: block;
        font-size: $extraSmall;
        margin-bottom: 5px;
      }
    }

    &__graphInner {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__graph {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      strong {
        margin-top: 10px;
        white-space: nowrap;
      }
    }
    &__graphLine {
      width: 100%;
      height: 5px;
      position: relative;
      &:after,
      &:before {
        content: '';
        position: absolute;
        height: 20px;
        width: 2px;
        top: 50%;
        transform: translateY(-50%);
      }
      &:after {
        left: 0;
      }
      &:before {
        right: 0;
      }
    }

    &__checkboxInner {
      text-align: left;

      .CheckBoxField__label {
        align-items: flex-start;
        font-weight: 400;
        span {
          min-width: 16px;
          width: 16px;
          height: 16px;
          top: 2px;
        }
      }
    }

    .DefaultButton {
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $small;
        width: 160px;
        min-height: 40px;
      }
      @include respond-to(lg) {
        width: 100px;
        min-height: 28px;
        font-size: $extraSmall;
      }
      @include respond-to(md) {
        font-size: $small;
        width: 160px;
        min-height: 40px;
      }
    }
  }

  @media only screen and (max-height: 610px) and (min-width: 768px) {
    .CooldownInfoModal.ReactModal__Content.ReactModal__Content--after-open {
      position: absolute !important;
      top: 5% !important;
      bottom: 5% !important;
      display: block;
      overflow: auto !important;
    }
  }
`;

export default staticStyles;
