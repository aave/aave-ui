import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableNoData {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16);
    border-radius: $borderRadius;
    min-height: 162px;
    @include respond-to(xl) {
      min-height: 155px;
    }
    @include respond-to(sm) {
      margin: 0 10px;
      width: calc(100% - 20px);
    }

    &__title {
      display: flex;
      font-weight: 600;
      font-size: $large;
      padding: 20px;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        padding: 15px;
      }
      @include respond-to(md) {
        padding: 20px;
      }
      @include respond-to(sm) {
        align-items: center;
        justify-content: center;
      }
    }

    .AvailableCapsHelpModal .TextWithModal__text {
      font-weight: 600;
      font-size: $large;
      @include respond-to(xl) {
        font-size: $regular;
      }
    }

    .NoDataPanel {
      min-height: unset;
      padding: 10px 0;
      @include respond-to(sm) {
        padding: 20px 15px;
      }
      .Caption {
        margin-bottom: 0;
      }
    }
  }
`;

export default staticStyles;
