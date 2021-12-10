import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableHeaderButton {
    font-size: $regular;
    font-weight: 400;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: none;
    @include respond-to(xl) {
      font-size: $medium;
    }
    @include respond-to(sm) {
      font-size: $small;
    }

    .TextWithModal {
      align-items: center;
    }
    .TextWithModal__text {
      font-size: $regular !important;
      @include respond-to(xl) {
        font-size: $medium !important;
      }
      @include respond-to(sm) {
        font-size: $small !important;
      }
    }
    .TextWithModal__button {
      position: static;
      transform: unset !important;
      margin-left: 4px;
    }

    &__small {
      @include respond-to(sm) {
        font-size: $extraSmall;
        .TextWithModal__text {
          font-size: $extraSmall !important;
        }
      }
    }

    .TableHeaderButton__subTitle {
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
      @include respond-to(sm) {
        font-size: 8px;
      }
    }

    &__withSort {
      .TableHeaderButton__title {
        display: inline;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          right: -15px;
          top: 56%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 8px 5px 0 5px;
          border-color: transparent;
          transition: $transition;
          @include respond-to(md) {
            right: -12px;
          }
          @include respond-to(sm) {
            border-width: 5px 3px 0 3px;
            right: -8px;
          }
        }
      }
    }

    &__desk {
      .TableHeaderButton__title {
        &:after {
          border-width: 0 5px 8px 5px;
          border-color: transparent;
          @include respond-to(sm) {
            border-width: 0 3px 5px 3px;
          }
        }
      }
    }

    &__withSubTitle {
      flex-direction: column;
    }
  }
`;

export default staticStyles;
