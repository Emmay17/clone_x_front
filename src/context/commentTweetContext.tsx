// CommentModalContext.tsx
import { createContext, useState, useContext } from "react";

const CommentModalContext = createContext<any>(null);

export function CommentModalProvider({ children }: {children : React.ReactNode}) {
  const [showCommentModal, setShowCommentModal] = useState(false);
  return (
    <CommentModalContext.Provider value={{ showCommentModal, setShowCommentModal }}>
      {children}
    </CommentModalContext.Provider>
  );
}

export function useCommentModal() {
  return useContext(CommentModalContext);
}
