import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TopPanelWrapper {
    width: 100%;
    border-radius: $borderRadius;
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
