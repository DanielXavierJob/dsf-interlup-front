interface MessageContextProps {
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
}

export { MessageContextProps };