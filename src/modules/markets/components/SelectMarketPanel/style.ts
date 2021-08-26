import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .SelectMarketPanel {
    display: flex;
    flex-direction: column;
    align-items: center;
    @include respond-to(sm) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-bottom: 30px;
      position: relative;
      z-index: 50;
    }
    &__collapse {
      display: block;
      padding-right: 55px;
      .SelectMarketPanel__title {
        display: none;
      }
    }

    &__markets {
      display: flex;
      flex-wrap: wrap;
      @include respond-to(sm) {
        display: none;
      }
    }

    &__title {
      margin-bottom: 10px;
      font-size: $large;
      font-weight: 300;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(sm) {
        display: block;
        margin-bottom: 5px;
        font-size: $regular;
        font-weight: 400;
      }
    }

    &__select-button {
      margin: 5px;
    }

    &__switcher {
      display: none;
      @include respond-to(sm) {
        display: block;
      }
    }
  }
`;

export default staticStyles;
