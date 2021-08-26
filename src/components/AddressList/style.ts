import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .AddressList {
    &__address {
      display: flex !important;
      align-items: center;
      justify-content: space-between;
      border-radius: $borderRadius;
      box-shadow: $boxShadow;
      margin: 8px 0;
      padding: 15px 12px;
      border: 1px solid transparent;
      min-width: 350px;
      @include respond-to(xl) {
        padding: 8px 10px;
        min-width: 310px;
      }
      @include respond-to(sm) {
        padding: 10px 12px;
      }
      p {
        font-size: $regular;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $medium;
        }
        span {
          margin-left: 5px;
        }
      }
      .AddressList__address-text {
        max-width: 175px;
        overflow: hidden;
        white-space: nowrap;
        @include respond-to(xl) {
          max-width: 150px;
        }
      }
    }
    &__addressActive {
      cursor: default;
      box-shadow: none !important;
      border: 1px solid transparent !important;
    }

    .Preloader {
      padding: 0;
      align-items: flex-end;
      background: transparent;
      .Preloader__dot {
        width: 8px;
        height: 8px;
        margin: 2px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .AddressList__withPagination {
    min-height: 165px;
  }
`;

export default staticStyles;
