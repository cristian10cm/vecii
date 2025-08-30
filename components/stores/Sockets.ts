import { Manager, Socket } from "socket.io-client";
import Cookies from "js-cookie";

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private readonly socketUrl: string = 'https://api.vecii.com.co/socket.io/socket.io.js';
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 10;
  private readonly reconnectDelay = 2000;

  private storedToken: string | null = Cookies.get("token") || null;

  private constructor() { }

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connect(token?: string): void {
    if (!this.socket) {
      this.storedToken = token || Cookies.get("token") || null;

      const manager = new Manager(this.socketUrl, {
        extraHeaders: {
          authentication: this.storedToken || ""
        }
      });

      this.socket = manager.socket('/');

      this.initializeListeners();
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log(" Socket disconnected.");
      this.reconnectAttempts = 0;
    }
  }

  emit(event: string, data?: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event: string, callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  private initializeListeners(): void {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Connected:", this.socket?.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Disconnected:", reason);
      this.attemptReconnect();
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      this.attemptReconnect();
    });

    this.socket.on("notifications", (data) => {
      console.log("Notificación:", data);
    });

    this.socket.on("new-chat", (data) => {
      console.log("Nuevo chat:", data);
      this.emit("join-chat", data.id);
    });

    this.socket.on("new-message", (data) => {
      console.log("Mensaje recibido:", data);
    });
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Reconnecting in ${this.reconnectDelay / 1000}s...`);
      setTimeout(() => {
        this.connect(this.storedToken || "");
      }, this.reconnectDelay);
    } else {
      console.log("Max reconnection attempts reached.");
    }
  }
}

export default SocketService.getInstance();
