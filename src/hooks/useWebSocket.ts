'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

interface WebSocketOptions {
  reconnection?: boolean;
  reconnectionDelay?: number;
  reconnectionDelayMax?: number;
  reconnectionAttempts?: number;
}

export function useWebSocket(
  dashboardId: string,
  options: WebSocketOptions = {}
) {
  const socketRef = useRef<Socket | null>(null);
  const [data, setData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5000';

  useEffect(() => {
    // Create socket connection only once
    if (socketRef.current?.connected) return;

    socketRef.current = io(wsUrl, {
      reconnection: options.reconnection !== false,
      reconnectionDelay: options.reconnectionDelay || 1000,
      reconnectionDelayMax: options.reconnectionDelayMax || 5000,
      reconnectionAttempts: options.reconnectionAttempts || 5,
      transports: ['websocket', 'polling']
    });

    // Connection established
    socketRef.current.on('connect', () => {
      setIsConnected(true);
      setError(null);
      socketRef.current?.emit('subscribe-dashboard', dashboardId);
    });

    // Query result received
    socketRef.current.on('query-result', (result) => {
      setData(result);
      setIsLoading(false);
    });

    // Error handling
    socketRef.current.on('query-error', (err) => {
      setError(err.error || 'Query execution failed');
      setIsLoading(false);
    });

    // Disconnection
    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [dashboardId, wsUrl]);

  // Execute query via WebSocket
  const executeQuery = useCallback(
    (naturalLanguage: string, queryId: string) => {
      if (socketRef.current?.connected) {
        setIsLoading(true);
        socketRef.current.emit('execute-query', {
          dashboardId,
          queryId,
          naturalLanguage
        });
      } else {
        setError('WebSocket not connected');
      }
    },
    [dashboardId]
  );

  return {
    data,
    executeQuery,
    isConnected,
    error,
    isLoading
  };
}
