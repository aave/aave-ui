import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ProposalDetails {
    width: 100%;
    i {
      font-style: normal;
    }

    //.ProposalDetails__content {
    //  margin-bottom: 20px;
    //  @include respond-to(xl) {
    //    margin-bottom: 10px;
    //  }
    //  @include respond-to(sm) {
    //    margin-bottom: 20px;
    //  }
    //}

    .Row.ProposalDetails__row-quorum {
      align-items: center;
    }

    .Row.ProposalDetails__row {
      margin-bottom: 15px;
      @include respond-to(xl) {
        font-size: $small;
        margin-bottom: 12px;
      }
      @include respond-to(sm) {
        font-size: $medium;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
      .Row__subtitle {
        font-size: $medium !important;
        font-weight: 300;
        @include respond-to(xl) {
          font-size: $extraSmall !important;
        }
        @include respond-to(sm) {
          font-size: $small !important;
        }
      }
      .ValuePercent .ValuePercent__value,
      .Value .Value__value {
        font-weight: 400;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $medium;
        }
      }
    }
    .Row.ProposalDetails__row-withoutMargin {
      margin-bottom: 5px;
    }
    &__row-inner {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      i {
        font-size: $medium;
        font-weight: 300;
        @include respond-to(xl) {
          font-size: $extraSmall;
        }
        @include respond-to(sm) {
          font-size: $small;
        }
      }
    }

    &__top-inner,
    &__bottom-inner {
      padding: 20px 15px;
      position: relative;
      @include respond-to(xl) {
        padding: 15px;
      }
      @include respond-to(lg) {
        padding: 15px 10px;
      }
      @include respond-to(md) {
        padding: 15px;
      }
      @include respond-to(sm) {
        padding: 20px 15px;
      }
    }

    &__top-inner {
      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        opacity: 0.1;
      }
    }

    &__bottom-inner {
      .ProposalDetails__row {
        align-items: center;
      }
      .ProposalDetails__button {
        width: 70px;
        min-height: 30px;
        font-size: $small;
        @include respond-to(xl) {
          width: 70px;
          min-height: 26px;
          font-size: $extraSmall;
        }
        @include respond-to(sm) {
          width: 120px;
          min-height: 36px;
          font-size: $small;
        }
      }
    }
  }
`;

export default staticStyles;
