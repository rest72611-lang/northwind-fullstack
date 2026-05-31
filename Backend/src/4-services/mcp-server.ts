import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { mcpRegister } from "./mcp-register";

class NorthwindMcpServer {

    // Create MCP server: 
    public createMcpServer(): McpServer {

        // Create mcp server: 
        const mcpServer = new McpServer({
            name: "northwind-mcp",
            version: "1.0.0"
        });

        // Register tools: 
        mcpRegister.registerGetAllOrdersTool(mcpServer);
        mcpRegister.registerGetOrdersByYearTool(mcpServer);
        mcpRegister.registerGetAllProductsTool(mcpServer);
        mcpRegister.registerGetAllOrderDetailsTool(mcpServer);

        // Return the MCP server:
        return mcpServer;
    }

}

export const northwindMcpServer = new NorthwindMcpServer();
