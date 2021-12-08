import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .LTVContent {
    position: relative;
    margin: 45px 0 55px;

    &__line {
      height: 3px;
      width: 100%;
      border-radius: 8px;
      position: relative;
    }
    &__valueLine {
      position: absolute;
      left: 0;
      height: 5px;
      bottom: -1px;
      border-radius: 8px;
    }

    &__title,
    .ValuePercent .ValuePercent__value {
      font-size: $small !important;
    }

    &__percentInner {
      position: relative;
      white-space: nowrap;
      &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
      }
    }

    &__percent {
      display: flex;
      position: absolute;
    }

    &__maxLTV {
      position: absolute;
      bottom: calc(100% + 12px);

      .LTVContent__percentInner {
        &:after {
          left: 50%;
          transform: translateX(-50%);
          top: 100%;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
        }
      }

      .LTVContent__percent {
        left: 50%;
        transform: translateX(-50%);
        bottom: 1px;
      }

      .LTVContent__title {
        display: block;
        margin-right: 4px;
      }
    }
    &__maxLTVColumn {
      .LTVContent__percent {
        align-items: center;
        flex-direction: column;
      }
    }
    &__liquidationThreshold {
      position: absolute;
      top: calc(100% + 12px);
      right: -5px;

      .LTVContent__percentInner {
        &:after {
          right: 0;
          bottom: calc(100% + 2px);
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
        }
      }

      .LTVContent__percent {
        flex-direction: column;
        align-items: flex-end;
        right: 0;
      }
    }
  }
`;

export default staticStyles;
