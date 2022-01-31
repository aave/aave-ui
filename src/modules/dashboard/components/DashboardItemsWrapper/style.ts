import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DashboardItemsWrapper {
    margin-bottom: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16);
    border-radius: $borderRadius;

    @include respond-to(sm) {
      margin: 0 10px 20px;
      width: calc(100% - 20px);
      box-shadow: unset;
      border-radius: unset;
    }

    &__collapsed,
    &__noData {
      @include respond-to(sm) {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16);
        border-radius: $borderRadius;
      }

      .DashboardItemsWrapper__title--inner {
        @include respond-to(sm) {
          padding: 20px;
        }
      }
    }

    &__collapsed {
      .DashboardItemsWrapper__collapseButton {
        span {
          &:after {
            transform: translate(-50%, -50%);
          }
        }
      }
      .DashboardItemsWrapper__subTitle--inner,
      .DashboardItemsWrapper__content {
        display: none;
      }

      &.DashboardItemsWrapper__withTopMargin {
        margin-top: 20px;
      }
    }

    &__withTopMargin {
      @include respond-to(sm) {
        margin-top: 40px;
      }
    }

    &__title--inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      @include respond-to(lg) {
        padding: 15px;
      }
      @include respond-to(md) {
        padding: 20px;
      }
      @include respond-to(sm) {
        padding: 0;
      }
    }
    &__titleWithClick {
      cursor: pointer;
    }

    &__title {
      font-weight: 600;
      font-size: $large;
      @include respond-to(xl) {
        font-size: $regular;
      }
    }

    &__content {
      margin-top: 10px;
    }

    &__collapseButton {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-weight: 600;
      font-size: $regular;
      transition: $transition;
      @include respond-to(xl) {
        font-size: $medium;
      }

      &:hover {
        opacity: 0.7;
      }

      span {
        display: inline-flex;
        position: relative;
        margin-left: 8px;
        width: 14px;
        height: 2px;
        &:after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(90deg);
          height: 14px;
          width: 2px;
          transition: all 0.3s ease;
        }
      }
    }

    .NoDataPanel {
      min-height: 93px;
      padding: 10px 0 30px;
      @include respond-to(xl) {
        min-height: 91px;
      }
      @include respond-to(sm) {
        padding: 20px 15px;
      }
      .Caption {
        margin-bottom: 0;
        h2 {
          margin-bottom: 0;
        }
      }
    }
  }
`;

export default staticStyles;
