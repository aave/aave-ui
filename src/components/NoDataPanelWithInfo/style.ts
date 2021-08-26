import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .NoDataPanelWithInfo {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    @include respond-to(lg) {
      justify-content: flex-start;
    }

    .NoDataPanelWithInfo__wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      flex: 1;
      @include respond-to(sm) {
        max-height: 100%;
        padding: 0;
        background: transparent !important;
        box-shadow: none;
      }
    }

    &__selectMarket-button {
      font-size: $regular;
      margin-left: 4px;
      &:hover {
        span {
          opacity: 0.5;
        }
      }
      &:disabled {
        span {
          opacity: 0.5;
        }
      }
      &:first-letter {
        text-transform: uppercase;
      }
      &:first-of-type {
        margin-left: 0;
      }
      &:last-of-type {
        i {
          display: none;
        }
      }
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $extraSmall;
      }
      @include respond-to(sm) {
        font-size: $regular;
      }
      span {
        transition: $transition;
      }
    }
  }

  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      .NoDataPanelWithInfo .NoDataPanelWithInfo__wrapper {
        max-height: none;
        display: block;
      }
    }
  }
`;

export default staticStyles;
