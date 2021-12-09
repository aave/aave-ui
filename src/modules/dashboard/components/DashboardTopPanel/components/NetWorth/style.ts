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

    .Value__value,
    .TokenIcon__dollar {
      font-weight: 500;
      font-size: $large;
      @include respond-to(xl) {
        font-size: $medium;
      }
    }

    .Value__value {
      .ValueWithSmallDecimals {
        font-size: $large;
        margin-left: 3px;
        opacity: 0.7;
        @include respond-to(xl) {
          font-size: $medium;
        }
        @include respond-to(md) {
          margin-left: 1px;
        }
      }
    }

    &.NetWorth__column {
      .Row__content {
        justify-content: flex-start;
        .Value__value,
        .TokenIcon__dollar {
          .Value__value {
            font-size: $large;
            @include respond-to(xl) {
              font-size: $regular;
            }
          }

          .Value {
            align-items: flex-start;
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
