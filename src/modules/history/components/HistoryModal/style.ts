import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .HistoryModal.HistoryModal {
    padding: 30px !important;
    outline: none !important;
    @include respond-to(sm) {
      padding: 30px 10px 20px !important;
    }
  }

  .HistoryModal {
    &__wrapper {
      min-width: 440px;
      @include respond-to(xl) {
        max-width: 380px;
      }
      @include respond-to(sm) {
        min-width: 315px;
      }
    }

    &__content {
      padding: 20px 20px 0;
      margin-bottom: 7px;
      border-radius: $borderRadius;
      @include respond-to(sm) {
        padding: 20px 15px 0;
      }
    }

    &__text,
    .HistoryModal__link,
    &__asset-line span {
      font-size: $large;
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $regular;
      }
    }

    &__asset-line {
      display: flex;
      align-items: center;
    }

    .HistoryModal__date {
      span {
        &:last-of-type {
          margin-left: 5px;
        }
      }
    }

    .HistoryModal__value {
      .SubValue__symbolUSD {
        display: inline-block;
      }
    }

    .HistoryModal__link {
      span {
        display: flex;
        align-items: center;
        img {
          width: 16px;
          height: 16px;
          margin-right: 5px;
          @include respond-to(xl) {
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }
`;

export default staticStyles;
