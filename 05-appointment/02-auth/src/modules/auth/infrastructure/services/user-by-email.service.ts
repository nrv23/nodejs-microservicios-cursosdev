
export interface IOptions {
    maxFailures: number;
    minSuccesses: number;
    closeBreakerTimeout: number; // despues de cuanto tiempo fallando el servicio se cierra la conexion
    openBreakerTimeout: number; // Cuanto tiempo va estar intentando enviar la solicitud para comprobar si hay error en la solicitud
}

export type TRequest = (...args: any[]) => Promise<any>;
type TState = "CLOSED" | "OPEN" | "HALF-OPEN";

export class UserByEmailCircuitBreakerService {
    private static instance: UserByEmailCircuitBreakerService;
    state: TState = "CLOSED";
    triggerFromClose: number = 0; // tiempo de intentos se superó y no dio exito en la solicitud
    triggerFromOpen: number = 0; // tiempo de intentos se superó y no dio exito en la solicitud
    finishTimeHalfState: number = 0;
    successCount: number = 0;
    failCount: number = 0;
    request: TRequest;
    options: IOptions;

    private constructor(request: TRequest, options: IOptions) {
        this.request = request;
        this.options = options;
    }
    async fire(...args: any[]): Promise<any> {
        console.log("state", this.state)
        if (this.state === "OPEN" && Date.now() < this.triggerFromOpen) {
            throw new Error("Circuit breaker is open");
        }

        // if (this.state === "OPEN") this.state = "CLOSED";

        try {
            const response = await this.request(...args); // hacer la solicitu entrante
            return this.success(response);
        } catch (error) {
            this.fail();
            throw new Error("Circuit breaker is open");
        }
    }

    success(response: any) {
        console.log("success", response);
        console.log("state", this.state);
        if (this.state === "HALF-OPEN") {
          this.successCount++;
    
          if (
            this.successCount >= this.options.minSuccesses ||
            Date.now() > this.finishTimeHalfState
          ) {
            this.state = "CLOSED";
            this.resetCounters();
          }
        }
    
        if (this.state === "OPEN") {
          this.state = "CLOSED";
          this.resetCounters();
        }
    
        console.log("response-success", response);
        return response;
      }
    

    fail() {
        if (this.state === "OPEN") {
            // tiempo donde el circuito está abierto
            this.triggerFromOpen = Date.now() - this.options.openBreakerTimeout;
            return;
        }

        if (this.state === "CLOSED") {
            this.failCount = 1;
            this.state = "HALF-OPEN"; // empieza a monitorear las respuestas del llamado
            this.finishTimeHalfState = Date.now() + this.options.closeBreakerTimeout;
            return;
        }

        if (this.state === "HALF-OPEN") {
            this.failCount++;

            if (Date.now() > this.finishTimeHalfState) {
                this.resetCounters();
                this.failCount = 1;
                // se crea otro timeout para verificar respuestas de llamados con errores
                this.finishTimeHalfState = Date.now() + this.options.closeBreakerTimeout;
                return;
            }
            // si el numero de fallos es mayor o igual al minimo de fallos
            if (this.failCount >= this.options.maxFailures) {
                this.state = "OPEN";
                this.resetCounters();
                // abre un timemout para mantener el circuito abierto 
                this.triggerFromOpen = Date.now() + this.options.openBreakerTimeout;
                return;
            }
        }
    }

    resetCounters() {
        this.failCount = 0;
        this.successCount = 0;
        this.finishTimeHalfState = 0;
    }

    static getInstance(request: TRequest, options: IOptions): UserByEmailCircuitBreakerService {
        if (!this.instance) {
            this.instance = new UserByEmailCircuitBreakerService(request, options);
        }

        return this.instance;
    }
}