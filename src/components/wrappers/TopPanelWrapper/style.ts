import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TopPanelWrapper {
    width: 100%;
    border-radius: 5px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border: solid 1px rgba(255, 255, 255, 0.68);
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3) -6%,
      rgba(255, 255, 255, 0.3) 59%
    );
    box-shadow: $boxShadow;
    position: relative;
    @include respond-to(sm) {
      display: none;
    }

    &__button {
      position: absolute;
      right: 20px;
      top: 10px;
      font-size: $regular;
      font-weight: 300;
      display: flex;
      align-items: center;
      justify-content: center;
      @include respond-to(xl) {
        font-size: $small;
      }
      span {
        position: relative;
        bottom: 2px;
        &:before,
        &:after {
          content: '';
          position: absolute;
          left: -15px;
          width: 10px;
          height: 2px;
          transition: $transition;
        }
      }
    }
    &__buttonCollapse {
      span {
        &:after {
          transform: rotate(90deg);
        }
      }
    }
  }
`;

export default staticStyles;
