"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../lib/prisma-client");
const zod_1 = require("zod");
const zod_error_1 = require("zod-error");
const errors_1 = require("../errors");
const createSchema = zod_1.z.object({
    condition_name: zod_1.z.string(),
    description: zod_1.z.string(),
});
const createCondition = async (req, res) => {
    const validation = createSchema.safeParse(req.body);
    if (!validation.success) {
        const errorMessage = (0, zod_error_1.generateErrorMessage)(validation.error.issues);
        throw new errors_1.ValidationError(errorMessage);
    }
    const body = validation.data;
    const pallet = await prisma_client_1.prisma.condition.create({
        data: {
            condition_name: body.condition_name,
            description: body.description,
        },
    });
    res.status(201).json(pallet);
};
const getAllConditions = async (req, res) => {
    console.log(req.user);
    const conditions = await prisma_client_1.prisma.condition.findMany();
    res.status(201).json(conditions);
};
// const getSelectedConditions = async (req: Request, res: Response) => {
//   console.log(req.params.id);
//   const companiesId = req.params.id
//     .split(",")
//     .map((e) => parseInt(e))
//     .filter((e) => !isNaN(e));
//   const conditions = await prisma.condition.findMany({
//     where: {
//       id_company: { in: companiesId },
//     },
//   });
//   res.status(201).json(conditions);
// };
exports.default = {
    createCondition,
    getAllConditions,
    //   getSelectedConditions,
};
//# sourceMappingURL=conditions.js.map