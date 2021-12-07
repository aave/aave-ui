import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DashboardTopPanel {
    margin-bottom: 20px;
    @include respond-to(sm) {
      margin-bottom: 0;
      display: block !important;
      border-radius: 0 !important;
    }

    .TopPanelWrapper__button {
      font-weight: 400 !important;
      top: 11px !important;
      right: 20px !important;
      font-size: $regular !important;
      @include respond-to(xl) {
        font-size: $medium !important;
      }
      @include respond-to(sm) {
        right: 10px !important;
      }
    }

    &__topContent {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      height: 42px;
      @include respond-to(xl) {
        height: 38px;
      }
      @include respond-to(sm) {
        padding: 10px;
        height: 38px;
      }
    }

    &__topHiddenDiv {
      position: relative;
      z-index: -1;
      p {
        font-size: $regular;
        opacity: 0;
        @include respond-to(xl) {
          font-size: $medium;
        }
      }
    }

    &__title {
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $medium;
      }
    }

    &__content {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      min-height: 180px;
      @include respond-to(xl) {
        min-height: 168px;
      }
      @include respond-to(lg) {
        padding: 20px 0;
      }
      @include respond-to(md) {
        padding: 30px;
        min-height: 252px;
      }
      @include respond-to(sm) {
        min-height: unset;
        padding: 20px 10px;
        display: block;
      }
    }
    &__contentCollapse {
      padding: 20px 0;
      min-height: 88px;
      @include respond-to(xl) {
        min-height: 84px;
      }
      @include respond-to(md) {
        .DashboardTopPanel__sections {
          display: flex;
        }
      }

      @include respond-to(sm) {
        padding: 20px 10px;
        min-height: unset;
        .DashboardTopPanel__sections {
          display: block;
        }
      }
    }

    &__sections {
      flex: 1;
      display: flex;
      justify-content: space-between;
      @include respond-to(md) {
        display: block;
      }
    }
  }
`;

export default staticStyles;
