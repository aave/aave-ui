import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .GraphFilterButtons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    max-width: 280px;
    @include respond-to(xl) {
      margin-bottom: 10px;
      max-width: 240px;
    }
    @include respond-to(md) {
      max-width: 280px;
      margin-bottom: 20px;
    }
    @include respond-to(sm) {
      max-width: 360px;
    }

    &__button {
      border-radius: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: $transition;
      border-width: 0.5px;
      border-style: solid;
      font-weight: 300;
      padding: 0 4px;
      min-width: 60px;
      min-height: 28px;
      font-size: $small;
      &:disabled {
        font-weight: 400;
      }
      &:active {
        box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.3);
      }
      @include respond-to(xl) {
        min-width: 50px;
        min-height: 20px;
        font-size: $extraSmall;
      }
      @include respond-to(md) {
        min-width: 60px;
        min-height: 28px;
        font-size: $small;
      }
      @include respond-to(sm) {
        min-width: 80px;
        min-height: 28px;
        font-size: $small;
      }
    }

    &__withoutBorder {
      margin: 0 0 0 40px;
      min-width: 240px;
      max-width: none;
      @include respond-to(xl) {
        min-width: 180px;
      }
      @include respond-to(lg) {
        margin: 0 0 0 25px;
      }
      .GraphFilterButtons__button {
        border: none;
        height: auto;
        font-size: $medium;
        text-transform: uppercase;
        width: auto;
        background: transparent !important;
        box-shadow: none !important;
        margin: 0 5px;
        &:disabled {
          font-weight: 600;
        }
        @include respond-to(xl) {
          font-size: $extraSmall;
        }
      }
    }
  }
`;

export default staticStyles;
