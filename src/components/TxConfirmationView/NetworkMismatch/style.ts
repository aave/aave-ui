import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .NetworkMismatch {
    padding: 10px 15px 15px;
    border-radius: $borderRadius;
    width: 100%;
    text-align: left;
    font-size: $medium;
    @include respond-to(xl) {
      font-size: $small;
      padding: 10px 15px;
    }
    @include respond-to(lg) {
      font-size: $extraSmall;
      padding: 10px;
    }
    @include respond-to(md) {
      font-size: $small;
      padding: 10px 15px;
    }
    @include respond-to(sm) {
      font-size: $medium;
    }

    &__top-inner {
      margin-bottom: 10px;

      h4 {
        font-size: $regular;
        margin-bottom: 10px;
        @include respond-to(xl) {
          font-size: $medium;
        }
        @include respond-to(lg) {
          font-size: $small;
          margin-bottom: 5px;
        }
        @include respond-to(md) {
          font-size: $medium;
          margin-bottom: 10px;
        }
        @include respond-to(sm) {
          font-size: $regular;
        }
      }
    }
    &__onlyText {
      margin-bottom: 0;
    }

    .NetworkMismatch__textInner {
      display: flex;
      justify-content: space-between;
      p {
        margin-right: 15px;
        flex: 1;
      }
    }

    &__bottom-inner {
      display: flex;
      justify-content: space-between;
    }

    &__bottom-text {
      margin-right: 5px;
    }

    .NetworkMismatch__bottomText {
      .TextWithModal__text {
        white-space: nowrap;
        font-size: $medium;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(lg) {
          font-size: $extraSmall;
        }
        @include respond-to(md) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $medium;
        }
      }
    }

    .DefaultButton {
      width: 120px;
      min-height: 40px;
      font-size: $medium;
      @include respond-to(xl) {
        width: 90px;
        min-height: 30px;
        font-size: $extraSmall;
      }
    }
  }
`;

export default staticStyles;
