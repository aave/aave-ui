import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Proposals {
    &__content {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex: 1;
      margin-bottom: 10px;
      @include respond-to(sm) {
        display: block;
      }
    }

    &__content-left-inner {
      width: 360px;
      margin-right: 20px;
      @include respond-to(xl) {
        width: 260px;
      }
      @include respond-to(sm) {
        width: 100%;
      }
    }

    &__content-right-inner {
      display: flex;
      flex-direction: column;
      flex: 1;
      align-self: stretch;
      @include respond-to(sm) {
        flex: unset;
        display: block;
        width: 100%;
      }
    }
    &__contentNoData {
      text-align: center;
      min-height: 25%;
      @include respond-to(sm) {
        min-height: 320px;
      }
    }

    .NoDataPanel {
      @include respond-to(xl) {
        min-height: 20%;
      }
      @include respond-to(sm) {
        min-height: 100%;
      }
      .Caption {
        margin-bottom: 0;
        h2 {
          margin-bottom: 0 !important;
        }
      }
    }

    .Proposals__inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex: 1;
      .ContentWrapperWithTopLine__content {
        flex: 1;
        padding: 20px;
        @include respond-to(xl) {
          padding: 15px 20px;
        }
        @include respond-to(lg) {
          padding: 20px 10px;
        }
        @include respond-to(md) {
          padding: 20px 15px;
        }
        @include respond-to(sm) {
          padding: 0;
        }
      }
      @include respond-to(sm) {
        box-shadow: none;
        overflow: unset;
        .ContentWrapperWithTopLine__top-line {
          display: none;
        }
        .ContentWrapperWithTopLine__content {
          background: transparent;
        }
      }
    }

    &__content-links {
      display: flex;
      align-items: center;
      .Link {
        font-size: $regular;
        margin-left: 20px;
        display: flex;
        align-items: center;
        @include respond-to(xl) {
          font-size: $small;
        }
        img {
          width: 12px;
          height: 12px;
          margin-left: 8px;
        }
      }
    }

    &__mobileLinks-inner {
      display: none;
      @include respond-to(sm) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: -30px 0 30px -10px;
        width: calc(100% + 20px);
        padding: 15px 10px;
      }
      .Link {
        font-size: $regular;
        margin-right: 40px;
        img {
          width: 12px;
          height: 12px;
          margin-left: 8px;
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
    &__mobileLinksWithWarning {
      margin-top: 0;
    }
  }
`;

export default staticStyles;
