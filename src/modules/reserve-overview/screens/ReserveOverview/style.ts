import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ReserveOverview {
    margin-top: 40px !important;
    @include respond-to(sm) {
      margin-top: 0 !important;
    }
    &__content {
      padding-bottom: 10px;
    }

    &__graphs-wrapper {
      width: 100%;
      min-height: 50px;
      @include respond-to(md) {
        display: block;
        overflow-x: auto;
        overflow-y: hidden;
        transform: translateZ(0);
        padding: 3px 0 0 3px;
      }
      @include respond-to(sm) {
        min-height: 0px;
        overflow: inherit;
        padding: 0;
      }
    }

    &__graphs-inner {
      display: flex;
      justify-content: space-between;
      @include respond-to(md) {
        min-width: 1100px;
        width: 100%;
      }
      @include respond-to(sm) {
        flex-wrap: wrap;
        min-width: auto;
      }
    }

    &__information-title {
      margin-bottom: 10px;
      font-size: $large;
      font-weight: 400;
      width: 100%;
      @include respond-to(xl) {
        font-size: $small;
      }
    }

    &__content-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      @include respond-to(md) {
        display: block;
      }
    }

    &__user-information {
      width: 525px;
      display: flex;
      flex-direction: column;
      @include respond-to(xl) {
        width: 440px;
      }
      @include respond-to(lg) {
        width: 340px;
      }
      @include respond-to(md) {
        width: 100%;
      }
      @include respond-to(sm) {
        display: none;
      }
    }

    &__user-informationInner {
      flex: 1;
      display: block;
      flex-direction: column;
      box-shadow: none !important;
      background: transparent !important;
    }
    .ReserveOverview__noUser.ReserveOverview__noUser {
      box-shadow: $boxShadow !important;
      @include respond-to(sm) {
        box-shadow: none !important;
        background: transparent !important;
      }
    }

    &__informationNonUser {
      width: 100%;
      flex: auto;
      margin-right: 0;
    }

    &__mobileUserInformation-wrapper {
      display: none;
      @include respond-to(sm) {
        display: block;
      }
    }

    .ReserveOverview__noDataPanel {
      flex: 1;
      padding: 20px;
      @include respond-to(xl) {
        padding: 5px;
      }
      @include respond-to(md) {
        padding: 30px;
      }
      @include respond-to(sm) {
        display: block;
        flex: unset;
        height: unset;
        min-height: unset;
      }
    }

    &__poolLink-inner {
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      font-size: $regular;
      margin: 5px 0 25px;
      img {
        width: 14px;
        height: 14px;
        margin-left: 10px;
      }
    }
  }
`;

export default staticStyles;
