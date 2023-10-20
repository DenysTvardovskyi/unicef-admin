import { notification } from "antd";

const NOTIFICATION_CONFIG: Partial<any> = {
  placement: "bottomRight",
  style: {
    background: "#e0e0e0",
    borderRadius: 16,
    color: "#1e1e1e",
  },
  className: "p-3",
};

interface INotification {
  error: (message: string) => void;
  info: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
}

type TUseNotification = () => INotification;

export const useNotification: TUseNotification = (): INotification => {

  const handleError = (message: string) => {
    notification.error({
      ...NOTIFICATION_CONFIG,
      message: "Error Notification",
      description: message || "Error!",
    });
  };

  const handleInfo = (message: string) => {
    notification.info({
      ...NOTIFICATION_CONFIG,
      message: "Info Notification",
      description: message || "Info!",
    });
  };

  const handleSuccess = (message: string) => {
    notification.success({
      ...NOTIFICATION_CONFIG,
      message: "Success Notification",
      description: message || "Success!",
    });
  };

  const handleWarning = (message: string) => {
    notification.warning({
      ...NOTIFICATION_CONFIG,
      message: "Warning Notification",
      description: message || "Warning!",
    });
  };

  return {
    error: handleError,
    info: handleInfo,
    success: handleSuccess,
    warning: handleWarning,
  };
};