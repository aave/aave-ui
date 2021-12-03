import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MarketTableItem {
    min-height: 70px;
    @include respond-to(xl) {
      min-height: 60px;
    }
    @include respond-to(lg) {
      min-height: 50px;
    }
    @include respond-to(md) {
      min-height: 60px;
    }

    &__column {
      &:first-child {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        min-width: 270px;
        @media only screen and (max-width: 850px) {
          flex-direction: column-reverse;
          align-items: flex-start;
          min-width: 80px;

          .IsolatedBadge {
            margin-left: 45px;
            margin-bottom: 0;
          }
        }
      }
      &:nth-child(3) {
        @include respond-to(sm) {
          display: none;
        }
      }
    }

    .MarketTableItem__value {
      &:first-of-type {
        margin-bottom: 4px;
      }
      .Value__value {
        @include respond-to(sm) {
          font-size: $small;
        }
      }
    }
    .MarketTableItem__percent {
      .ValuePercent__value {
        @include respond-to(sm) {
          font-size: $small;
        }
      }
    }

    &__isFreezed-inner {
      position: relative;
      flex: 3;
      text-align: center;
    }

    .TokenIcon__dollar {
      @include respond-to(sm) {
        font-size: $small;
      }
    }

    .MarketTableItem__button {
      width: 90px;
      min-height: 32px;
      font-size: $small;
      @include respond-to(xl) {
        width: 70px;
        min-height: 26px;
      }
      @include respond-to(lg) {
        width: 50px;
        font-size: $extraSmall;
      }
      @include respond-to(md) {
        width: 70px;
        font-size: $small;
      }
    }
  }
`;

export default staticStyles;
