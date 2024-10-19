import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Cliente connetes: ${client.id}`)
    }

    handleDisconnect(client: any) {
        console.log(`Client disconnected: ${client.id}`)
    }

    @SubscribeMessage('mensaje')
    handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any){
        console.log(data)
        // this.server.emit('mensajeserver', data)
        client.broadcast.emit('mensajeservidor', data)
    }
}