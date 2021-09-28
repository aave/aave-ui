import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .AssetSwapContentWrapper {
    display: flex;
    flex-direction: column;
    flex: 1;

    &__content {
      overflow: hidden;
      @include respond-to(sm) {
        overflow: unset;
      }
    }

    &__withRightPanel {
      flex-direction: row;
      align-items: flex-start;
      @include respond-to(md) {
        flex-direction: column;
      }

      .AssetSwapContentWrapper__content {
        padding-top: 100px;
        padding-bottom: 125px;
        @include respond-to(xl) {
          padding-top: 85px;
          padding-bottom: 85px;
        }
        @include respond-to(md) {
          padding-top: 75px;
          padding-bottom: 75px;
        }
        @include respond-to(sm) {
          padding-top: 0;
          padding-bottom: 0;
        }
      }
    }
  }
`;

export default staticStyles;
