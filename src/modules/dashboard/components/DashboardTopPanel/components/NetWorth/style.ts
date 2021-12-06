import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Row.NetWorth {
    font-size: $regular !important;
    align-items: center !important;
    @include respond-to(xl) {
      font-size: $medium !important;
    }
    .Row__title {
      padding-right: 20px;
      @include respond-to(sm) {
        padding-right: 10px;
      }
    }

    .Value__value {
      font-weight: 500;
      font-size: $large;
      @include respond-to(xl) {
        font-size: $medium;
      }
      .ValueWithSmallDecimals {
        font-size: $large;
        margin-left: 1px;
        opacity: 0.9;
        @include respond-to(xl) {
          font-size: $medium;
        }
      }
    }

    &.NetWorth__column {
      .Row__content {
        justify-content: flex-start;
        .Value {
          align-items: flex-start;
          .Value__value {
            font-size: $large;
            @include respond-to(xl) {
              font-size: $regular;
            }
            .ValueWithSmallDecimals {
              font-size: $small;
            }
          }
        }
      }
    }
  }
`;

export default staticStyles;
