import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ContentWrapper {
    position: relative;
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    &__fullHeight {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      flex: 1;
      margin-bottom: 10px;
      @include respond-to(md) {
        padding: 40px 20px;
      }
      @include respond-to(sm) {
        max-height: 100%;
        padding: 0;
        background: transparent !important;
        box-shadow: none !important;
      }
    }

    &__back-button {
      position: absolute;
      left: 20px;
      top: 20px;
      min-width: 90px;
      height: 32px;
      border-radius: $borderRadius;
      padding: 5px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $small;
      transition: $transition;
      @include respond-to(xl) {
        min-width: 70px;
        height: 26px;
        padding: 2px 5px;
      }
      @include respond-to(sm) {
        display: none;
      }
      span {
        width: 15px;
        height: 15px;
        margin-right: 15px;
        border-radius: 50%;
        transition: $transition;
        display: flex;
        align-items: center;
        justify-content: center;
        @include respond-to(xl) {
          margin-right: 10px;
        }
        &:after {
          content: '';
          line-height: 0;
          display: inline-block;
          transform: rotate(135deg);
          padding: 2px;
          position: relative;
          left: 1px;
          transition: $transition;
        }
      }
    }
  }

  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      .ContentWrapper {
        @include respond-to(sm) {
          display: block;
        }
      }
    }
  }
`;

export default staticStyles;
