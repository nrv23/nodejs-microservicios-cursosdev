import { Application, Request, Response } from 'express';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

// opciones para configurar el swagger 
const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Plantilla",
            version: "1.0.0"
        }
    },
    apis: [
            "./src/modules/**/infraestructure/presentation/*.routes.ts",
            "./src/swagger-component.ts"
        ]
};

const swaggerSpec = swaggerJsDoc(options);

// configurar el swagger en express 
const swaggerDoc = (app: Application, port: number) => {
    app.use("/api/v1/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));
    // descarga como JSOn

    app.get("/api/v1/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.log("Swagger docs available at http://localhost:" + port + "/api/v1/docs");
}

export {
    swaggerDoc
}