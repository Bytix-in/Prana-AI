import { useEffect } from 'react';

declare global {
  interface Window {
    ChatWidgetConfig?: {
      projectId: string;
    };
    chatWidgetScriptLoaded?: boolean;
    openChatWidget?: () => void;
  }
}

export function ChatWidget() {
  useEffect(() => {
    if (window.chatWidgetScriptLoaded) return;

    window.ChatWidgetConfig = {
      projectId: "67c9b80b7e07f306b6aafa98",
    };

    const chatWidgetScript = document.createElement("script");
    chatWidgetScript.type = 'text/javascript';
    chatWidgetScript.src = "https://storage.googleapis.com/cdwidget/dist/assets/js/main.js";
    document.body.appendChild(chatWidgetScript);

    window.chatWidgetScriptLoaded = true;

    return () => {
      // Cleanup if needed
      document.body.removeChild(chatWidgetScript);
    };
  }, []);

  return <div id="cd-widget" />;
}

export const openChat = () => {
  if (window.openChatWidget) {
    window.openChatWidget();
  }
};