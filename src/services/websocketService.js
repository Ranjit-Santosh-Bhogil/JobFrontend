/**
 * Placeholder for STOMP/SockJS integration when backend exposes WebSocket.
 */
export const websocketService = {
  connect(url, onMessage) {
    void url
    void onMessage
    // Implement with SockJS + STOMP client when backend is ready
    return { disconnect: () => {} }
  },
}
