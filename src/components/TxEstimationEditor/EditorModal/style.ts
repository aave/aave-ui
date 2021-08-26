import css from 'styled-jsx/css';
/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TxEstimationModal__wrapper {
    max-width: 610px !important;
    @include respond-to(xl) {
      max-width: 580px !important;
      padding: 30px 30px !important;
    }
    @include respond-to(sm) {
      padding: 40px 15px !important;
    }
  }

  .TxEstimationModal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__warningArea {
      margin: -20px 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: left;
      padding: 8px 20px;
      border-radius: $borderRadius;
      font-size: $medium;
      @include respond-to(xl) {
        margin: 0 0 30px;
      }
      @include respond-to(sm) {
        font-size: $small;
        padding: 10px;
      }
      img {
        margin-right: 10px;
        width: 23px;
        height: 20px;
        @include respond-to(sm) {
          margin-right: 5px;
          width: 14px;
          height: 12px;
        }
      }
    }

    &__content-description {
      margin-bottom: 5px;
      text-align: left;
      font-size: $regular;
      width: 100%;
      @include respond-to(xl) {
        font-size: $medium;
      }
    }

    &__content {
      margin-bottom: 10px;
      padding: 15px;
      border-radius: $borderRadius;
      width: 100%;
      @include respond-to(xl) {
        margin-bottom: 20px;
      }

      .Row,
      .Value .Value__value {
        font-size: $regular;
        @include respond-to(xl) {
          font-size: $medium;
        }
      }
    }

    &__contentValues {
      display: flex;
      align-items: center;
    }
    &__contentValues--separator {
      margin: 0 3px;
    }

    &__options {
      display: flex;
      justify-content: space-between;
      width: 100%;
      @include respond-to(sm) {
        flex-wrap: wrap;
      }

      .TxEstimationModal__input {
        transition: $transition;
        border-radius: $borderRadius;
        padding: 5px 5px 5px 10px;
        width: 24%;
        border: 1px solid transparent;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        &.TxEstimationModal__inputSelected,
        &:hover {
          &:after {
            opacity: 1;
          }
        }
        &:after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          opacity: 0;
          transition: $transition;
        }

        &:last-child {
          background: transparent !important;
          &:after {
            display: none;
          }
        }
        @include respond-to(sm) {
          margin-bottom: 15px;
          width: 49%;
        }

        input {
          border: none;
          background: none;
        }
      }

      .TxEstimationModal__inputValue,
      input {
        font-size: 24px;
        font-weight: 600;
        width: 45px;
      }

      .TxEstimationModal__inputDescription {
        text-align: right;
        p {
          font-size: 14px;
          font-weight: 600;
        }
        span {
          font-size: $small;
        }
      }
    }

    &__confirm {
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      @include respond-to(xl) {
        margin-top: 40px;
      }
      @include respond-to(sm) {
        margin-top: 35px;
      }
      .DefaultButton {
        font-size: $medium;
        margin-bottom: 30px;
        width: 160px;
        min-height: 40px;
        @include respond-to(xl) {
          margin-bottom: 25px;
          font-size: $small;
        }
        @include respond-to(sm) {
          margin-bottom: 30px;
        }
      }
    }

    &__footer {
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $small;
      }
    }
  }

  @media only screen and (max-height: 700px) and (min-width: 768px) {
    .TxEstimationModal__wrapper.ReactModal__Content.ReactModal__Content--after-open {
      position: absolute !important;
      top: 5% !important;
      bottom: 5% !important;
      display: block;
      overflow: auto !important;
    }
  }

  @media (max-height: 750px) and (max-width: 767px) {
    .TxEstimationModal__wrapper.ReactModal__Content.ReactModal__Content--after-open {
      position: absolute !important;
      top: 5% !important;
      bottom: 5% !important;
      display: block;
      overflow: auto !important;
    }
  }
`;

// @ts-ignore
export default staticStyles;
