import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .HFContent {
    position: relative;
    margin: 30px 0 55px;

    &__text {
      font-size: $small;
      position: absolute;
      bottom: calc(100% + 4px);
    }
    &__left {
      left: 0;
    }
    &__right {
      right: 0;
    }

    &__line {
      height: 6px;
      background: linear-gradient(90deg, #65c970 0%, #ffac4d 52.5%, #de5959 100%);
      border-radius: 8px;
    }

    &__point {
      width: 16px;
      height: 16px;
      box-shadow: $boxShadow;
      background: white;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
    }

    &__value {
      display: flex;
    }

    &__title,
    .ValuePercent .ValuePercent__value {
      font-size: $small !important;
    }

    &__liquidationValue {
      position: absolute;
      top: calc(100% + 12px);
      right: -5px;
    }

    &__percentInner {
      position: relative;
      white-space: nowrap;
      &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        right: 0;
        bottom: calc(100% + 2px);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
      }
    }

    &__percent {
      display: flex;
      position: absolute;
      flex-direction: column;
      align-items: flex-end;
      right: 0;
    }
  }
`;

export default staticStyles;
