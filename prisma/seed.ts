import { PrismaClient } from "@prisma/client";
import {
  order_status_database,
  product_condition_database,
  product_categories_database,
  products_database,
  suppliers_databese,
  company_database,
  client_database,
  pallet_database,
} from "./data_to_base";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({
    where: {
      id_product: {
        gt: -1,
      },
    },
  });
  await prisma.status.deleteMany({
    where: {
      id_status: {
        gt: -1,
      },
    },
  });
  await prisma.condition.deleteMany({
    where: {
      id_condition: {
        gt: -1,
      },
    },
  });
  await prisma.category.deleteMany({
    where: {
      id_category: {
        gt: -1,
      },
    },
  });
  await prisma.company.deleteMany({
    where: {
      id_company: {
        gt: -1,
      },
    },
  });
  await prisma.employee.deleteMany({
    where: {
      id_employee: {
        gt: -1,
      },
    },
  });
  await prisma.user.deleteMany({
    where: {
      id_user: {
        gt: -1,
      },
    },
  });
  await prisma.supplier.deleteMany({
    where: {
      id_employee: {
        gt: -1,
      },
    },
  });
  await prisma.pallet.deleteMany({
    where: {
      id_pallet: {
        gt: -1,
      },
    },
  });
  await prisma.user.upsert({
    where: { id_user: 1 },
    update: {},
    create: {
      id_user: 1,
      email: "radek.urban@gmail.com",
      password: "$2b$10$oM8shIlfSY7DEgmeKSeox.iLKwGi93ohc/Jw2wddgR2hddY3ze5QK",
      user_name: "Radek",
      avatar:
        "https://res.cloudinary.com/dvkukzojb/image/upload/v1675107145/wwfecj7giys3oogkxst3.jpg",
    },
  });
  await prisma.employee.upsert({
    where: { id_employee: 1 },
    update: {},
    create: {
      id_employee: 1,
      //   id_company: 0,
      id_user: 1,
      first_name: "Radosław",
      last_name: "Urban",
      PESEL: "99125123434",
      phone: "512362123",
      email: "urban.radoslaw@gmail.com",
      country: "Polska",
      province: "Małopolska",
      postal_code: "30-100",
      city: "Tarnów",
      street: "Ogrodowa 5",
    },
  });

  for (const status of order_status_database) {
    await prisma.status.upsert({
      where: { id_status: status.id_status },
      update: {},
      create: status,
    });
  }
  for (const condition of product_condition_database) {
    await prisma.condition.upsert({
      where: { id_condition: condition.id_condition },
      update: {},
      create: condition,
    });
  }
  for (const category of product_categories_database) {
    await prisma.category.upsert({
      where: { id_category: category.id_category },
      update: {},
      create: category,
    });
  }
  for (const product of products_database) {
    await prisma.product.upsert({
      where: { id_product: product.id_product },
      update: {},
      create: product,
    });
  }

  for (const supplier of suppliers_databese) {
    await prisma.supplier.upsert({
      where: { id_supplier: supplier.id_supplier },
      update: {},
      create: supplier,
    });
  }
  for (const company of company_database) {
    await prisma.company.upsert({
      where: { id_company: company.id_company },
      update: {},
      create: company,
    });
  }
  for (const client of client_database) {
    await prisma.client.upsert({
      where: { id_client: client.id_client },
      update: {},
      create: client,
    });
  }
  for (const pallet of pallet_database) {
    await prisma.pallet.upsert({
      where: { id_pallet: pallet.id_pallet },
      update: {},
      create: pallet,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
