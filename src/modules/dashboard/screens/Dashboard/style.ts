import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Dashboard {
    display: block;

    &__fullHeight {
      display: flex;
      flex-direction: column;
      flex: 1;
      @include respond-to(lg) {
        display: block;
      }
    }

    &__switcher-inner {
      margin: 20px 0;
      display: none;
      @include respond-to(lg) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .Dashboard__switcher {
      @include respond-to(sm) {
        margin: 0 auto;
      }
    }

    &__top--line {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 40px 0 15px;
      @include respond-to(xl) {
        margin: 35px 0 10px;
      }
      @include respond-to(sm) {
        display: block;
        margin: 0;
      }
    }

    .Row.Dashboard__mobileRow-center {
      align-items: center;
    }
    &__mobileRow-content {
      display: flex;
      align-items: center;
    }
    .Dashboard__mobileButton {
      width: 80px;
      min-height: 32px;
      font-size: $small;
      margin-left: 10px;
    }
  }

  @media (max-height: 750px) {
    .Dashboard {
      display: block;
    }
  }
`;

export default staticStyles;
