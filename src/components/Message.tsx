interface MessageProps {
  variant: 'success' | 'warning' | 'error' ;
  children: React.ReactNode;
}

const Message = ({ variant, children }: MessageProps) => {
  let bgColor;
  let textColor;

  switch (variant) {
    case 'success':
      bgColor = 'bg-green-100';
      textColor = 'text-green-700';
      break;
    case 'warning':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-700';
      break;
    case 'error':
      bgColor = 'bg-red-100';
      textColor = 'text-red-700';
      break;
    default:
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-700';
  }

  return (
    <div className={`p-4 my-4 rounded-md text-center ${bgColor} ${textColor}`}>
      {children}
    </div>
  );
};

export default Message;
