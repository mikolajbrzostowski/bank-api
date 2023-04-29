import { Order } from "@ticket-hamster/shared/models/order.model";
import { OrderLineStub } from "./order-line.stub";

export class OrderStub extends Order {
  constructor(props: Partial<Order> | undefined = {}) {

    const {
      id = '26',
      billingFirstName = 'Maja',
      billingLastName = 'Słowikowska',
      status = 'processing',
      billingEmail = 'test123@gmail.com',
      lines = [new OrderLineStub()],
      accountId = "account1-bbbb-cccc-dddd-eeeeeeeeeeee",
    } = props;

    const orderProps = {
      id,
        billingFirstName,
        billingLastName,
        status,
        billingEmail,
        lines,
        accountId,
    };

    super(orderProps);
  }
}
