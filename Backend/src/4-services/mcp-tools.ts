import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { orderService } from "./order-service";
import { productService } from "./product-service";
import { mcpHelper } from "../2-utils/mcp-helper";

class McpTools {

    // Get tool result for all orders: 
    public async getAllOrdersTool(): Promise<CallToolResult> {

        console.log("starting getAllOrdersTool");

        // Get all orders: 
        const orders = await orderService.getAllOrders();

        // Return tool result:
        return mcpHelper.getToolResult(orders);
    }

    // Get tool result for orders by year:
    public async getOrdersByYearTool(args: { year: number }): Promise<CallToolResult> {

        console.log("starting getOrdersByYearTool, year: " + args.year);

        // Get orders by year:
        const orders = await orderService.getOrdersByYear(args.year);

        // Return tool result:
        return mcpHelper.getToolResult(orders);
    }

    // Get tool result for all products: 
    public async getAllProductsTool(): Promise<CallToolResult> {

        console.log("starting getAllProductsTool");

        // Get all products: 
        const products = await productService.getAllProducts();

        // Return tool result:
        return mcpHelper.getToolResult(products);
    }

    // Get tool result for all order-details: 
    public async getAllOrderDetailsTool(): Promise<CallToolResult> {

        console.log("starting getAllOrderDetailsTool");

        // Get all order-details: 
        const orderDetails = await orderService.getAllOrderDetails();

        // Return tool result:
        return mcpHelper.getToolResult(orderDetails);
    }
}

export const mcpTools = new McpTools();
