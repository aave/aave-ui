import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .VisxHistoricalRatesGraph {
    padding: 10px;

    &__axisLeft--tick {
      font-size: $extraSmall;
    }

    &__valueTooltipInner {
      min-width: 150px;
      border-radius: $borderRadius;
      box-shadow: $boxShadow;
      font-size: $small;
      padding: 0 !important;
    }
    &__tooltipDate,
    &__tooltipValues {
      padding: 5px;
    }

    &__tooltipDate {
      font-size: $small;
    }

    &__tooltipValues {
      .ValuePercent .ValuePercent__value {
        font-size: $small;
      }
    }

    &__tooltipValue {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      margin-bottom: 10px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }

    &__tooltipValue--text {
      display: flex;
      align-items: center;
      padding-right: 10px;
      font-size: $small;
    }

    &__tooltipValue-dot {
      display: block;
      margin-right: 5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }
`;

export default staticStyles;
