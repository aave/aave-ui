import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ErrorBoundary {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    &__button-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-bottom: 30px;
    }

    &__reload-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    &__reload-button {
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      right: 5px;
      &:hover {
        opacity: 0.7;
      }

      img {
        width: 26px;
        height: 26px;
        margin-right: 5px;
        transition: all 0.3s ease;
        @include respond-to(xl) {
          width: 16px;
          height: 16px;
        }
      }
      span {
        font-size: $large;
        line-height: 0;
        color: #383d51;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(lg) {
          font-size: $small;
        }
      }
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .ErrorBoundary__reload-button:active img {
    animation: rotate 0.5s ease;
  }
`;

export default staticStyles;
