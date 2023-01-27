-- DropForeignKey
ALTER TABLE "Batch_Order" DROP CONSTRAINT "Batch_Order_id_order_fkey";

-- DropForeignKey
ALTER TABLE "Order_Status" DROP CONSTRAINT "Order_Status_id_order_fkey";

-- AddForeignKey
ALTER TABLE "Batch_Order" ADD CONSTRAINT "Batch_Order_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Order"("id_order") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Status" ADD CONSTRAINT "Order_Status_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Order"("id_order") ON DELETE CASCADE ON UPDATE CASCADE;
