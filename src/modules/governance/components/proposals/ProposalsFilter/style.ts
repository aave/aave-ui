import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ProposalsFilter {
    position: relative;
    z-index: 3;
    margin-bottom: 20px;
    @include respond-to(xl) {
      margin-bottom: 15px;
    }
    @include respond-to(lg) {
      margin-bottom: 10px;
    }
    @include respond-to(sm) {
      margin-bottom: 0;
    }

    &__filters-inner {
      position: relative;
    }

    &__button {
      font-size: $regular;
      display: flex;
      align-items: center;
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        font-size: $regular;
      }
      span {
        margin-right: 5px;
      }
    }

    &__content {
      flex-direction: column;
      align-items: flex-start;
      width: 185px;
      @include respond-to(xl) {
        width: 170px;
      }
      @include respond-to(sm) {
        width: 185px;
      }
      button {
        padding: 7px 10px 7px 30px;
        font-size: $regular;
        width: 100%;
        text-align: left;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:disabled {
          cursor: default;
        }
        &:last-of-type {
          border-bottom: none;
        }
        &:after {
          content: '';
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          border-radius: 1px;
        }

        @include respond-to(xl) {
          font-size: $medium;
          padding: 5px 10px 5px 25px;
          &:after {
            width: 10px;
            height: 10px;
          }
        }
        @include respond-to(sm) {
          font-size: $regular;
          padding: 7px 10px 7px 30px;
          &:after {
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }

  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      .Proposals__content .ProposalsFilter.ProposalsFilter {
        @include respond-to(sm) {
          display: -webkit-box !important;
        }
      }
    }
  }
`;

export default staticStyles;
