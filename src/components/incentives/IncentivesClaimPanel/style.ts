import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .IncentivesClaimPanel {
    border-radius: $borderRadius;
    display: flex;
    align-items: center;
    padding: 4px 4px 4px 8px;
    @include respond-to(sm) {
      flex-direction: column;
      margin: 15px 10px 0;
      width: calc(100% - 20px);
      padding: 10px 10px 4px;
    }

    &__title {
      font-size: $medium;
      font-weight: 300;
      margin-right: 20px;
      @include respond-to(sm) {
        font-size: $regular;
        margin-right: 0;
        margin-bottom: 15px;
      }
    }

    &__items,
    &__item {
      display: flex;
      align-items: center;
    }

    &__items {
      @include respond-to(sm) {
        margin-bottom: 15px;
      }
    }

    &__item {
      padding-right: 8px;
      margin-right: 8px;
      &:last-of-type {
        padding-right: 0;
        margin-right: 0;
        border-right: unset !important;
      }

      .TokenIcon {
        position: relative;
        bottom: 1px;
      }
      .TokenIcon .TokenIcon__image {
        margin-right: 4px;
      }
      .Value__value {
        font-size: $medium;
      }
    }

    .ButtonLink {
      margin-left: 20px;
      @include respond-to(sm) {
        margin-left: 0;
      }
      @include respond-to(xs) {
        width: 100%;
      }
    }
    .DefaultButton {
      border: none;
      font-size: $small;
      @include respond-to(xs) {
        width: 100%;
      }
    }
  }
`;

export default staticStyles;
