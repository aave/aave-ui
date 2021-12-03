import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .IsolationModeBadge {
    align-items: center;
    justify-content: flex-start;
    .TextWithModal__text {
      font-weight: 600;
    }
    .TextWithModal__button {
      position: static;
      transform: unset;
      margin-left: 4px;
    }

    &.IsolationModeBadge__disabled {
      .TextWithModal__text {
        color: unset !important;
        font-weight: 400;
        font-size: unset !important;
      }
    }

    &__modal--text {
      font-size: $large;
      margin-bottom: 32px;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $regular;
      }

      a {
        font-weight: 500;
      }
    }
  }
`;

export default staticStyles;
