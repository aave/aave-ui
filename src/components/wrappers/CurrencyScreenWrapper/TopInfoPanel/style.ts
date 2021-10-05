import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TopInfoPanel {
    display: flex;
    margin-bottom: 5px;
    @include respond-to(sm) {
      margin: 0;
      flex-wrap: wrap;
      padding: 5px 10px;
      justify-content: center;
    }

    .TopInfoPanel__line {
      margin-right: 30px;
      @include respond-to(sm) {
        margin-right: 0;
        min-width: 50%;
        max-width: 80%;
        padding: 10px;
        .Row__title-inner {
          align-items: center;
        }
        .Value,
        .ValuePercent {
          align-items: center;
          justify-content: center;
        }
      }
    }

    .Row__title-inner .Row__title.Row__title,
    .Value .Value__value,
    .ValuePercent .ValuePercent__value,
    .TextWithModal__text,
    .TopInfoPanel__no-data,
    .TopInfoPanel__healthFactor .TextWithModal__text {
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $extraSmall;
      }
      @include respond-to(sm) {
        font-size: $medium;
      }
    }
    .Row__title-inner .Row__title.Row__title,
    .TextWithModal__text,
    .TopInfoPanel__healthFactor .TextWithModal__text {
      @include respond-to(sm) {
        font-size: $small;
        padding-right: 0;
      }
    }

    .TopInfoPanel__healthFactor {
      @include respond-to(sm) {
        margin-right: 0;
        width: 50%;
        padding: 10px;
        display: block;
        text-align: center;
        .ValuePercent {
          align-items: center;
          justify-content: center;
        }
      }
    }
    .HealthFactor__percent {
      margin-left: 25px;
      @include respond-to(sm) {
        margin-left: 0;
      }
    }
  }
`;

export default staticStyles;
