import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .HealthFactor {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }

    .HealthFactor__noIcon {
      .TextWithModal__button {
        display: none;
      }
    }

    &.HealthFactor__column {
      margin: 0;
      display: block;
      text-align: center;
      .ValuePercent {
        align-items: center;
        justify-content: center;
      }
      .TextWithModal {
        display: inline-block;
      }
    }

    &__no-value {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      text-align: center;
      font-size: $large;
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        font-size: $regular;
      }
    }
  }
`;

export default staticStyles;
