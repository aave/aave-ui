import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Value {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    &__line {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &__subValue--line {
      margin-top: 2px;
    }

    &__value {
      position: relative;
      z-index: 2;
      font-size: $large;
      font-weight: 600;
      white-space: nowrap;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $regular;
      }
    }
    &__symbol {
      font-weight: 400;
      margin-left: 5px;
      white-space: nowrap;
    }

    &__token-icon {
      .TokenIcon__dollar {
        margin-right: 5px !important;
        font-size: $large;
        @include respond-to(xl) {
          font-size: $regular;
        }
        @include respond-to(lg) {
          font-size: $medium;
        }
        @include respond-to(md) {
          font-size: $regular;
        }
      }
    }

    &__withSmallDecimals {
      .Value__symbol {
        font-size: $regular;
        font-weight: 400;
        margin-left: 3px;
        @include respond-to(xl) {
          font-size: $small;
        }
      }
    }

    .Value__tooltip {
      padding: 5px 10px;
      font-size: $medium;
      font-weight: 600;
      @include respond-to(xl) {
        font-size: $small;
      }
      white-space: nowrap;
    }
  }
`;

export default staticStyles;
