import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Row.Balance {
    font-size: $regular !important;
    @include respond-to(xl) {
      font-size: $medium !important;
    }
    @include respond-to(md) {
      width: 100%;
    }

    .Row__title-inner {
      align-items: center;
      margin-bottom: 4px !important;
    }

    .Value {
      align-items: center;
      @include respond-to(sm) {
        align-items: flex-end;
      }
    }

    .Value__value,
    .TokenIcon__dollar {
      font-weight: 500;
      font-size: 24px;
      @include respond-to(xl) {
        font-size: 20px;
      }
      @include respond-to(lg) {
        font-size: $regular;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
    }

    .Value__value {
      .ValueWithSmallDecimals {
        font-weight: 500;
        font-size: 24px;
        margin-left: 3px;
        @include respond-to(xl) {
          font-size: 20px;
        }
        @include respond-to(lg) {
          font-size: $regular;
        }
        @include respond-to(md) {
          font-size: $medium;
        }
      }
    }

    &__collapsed {
      width: unset;
      @include respond-to(sm) {
        width: 100%;
      }

      .Value {
        @include respond-to(md) {
          align-items: center;
        }
        @include respond-to(sm) {
          align-items: flex-end;
        }
      }

      .Value__value,
      .TokenIcon__dollar,
      .Value__value .ValueWithSmallDecimals {
        font-size: $large;
        @include respond-to(xl) {
          font-size: $regular;
        }
        @include respond-to(sm) {
          font-size: $medium;
        }
      }
    }
  }
`;

export default staticStyles;
