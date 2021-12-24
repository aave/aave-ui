import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DashboardTable {
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16);
    border-radius: $borderRadius;

    &__collapsed {
      .DashboardTable__collapseButton {
        span {
          &:after {
            transform: translate(-50%, -50%) rotate(90deg);
          }
        }
      }
      .DashboardTable__subTitle--inner,
      .DashboardTable__content {
        display: none;
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
    }

    &__title,
    .AvailableCapsHelpModal .TextWithModal__text {
      font-weight: 600;
      font-size: $large;
      @include respond-to(xl) {
        font-size: $regular;
      }
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
          transform: translate(-50%, -50%);
          height: 14px;
          width: 2px;
          transition: all 0.3s ease;
        }
      }
    }
  }
`;

export default staticStyles;
