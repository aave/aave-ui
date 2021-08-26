import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ReserveGraphInner {
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    padding-bottom: 10px;
    width: 32.5%;
    margin-bottom: 20px;
    @include respond-to(xl) {
      margin-bottom: 15px;
    }
    @include respond-to(lg) {
      margin-bottom: 10px;
    }
    @include respond-to(md) {
      margin-bottom: 20px;
    }
    @include respond-to(sm) {
      width: 100%;
      margin-bottom: 10px;
      padding-bottom: 0;
    }

    &__top-line {
      padding: 6px 15px;
      position: relative;
      width: 100%;
      text-align: left;
      cursor: default;
      @include respond-to(xl) {
        padding: 6px 10px;
      }
      @include respond-to(md) {
        padding: 8px 10px;
      }
      @include respond-to(sm) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 40px 8px 10px;
        min-height: 34px;
      }
      p {
        font-size: 15px;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(lg) {
          font-size: $extraSmall;
        }
        @include respond-to(md) {
          font-size: $small;
        }
      }
    }

    &__image {
      width: 120px;
    }

    &__graph {
      height: 160px;
      position: relative;
      @include respond-to(lg) {
        height: 140px;
      }
      @include respond-to(md) {
        height: 160px;
      }

      .VisxHistoricalRatesGraph {
        padding: 20px 0 0;
        margin-bottom: -20px;
      }
    }

    .Row__title,
    .GraphLegend__name {
      font-size: 15px !important;
      font-weight: 400 !important;
      @include respond-to(xl) {
        font-size: $small !important;
      }
      @include respond-to(lg) {
        font-size: $extraSmall !important;
      }
      @include respond-to(md) {
        font-size: $small !important;
      }
    }
    .GraphLegend__inner {
      @include respond-to(sm) {
        display: none;
      }
    }
    .GraphLegend {
      margin: 0;
      padding: 0;
    }

    &__active {
      padding-bottom: 8px;
      .ReserveGraphInner__image {
        display: none;
      }
      .GraphLegend__inner {
        display: flex;
      }
      .GraphLegend {
        width: 100%;
      }
    }

    &__noData {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      left: 0;
      p {
        font-size: $medium;
      }
    }
  }
`;

export default staticStyles;
