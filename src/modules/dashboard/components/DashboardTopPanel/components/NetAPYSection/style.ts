import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .NetAPYSection {
    &.SectionWrapper {
      width: 25% !important;
      padding-left: 0 !important;
      @include respond-to(md) {
        width: 50% !important;
      }
      @include respond-to(sm) {
        width: 100% !important;
      }
    }
    &.SectionWrapper__collapse {
      width: 25% !important;
      @include respond-to(md) {
        width: 25% !important;
      }
      @include respond-to(sm) {
        width: 100% !important;
      }
    }

    &__wrapper {
      width: 100%;
      display: flex;
      align-items: flex-end;
    }
    &__right--inner {
      align-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      flex: 1;
      @include respond-to(sm) {
        display: block;
      }
    }

    &__rightInnerCollapse {
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
    }

    &__APYs {
      display: flex;

      &--titles,
      .ValuePercent__value {
        font-size: $small !important;
        font-weight: 400;
        @include respond-to(xl) {
          font-size: $extraSmall !important;
        }
        @include respond-to(md) {
          font-size: $small !important;
        }
      }

      &--title,
      .ValuePercent {
        margin-bottom: 8px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }

      &--titles {
        margin-right: 8px;
        @include respond-to(md) {
          margin-right: 4px;
        }
      }

      &--title {
        position: relative;
        padding-left: 10px;
        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
        }
      }
    }
  }
`;

export default staticStyles;
