
export interface IOptions {
    minFailures: number;
    minSuccesses: number;
    closeBreakerTimeout: number; // despues de cuanto tiempo fallando el servicio se cierra la conexion
    openBreakerTimeout: number; // Cuanto tiempo va estar intentando enviar la solicitud para comprobar si hay error en la solicitud
}

type TRequest = (...args: any[]) => Promise<any>;
type TState = "CLOSED" | "OPEN" | "HALF-OPEN";

export class UserByEmailCircuitBreakerService {

    request: TRequest;
    options: IOptions;
    state: TState = "CLOSED";
    triggerFromClose: number = 0; // tiempo de intentos se superó y no dio exito en la solicitud
    finishTimeHalfState: number = 0;
    successCount: number = 0;
    failCount: number = 0;

    constructor(request: TRequest, options: IOptions) {
        this.request = request;
        this.options = options;
    }

    async fire(...args: any[]): Promise<any> {

        if (this.state === "OPEN" && Date.now() < this.triggerFromClose) {
            throw new Error("Circuit breaker is open");
        }

        if (this.state === "OPEN") this.state = "CLOSED";

        try {
            const response = await this.request(args); // hacer la solicitu entrante
            console.log(response.data)
            this.success(response.data);
        } catch (error) {
            console.log(error)
            this.fail();
        }
    }

    success(response: any) {
        if (this.state === "HALF-OPEN") {
            this.successCount++;

            if ((this.successCount >= this.options.minSuccesses)
                || (Date.now() > this.finishTimeHalfState)) {
                this.state = "CLOSED";
                this.resetCounters();
            }
        }

        if (this.state === "CLOSED") {
            this.resetCounters();
        }

        return response;
    }

    fail() {

    }

    resetCounters() {
        this.failCount = 0;
        this.successCount = 0;
        this.finishTimeHalfState = 0;
    }
}