import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .IncentiveWrapper {
    display: flex;
    align-items: center;
    @include respond-to(sm) {
      flex-direction: column;
      margin-bottom: 40px;
    }

    &__incentives {
      display: flex;
      align-items: center;
      @include respond-to(sm) {
        flex-direction: column;
        width: 100%;
        padding: 0 10px;
      }
    }

    &__title {
      margin-right: 16px;
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(sm) {
        margin: 0 0 8px 0;
      }
    }
  }
`;

export default staticStyles;
