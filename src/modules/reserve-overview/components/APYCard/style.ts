import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .APYCard {
    border-radius: $borderRadius;
    border-width: 1px;
    border-style: solid;
    width: 260px;
    margin: 0 15px;
    @include respond-to(xl) {
      width: 200px;
    }
    @include respond-to(lg) {
      width: 150px;
      margin: 0 7px;
    }
    @include respond-to(md) {
      width: 200px;
      margin: 0 15px;
    }
    @include respond-to(sm) {
      width: 100%;
      margin: 0 0 15px;
    }

    &__title {
      text-align: center;
      padding: 5px;
      p {
        font-size: $medium;
        @include respond-to(xl) {
          font-size: $extraSmall;
        }
        @include respond-to(sm) {
          font-size: $regular;
        }
      }
    }

    &__content {
      padding: 10px;
      @include respond-to(lg) {
        padding: 5px;
      }
      @include respond-to(md) {
        padding: 10px;
      }
    }
  }
`;

export default staticStyles;
