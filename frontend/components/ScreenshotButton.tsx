import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';

interface ScreenshotButtonProps {
  wsConnection: WebSocket | null;
  sessionId: string | null;
}

export default function ScreenshotButton({ wsConnection, sessionId }: ScreenshotButtonProps) {
  const captureScreen = async () => {
    try {
      // 使用html2canvas捕获当前页面
      const canvas = await html2canvas(document.body);
      // 转换为base64图片数据
      const imageData = canvas.toDataURL('image/png');
      
      // 发送到WebSocket服务器
      if (wsConnection && sessionId) {
        wsConnection.send(JSON.stringify({
          type: 'screenshot',
          sessionId,
          imageData
        }));
      }
    } catch (error) {
      console.error('Screenshot failed:', error);
    }
  };

  return (
    <Button
      onClick={captureScreen}
      variant="outline"
      size="icon"
      className="rounded-full"
      disabled={!wsConnection || !sessionId}
    >
      <Camera className="h-4 w-4" />
    </Button>
  );
}