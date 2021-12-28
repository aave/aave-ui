import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BridgeBanner {
    width: 100%;
    display: flex;
    border-radius: 50px;
    padding: 8px 24px;
    color: white;
    justify-content: space-between;
    position: relative;
    margin-bottom: 20px;
    @include respond-to(md) {
      flex-direction: column;
      align-items: center;
      border-radius: 0;
      div {
        padding: 4px;
      }
    }
    @include respond-to(sm) {
      margin: 20px 10px;
      width: calc(100% - 20px);
    }

    &__logo {
      display: flex;
      align-items: center;
    }

    &__title {
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
      align-items: center;

      @include respond-to(md) {
        position: relative;
        max-width: 343px;
      }
    }

    &__close {
      display: flex;
      align-items: center;
      position: relative;
      z-index: 2;
      &:hover {
        opacity: 0.7;
      }
      &:active {
        transform: scale(0.8);
      }

      @include respond-to(md) {
        right: 8px;
        top: 14px;
        position: absolute;
      }

      span {
        width: 14px;
        height: 2px;
        position: relative;
        border-radius: $borderRadius;
        transform: rotate(45deg);
        &:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: $borderRadius;
          height: 14px;
          width: 2px;
        }
      }
    }
  }
`;

export default staticStyles;
