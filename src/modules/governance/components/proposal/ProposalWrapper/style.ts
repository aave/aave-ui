import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ProposalWrapper {
    display: block !important;
    flex: 1;
    @include respond-to(sm) {
      display: flex !important;
      flex-direction: column;
    }

    &__leaderboard {
      display: flex !important;
    }

    &__wrapperLeaderboard {
      display: flex;
      flex-direction: column;
      flex: 1;
      .ProposalWrapper__inner-right {
        margin-right: 0;
      }
    }

    &__caption {
      display: flex;
      align-items: center;
    }

    &__title {
      font-size: $large;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $large;
      }
    }
    .ProposalWrapper__download {
      margin: 0 30px;
      @include respond-to(md) {
        margin: 0 50px;
      }
      p {
        display: flex;
        align-items: center;
        font-size: $medium;
        @include respond-to(xl) {
          font-size: $small;
        }
        img {
          margin-right: 5px;
          width: 13px;
          height: 16px;
          @include respond-to(xl) {
            width: 11px;
            height: 14px;
          }
        }
      }
    }
    .ProposalWrapper__shared-button {
      &:hover {
        opacity: 0.7;
      }
      &:active {
        p {
          img {
            transform: scale(0.9);
          }
        }
      }
      p {
        font-size: $medium;
        display: flex;
        align-items: center;
        @include respond-to(xl) {
          font-size: $small;
        }
        img {
          width: 20px;
          height: 20px;
          margin-left: 5px;
          transition: $transition;
        }
      }
    }

    .CircleBackButton.ProposalWrapper__back-button {
      margin-right: 10px;
      width: 20px;
      height: 20px;
      @include respond-to(sm) {
        display: none;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }

    &__switcher {
      display: none;
      @include respond-to(sm) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
      }
    }

    &__wrapper {
      @include respond-to(sm) {
        display: flex;
        flex: 1;
        flex-direction: column;
      }
    }
    &__inner {
      display: flex;
      justify-content: space-between;
      @include respond-to(sm) {
        flex-direction: column;
        flex: 1;
      }
    }
    &__inner-right {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-right: 20px;
      @include respond-to(md) {
        margin-right: 10px;
      }
      @include respond-to(sm) {
        margin-right: 0;
      }
    }
    &__voteBars {
      @include respond-to(md) {
        margin-right: 0;
      }
    }
    &__block {
      display: block;
    }
    &__innerHidden {
      display: none;
    }

    &__content {
      padding: 30px;
      box-shadow: $boxShadow;
      border-radius: $borderRadius;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      flex: 1;
      @include respond-to(xl) {
        padding: 20px;
      }
      @include respond-to(lg) {
        padding: 15px;
      }
      @include respond-to(sm) {
        padding: 0;
        margin: 0;
        width: 100%;
        border-radius: 0;
        box-shadow: none;
      }
    }

    &__inner-left {
      width: 390px;
      @include respond-to(xl) {
        width: 270px;
      }
      @include respond-to(md) {
        display: none;
      }
    }
    &__sidePanel {
      margin-bottom: 10px;
      position: relative;
      z-index: 2;
      margin-top: -109px;
      @include respond-to(xl) {
        margin-top: -76px;
      }
      @include respond-to(md) {
        display: block;
        margin-top: 0;
      }
      @include respond-to(sm) {
        display: none;
        width: 100%;
      }
    }
    &__sidePanelVisible {
      @include respond-to(sm) {
        display: block;
      }
    }

    &__mobileInfo {
      display: none;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 20px;
      @include respond-to(sm) {
        display: flex;
      }

      .ProposalWrapper__download {
        margin: 0;
        p {
          font-size: $regular;
          img {
            margin-right: 10px;
            width: 16px;
            height: 20px;
          }
        }
      }
      .ProposalWrapper__shared-button {
        p {
          font-size: $regular;
          img {
            width: 24px;
            height: 24px;
            margin-left: 10px;
          }
        }
      }
    }
  }
`;

export default staticStyles;
