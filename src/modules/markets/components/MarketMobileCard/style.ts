import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MarketMobileCard {
    &__topRows {
      .Row {
        margin-top: 10px;
        .Row__title {
          font-size: $medium;
        }
      }
    }

    &__button-inner,
    &__isFreezed--inner {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
    }

    &__cards {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    &__card--title {
      font-size: $medium;
      margin-bottom: 10px;
      font-weight: 600;
      span {
        font-weight: 400;
        font-size: $small;
        margin-left: 5px;
      }
    }
  }
`;

export default staticStyles;
