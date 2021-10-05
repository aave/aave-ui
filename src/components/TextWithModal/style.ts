import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TextWithModal {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    position: relative;

    &__text {
      font-size: $large;
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        font-size: $regular;
      }
    }

    &__textClickable {
      cursor: pointer;
    }

    &__button {
      background: transparent;
      border: none;
      margin: 0;
      padding: 0;
      cursor: pointer;
      transition: $transition;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.25) 0 1px 5px;
      }
      &:active {
        transform: scale(0.8) translateY(-50%);
      }
    }

    &__modal-inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .TextWithModal__lightWeight {
    .TextWithModal__text {
      font-weight: 300;
    }
  }

  .TextWithModal__modal {
    padding: 32px 48px !important;
    max-width: 506px !important ;
    @include respond-to(sm) {
      padding: 24px !important;
    }
  }
`;

export default staticStyles;
