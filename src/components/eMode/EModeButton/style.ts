import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .EModeButton {
    cursor: pointer;
    display: flex;
    align-items: center;

    &__content {
      position: relative;

      &:after {
        content: '';
        position: absolute;
        z-index: 1;
        left: -1px;
        right: -1px;
        top: -1px;
        bottom: -1px;
        border-radius: $borderRadius;
      }

      &--wrapper {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        border-radius: $borderRadius;
      }
    }

    &__small {
      .EModeButton__content {
        margin-right: 5px;

        &--wrapper {
          padding: 4px 6px 4px 4px;
          font-size: $medium;
          @include respond-to(xl) {
            font-size: $small;
          }
        }

        &--image {
          width: 12px;
          height: 12px;
          margin-right: 4px;
        }
      }
    }

    &__normal {
      .EModeButton__content {
        margin-right: 7px;

        &--wrapper {
          padding: 8px 12px 8px 8px;
          font-size: 15px;
          @include respond-to(xl) {
            font-size: $medium;
            padding: 7px 12px 7px 7px;
          }
          @include respond-to(lg) {
            font-size: $small;
            padding: 5px 12px 5px 5px;
          }
          @include respond-to(md) {
            font-size: $medium;
            padding: 7px 12px 7px 7px;
          }
        }

        &--image {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }
      }
    }
  }
`;

export default staticStyles;
