import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TribeRewardHelpModal {
    align-items: center;
    margin-left: 2px;
    .TextWithModal__text {
      display: none;
    }
    .TextWithModal__button {
      position: static;
      transform: unset !important;
    }

    &__content {
      p {
        margin-bottom: 20px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
      .Link {
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        img {
          margin-left: 3px;
          width: 12px;
          height: 12px;
          position: relative;
          top: 1px;
          @include respond-to(xl) {
            width: 10px;
            height: 10px;
          }
          @include respond-to(lg) {
            top: 0;
          }
          @include respond-to(md) {
            top: 1px;
          }
        }
      }
      span {
        display: block;
        padding-top: 20px;
        margin-top: 20px;
        font-size: $small;
        @include respond-to(xl) {
          font-size: $extraSmall;
        }
      }
    }
  }
`;

export default staticStyles;
