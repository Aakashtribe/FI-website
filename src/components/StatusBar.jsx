import statusBarImg from '../assets/status-bar.png'

// Source image is 1446x152: "10:20" text on the left, a dynamic-island graphic in the
// middle, and signal/wifi/battery icons on the right. The 3D model already has a real
// physical notch cutout, so we only use the left (time) and right (icons) slices here —
// showing the image's own island too would double up with the model's.
const TIME_SLICE = { start: 0, width: 230 }
const ICONS_SLICE = { start: 1080, width: 366 }
const IMG_WIDTH = 1446

function slice({ start, width }) {
  // CSS background-position % is (containerSize - backgroundSize) * (P/100), not a plain
  // offset — solving for the P that lands `start` at the container's left edge:
  const positionX = (100 * start) / (IMG_WIDTH - width)
  return {
    backgroundImage: `url(${statusBarImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${(IMG_WIDTH / width) * 100}% auto`,
    backgroundPosition: `${positionX}% center`,
  }
}

export default function StatusBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-3">
      <div style={{ ...slice(TIME_SLICE), width: '58px', height: '16px' }} />
      <div style={{ ...slice(ICONS_SLICE), width: '68px', height: '16px' }} />
    </div>
  )
}
