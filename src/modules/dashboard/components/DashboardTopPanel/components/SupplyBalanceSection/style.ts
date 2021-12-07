import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .SupplyBalanceSection__withIsolatedBadge {
    .BalanceSectionWrapper__content {
      margin-top: 2px;
      @include respond-to(lg) {
        margin-top: 5px;
      }
      @include respond-to(md) {
        margin-top: 10px;
      }
    }
  }

  .SupplyBalanceSection__content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .IsolatedBadge {
      margin-left: 0;
      margin-top: 4px;
    }
  }

  .Row.SupplyBalanceSection__row {
    font-size: $regular;
    align-items: center;
    @include respond-to(xl) {
      font-size: $medium;
    }

    .Value {
      @include respond-to(lg) {
        align-items: center;
      }
      @include respond-to(md) {
        align-items: flex-end;
      }
    }

    .Value__value,
    .TokenIcon__dollar {
      font-size: $large;
      font-weight: 500;
      @include respond-to(xl) {
        font-size: $medium;
      }
    }

    &.Row__column {
      .Row__title-inner {
        align-items: center;
      }
    }

    .SupplyBalanceSection__rowContent {
      display: flex;
      align-items: center;
    }
  }
`;

export default staticStyles;
