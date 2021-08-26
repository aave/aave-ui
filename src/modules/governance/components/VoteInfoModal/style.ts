import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ReactModal__Content.VoteInfoModal {
    padding: 0 !important;
    max-width: 100% !important;
    @include respond-to(sm) {
      max-width: 335px !important;
    }
  }

  .VoteInfoModal {
    &__content {
      display: flex;
      @include respond-to(sm) {
        flex-wrap: wrap;
      }
    }

    &__switch-inner {
      display: none;
      @include respond-to(sm) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 335px;
        margin: 40px 0 15px;
      }
    }

    &__content-left-inner,
    &__content-right-inner {
      width: 350px;
      padding: 17px 15px 0;
      display: flex;
      flex-direction: column;
      flex: 1;
      @include respond-to(sm) {
        width: 335px;
        background: transparent !important;
        display: none;
      }
    }

    &__activeInner {
      display: block;
    }

    &__content-left-inner {
      border-radius: 5px 0 0 5px;
    }
    &__content-right-inner {
      border-radius: 0 5px 5px 0;
    }

    &__table-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      p {
        font-size: $regular;
        @include respond-to(xl) {
          font-size: $small;
        }
      }
    }

    &__noData {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      padding: 20px;
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $medium;
      }
    }
  }

  @media only screen and (max-height: 550px) {
    .ReactModal__Content.VoteInfoModal.ReactModal__Content--after-open {
      position: absolute !important;
      top: 5% !important;
      bottom: 5% !important;
      display: block;
      overflow: auto !important;
    }
  }
  @media only screen and (max-height: 650px) and (max-width: 768px) {
    .ReactModal__Content.VoteInfoModal.ReactModal__Content--after-open {
      position: absolute !important;
      top: 5% !important;
      bottom: 5% !important;
      display: block;
      overflow: auto !important;
    }
  }
`;

export default staticStyles;
