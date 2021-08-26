import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .AssetSwapNoDeposits {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 560px;
    font-size: $large;
    @include respond-to(xl) {
      max-width: 500px;
      font-size: $regular;
    }
    @include respond-to(lg) {
      max-width: 370px;
      font-size: $medium;
    }
    @include respond-to(md) {
      max-width: 500px;
      font-size: $regular;
    }

    .Caption {
      margin-bottom: 10px;
    }

    &__faqText {
      margin-bottom: 30px;
      @include respond-to(lg) {
        margin-bottom: 20px;
      }
      @include respond-to(md) {
        margin-bottom: 30px;
      }
    }

    &__text-block {
      padding: 12px 35px;
      font-size: $medium;
      border-radius: $borderRadius;
      margin-bottom: 50px;
      @include respond-to(lg) {
        padding: 10px 25px;
        font-size: $small;
      }
      @include respond-to(md) {
        padding: 12px 35px;
        font-size: $medium;
      }
    }
  }
`;

export default staticStyles;
