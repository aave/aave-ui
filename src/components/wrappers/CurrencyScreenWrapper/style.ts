import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .CurrencyScreenWrapper {
    margin-top: 40px !important;

    @include respond-to(sm) {
      margin-top: 0 !important;
      padding-bottom: 0 !important;
      .ScreenWrapper__mobile-bottomBorder {
        display: none;
      }
    }

    .CurrencyScreenWrapper__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin: 30px 0 10px;
      padding: 15px 0;
      @include respond-to(xl) {
        margin: 20px 0 10px;
      }
      @include respond-to(sm) {
        margin: 40px 0;
        background: transparent !important;
        box-shadow: none !important;
        display: block;
      }
    }

    &__mobileInner {
      display: none;
      @include respond-to(sm) {
        display: block;
        position: relative;
        left: -10px;
        width: calc(100% + 20px);
      }
    }

    .NoDataPanel {
      @include respond-to(sm) {
        min-height: unset;
      }
    }

    .DepositAmount__poolLink--button {
      .Button__wrapper {
        flex-direction: row-reverse;
        img {
          margin-left: 10px;
          width: 14px;
          height: 14px;
          @include respond-to(xl) {
            width: 12px;
            height: 12px;
          }
          @include respond-to(sm) {
            width: 16px;
            height: 16px;
            margin-left: 15px;
          }
        }
      }
    }
  }

  @media (max-height: 750px) {
    .CurrencyScreenWrapper {
      .CurrencyScreenWrapper__content {
        display: block;
      }
    }
  }
`;

export default staticStyles;
