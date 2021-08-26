import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/screen-size';
  @import 'src/_mixins/vars';

  .Caption {
    margin-bottom: 40px;
    text-align: center;
    width: 100%;
    overflow: hidden;
    @include respond-to(xl) {
      margin-bottom: 30px;
    }
    @include respond-to(sm) {
      margin-bottom: 25px;
    }
    h2 {
      width: 100%;
      margin-bottom: 10px;
      font-size: $large;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      position: relative;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $regular;
      }

      &.Caption__titleWithCircle {
        left: 21px;
        @include respond-to(lg) {
          left: 17px;
        }
        @include respond-to(md) {
          left: 21px;
        }
      }

      img {
        width: 32px;
        height: 32px;
        margin-left: 10px;
        @include respond-to(lg) {
          width: 24px;
          height: 24px;
        }
        @include respond-to(md) {
          width: 32px;
          height: 32px;
        }
      }
    }
    &__description {
      font-size: $large;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $regular;
      }
    }
  }
`;

export default staticStyles;
