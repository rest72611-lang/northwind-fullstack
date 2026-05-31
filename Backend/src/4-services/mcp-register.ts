import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { mcpTools } from "./mcp-tools";
import z from "zod";

class McpRegister {

    public registerGetAllOrdersTool(mcpServer: McpServer): void {
        const config = {
            description: "Get all database orders."
        };
        mcpServer.registerTool("getAllOrders", config, mcpTools.getAllOrdersTool);
    }

    public registerGetOrdersByYearTool(mcpServer: McpServer): void {
        const config = {
            description: "Get database orders by given year.",
            inputSchema: z.object({ year: z.number() })
        };
        mcpServer.registerTool("getOrdersByYear", config, mcpTools.getOrdersByYearTool);
    }

    public registerGetAllProductsTool(mcpServer: McpServer): void {
        const config = {
            description: "Get all database products."
        };
        mcpServer.registerTool("getAllProducts", config, mcpTools.getAllProductsTool);
    }

    public registerGetAllOrderDetailsTool(mcpServer: McpServer): void {
        const config = {
            description: "Get all database order-details."
        };
        mcpServer.registerTool("getAllOrderDetails", config, mcpTools.getAllOrderDetailsTool);
    }

}

export const mcpRegister = new McpRegister();
