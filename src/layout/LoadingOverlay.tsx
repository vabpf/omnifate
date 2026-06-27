import { LoadingSpinner } from '../ui';
import { LOADING_MESSAGES } from '../constants';

interface LoadingOverlayProps {
  messageIndex: number;
}

export default function LoadingOverlay({ messageIndex }: LoadingOverlayProps) {
  return (
    <LoadingSpinner
      text={LOADING_MESSAGES[messageIndex]}
      accentColor="indigo"
      isFullScreen
      title="Khởi Tạo Bản Đồ Thiên Mệnh"
      subtext="Tiến trình tính toán tích hợp sẽ hoàn tất trong giây lát..."
    />
  );
}
