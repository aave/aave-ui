import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BalanceSectionWrapper {
    flex-direction: column;

    &__content {
      @include respond-to(md) {
        margin-top: 10px;
        width: 100%;
      }
    }

    &.BalanceSectionWrapper__zeroState.SectionWrapper.SectionWrapper.SectionWrapper {
      width: 50%;
      @include respond-to(md) {
        width: 100%;
      }
    }
  }
`;

export default staticStyles;
