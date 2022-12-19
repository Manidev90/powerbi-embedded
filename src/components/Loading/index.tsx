import BlinkPageLoading, { BlinkPageLoadingProps } from "./Blink";
import LoadingProgress, { LoadingProgressProps } from "./Progress";

export type LoadingProps = BlinkPageLoadingProps | LoadingProgressProps;

/**
 * Nucleus page loading overlay
 *
 * @defaults if variant is not specified it defaults progress bar
 */
function Loading(props: LoadingProps) {
  switch (props.variant) {
    case "blink":
      return <BlinkPageLoading {...props} />;
    case "overlay":
    default:
      return <LoadingProgress {...props} />;
  }
}

export default Loading;
