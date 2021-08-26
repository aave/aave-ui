import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DepositBorrowTopPanel {
    &__topPanel {
      margin-bottom: 30px;
      @include respond-to(xl) {
        margin-bottom: 20px;
      }
      @include respond-to(lg) {
        margin-bottom: 10px;
      }
      @include respond-to(md) {
        margin-bottom: 30px;
      }
    }
    &__topPanelTransparent {
      background: transparent !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }

    &__topPanel-caption {
      display: flex;
      justify-content: space-between;
      p {
        width: calc(50% - 10px);
        font-size: $regular;
        display: flex;
        flex-direction: column;
        border-top-right-radius: $borderRadius;
        border-top-left-radius: $borderRadius;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(lg) {
          font-size: $extraSmall;
          &:first-of-type {
            width: 38%;
          }
          &:last-of-type {
            width: 60%;
          }
        }
        @include respond-to(md) {
          font-size: $small;
        }
        i {
          font-style: normal;
          display: inline-block;
          padding: 10px 0 10px 20px;
          @include respond-to(md) {
            padding: 10px 0 10px 10px;
          }
        }

        &.DepositBorrowTopPanel__topPanelCaptionFull {
          width: 100%;
        }
      }
    }

    &__topPanel-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    &__topPanelInfoCollapse {
      .DepositBorrowTopPanel__topPanel-inner {
        padding: 10px 20px;
        @include respond-to(md) {
          padding: 10px;
        }
      }
      .DepositBorrowTopPanel__topPanel-depositValues {
        flex-direction: row;
      }
    }
    &__topPanelNoUser {
      padding: 20px;
    }

    &__topPanel-inner {
      width: calc(50% - 10px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom-right-radius: $borderRadius;
      border-bottom-left-radius: $borderRadius;
      transition: $transition;
      padding: 25px 20px;
      @include respond-to(lg) {
        &:first-of-type {
          width: 38%;
        }
        &:last-of-type {
          width: 60%;
        }
      }
      @include respond-to(md) {
        align-items: flex-start;
        flex-direction: column;
        padding: 20px 10px;
      }
    }

    &__topPanelInnerFull {
      width: 100% !important;
    }

    &__topPanel-values {
      display: flex;
      flex-direction: column;
      width: 100%;
      .Row {
        margin-right: 60px;
        @include respond-to(xl) {
          margin-right: 40px;
        }
      }
    }
    &__topPanelValuesCollapse {
      flex-direction: row;
    }
    &__topPanel-valuesInner {
      display: flex;
      margin-bottom: 15px;
      @include respond-to(xl) {
        margin-bottom: 10px;
      }
      &:last-of-type {
        align-items: center;
      }
      .Row {
        width: 50%;
        margin-right: 0;
      }
    }
    &__topPanelValuesInnerCollapse {
      margin-bottom: 0;
      flex-wrap: wrap;
      .Row {
        width: auto;
        margin-right: 60px;
        @include respond-to(xl) {
          margin-right: 40px;
        }
      }
      &:last-of-type {
        flex: 1;
        align-items: center;
        justify-content: flex-end;
        @include respond-to(md) {
          display: none;
        }
      }
    }
    .DepositBorrowTopPanel__buttonCollapse {
      width: 120px;
      min-height: 36px;
      font-size: $medium;
      @include respond-to(xl) {
        width: 70px;
        min-height: 24px;
        font-size: $extraSmall;
      }
    }

    &__topPanel-bars {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include respond-to(md) {
        margin-top: 30px;
        width: 100%;
        max-width: 320px;
      }
      .CircleCompositionBar {
        margin-left: 35px;
        @include respond-to(xl) {
          margin-left: 25px;
        }
        @include respond-to(md) {
          margin-left: 0;
        }

        &:first-of-type {
          margin-left: 0;
        }
      }
    }

    .Row.Row__column {
      .Row__title-inner {
        text-align: left;
      }
      .Row__content,
      .Value {
        align-items: flex-start;
        justify-content: flex-start;
      }
      .Row__content {
        text-align: left;
      }
    }
    .HealthFactor__column {
      text-align: left;
      .HealthFactor__percent {
        justify-content: flex-start;
      }
      .HealthFactor__no-value {
        text-align: left;
        justify-content: flex-start;
      }
    }
  }
`;

export default staticStyles;
