import { ServerApp } from "./presentation/serverApp"
import { ServerRouter } from "./presentation/router/router"

const serverApp = () => {

    const serverApp = new ServerApp({
        port: 3000,
        routes: ServerRouter.router()
    })

    serverApp.start()
}

(() => {
    serverApp()
})()