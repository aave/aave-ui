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

    &__content {
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
    &__valueWithIcon {
      display: flex;
      align-items: center;
    }
    &__warningIcon {
      margin-right: 4px;
      width: 12px;
      height: 10px;
    }
    &__detailsButton {
      font-size: 15px;
      margin-left: 8px;
      text-decoration: underline;
      transition: $transition;
      @include respond-to(xl) {
        font-size: $medium;
      }
    }
  }
`;

export default staticStyles;
