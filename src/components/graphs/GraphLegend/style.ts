import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .GraphLegend {
    align-items: center !important;
    padding: 5px 8px;
    position: relative;
    z-index: 2;
    .Row__title-inner {
      .Row__title {
        font-size: $medium;
        font-weight: 300;
        @include respond-to(lg) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $medium;
        }
      }
    }

    &__inner {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }

    &__item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 10px;
      white-space: nowrap;
    }

    &__dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 5px;
      position: relative;
      bottom: 2px;
    }

    &__name {
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
    }
  }
`;

export default staticStyles;
