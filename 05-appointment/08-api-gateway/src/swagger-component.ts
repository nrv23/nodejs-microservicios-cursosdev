/**
 * @openapi
 * components:
 *  schemas:
 *    Error:
 *     type: object
 *     properties:
 *      status:
 *        type: string
 *        example: Error
 *      message:
 *        type: string
 *        example: Error message
 *    Product:
 *     type: object
 *     properties:
 *      id:
 *        type: string
 *        description: The auto-generated id of the product
 *        example: 5f8d0f7a-8f1f-4f5c-8a9b-9b5a0f9a9f09
 *      name:
 *        type: string
 *        description: Product name
 *        example: Product 1
 *      price:
 *        type: integer
 *        description: Product price
 *        example: 50
 *      description:
 *        type: string
 *        description: Product description
 *        example: The best product
 *      image:
 *        type: string
 *        description: Product image
 *        example: https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png
 *      createdAt:
 *        type: date
 *        description: Product creation date
 *        example: 2021-01-01T00:00:00.000Z
 *      updatedAt:
 *        type: date
 *        description: Product update date
 *        example: 2021-01-01T00:00:00.000Z
 *      deletedAt:
 *        type: date
 *        description: Product deletion date
 *        example: 2021-01-01T00:00:00.000Z
 */