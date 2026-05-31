import { dal } from "../2-utils/dal";

class OrderService {

    public async getAllOrders(): Promise<object[]> {
        const sql = "select * from orders";
        const orders = await dal.execute(sql) as object[];
        return orders;
    }

    public async getOrdersByYear(year: number): Promise<object[]> {
        const sql = "select * from orders where year(orderDate) = ?";
        const values = [year];
        const orders = await dal.execute(sql, values) as object[];
        return orders;
    }

    public async getAllOrderDetails(): Promise<object[]> {
        const sql = "select * from orderDetails";
        const orderDetails = await dal.execute(sql) as object[];
        return orderDetails;
    }

}

export const orderService = new OrderService();
