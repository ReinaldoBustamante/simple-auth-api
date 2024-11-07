
import express, { Router } from 'express'
import cors from 'cors'

interface serverProps {
    port: number
    routes: Router
}

export class ServerApp {

    public readonly port: number
    public readonly routes: Router

    constructor(props: serverProps) {
        const { port, routes } = props
        this.port = port
        this.routes = routes
    }

    public start() {
        const app = express()

        app.use(express.json());
        app.use(cors())
        app.use('/api', this.routes)

        app.listen(this.port, () => {
            console.log('Server Up...')
        })
    }
}