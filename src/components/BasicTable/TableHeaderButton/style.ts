import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
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
    &__small {
      @include respond-to(sm) {
        font-size: $extraSmall;
      }
    }

    span {
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
      @include respond-to(sm) {
        font-size: 8px;
      }
    }

    &__withSort {
      p {
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
      p {
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
